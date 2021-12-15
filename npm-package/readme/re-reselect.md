# Re-reselect

[![Build status][ci-badge]][ci]
[![Npm version][npm-version-badge]][npm]
[![Npm downloads][npm-downloads-badge]][npm]
[![Test coverage report][coveralls-badge]][coveralls]

`re-reselect` is a lightweight wrapper around **[Reselect][reselect]** meant to enhance selectors with **deeper memoization** and **cache management**.

**Switching between different arguments** using standard `reselect` selectors causes **cache invalidation** since default `reselect` cache has a **limit of one**.

`re-reselect` **forwards different calls to different** `reselect` **selectors** stored in cache, so that computed/memoized values are retained.

`re-reselect` **selectors work as normal** `reselect` **selectors** but they are able to determine when **creating a new selector or querying a cached one** on the fly, depending on the supplied arguments.

![Reselect and re-reselect][reselect-and-re-reselect-sketch]

Useful to:

- **Retain selector's cache** when sequentially **called with one/few different arguments** ([example][example-1])
- **Join similar selectors** into one
- **Share selectors** with props across multiple component instances (see [reselect example][reselect-sharing-selectors] and [re-reselect solution][example-2])
- **Instantiate** selectors **on runtime**
- Enhance `reselect` with [custom caching strategies][cache-objects-docs]

<!-- prettier-ignore -->
```js
import {createCachedSelector} from 're-reselect';

// Normal reselect routine: declare "inputSelectors" and "resultFunc"
const getUsers = state => state.users;
const getLibraryId = (state, libraryName) => state.libraries[libraryName].id;

const getUsersByLibrary = createCachedSelector(
  // inputSelectors
  getUsers,
  getLibraryId,

  // resultFunc
  (users, libraryId) => expensiveComputation(users, libraryId),
)(
  // re-reselect keySelector (receives selectors' arguments)
  // Use "libraryName" as cacheKey
  (_state_, libraryName) => libraryName
);

// Cached selectors behave like normal selectors:
// 2 reselect selectors are created, called and cached
const reactUsers = getUsersByLibrary(state, 'react');
const vueUsers = getUsersByLibrary(state, 'vue');

// This 3rd call hits the cache
const reactUsersAgain = getUsersByLibrary(state, 'react');
// reactUsers === reactUsersAgain
// "expensiveComputation" called twice in total
```

## Table of contents

- [Installation](#installation)
- [Why? + example](#why--example)
  - [re-reselect solution](#re-reselect-solution)
  - [Other viable solutions](#other-viable-solutions)
- [Examples](#examples)
- [FAQ](#faq)
- [API](#api)
  - [`createCachedSelector`](#createCachedSelector)
  - [`createStructuredCachedSelector`](#createStructuredCachedSelector)
  - [keySelector](#keyselector)
  - [options](#options)
  - [selector instance][selector-instance-docs]
- [About re-reselect](#about-re-reselect)
- [Todo's](#todos)
- [Contributors](#contributors)

## Installation

```console
npm install reselect -S
npm install re-reselect -S
```

## Why? + example

Let's say `getData` is a `reselect` selector.

```js
getData(state, itemId, 'dataA');
getData(state, itemId, 'dataB');
getData(state, itemId, 'dataA');
```

The **3rd argument invalidates `reselect` cache** on each call, forcing `getData` to re-evaluate and return a new value.

### re-reselect solution

`re-reselect` selectors keep a **cache of `reselect` selectors** stored by `cacheKey`.

<!-- Please note that part of this lines are repeated in #api chapter -->

`cacheKey` is the return value of the `keySelector` function. It's by default a `string` or `number` but it can be anything depending on the chosen cache strategy (see [cache objects docs][cache-objects-docs]).

`keySelector` is a custom function which:

- takes the same arguments as the selector itself (in the example: `state`, `itemId`, `dataType`)
- returns a `cacheKey`

A **unique persisting `reselect` selector instance** stored in cache is used to compute data for a given `cacheKey` (1:1).

Back to the example, we might setup `re-reselect` to retrieve data by **querying one of the cached selectors** using the 3rd argument as `cacheKey`, allowing cache invalidation only when `state` or `itemId` change (but not `dataType`):

<!-- prettier-ignore -->
```js
const getData = createCachedSelector(
  state => state,
  (state, itemId) => itemId,
  (state, itemId, dataType) => dataType,
  (state, itemId, dataType) => expensiveComputation(state, itemId, dataType)
)(
  (state, itemId, dataType) => dataType // Use dataType as cacheKey
);
```

**Replacing a selector with a cached selector is invisible to the consuming application since the API is the same.**

**When a cached selector is called**, the following happens behind the scenes:

1.  **Evaluate the `cacheKey`** for the current call by executing `keySelector`
2.  **Retrieve** from cache the **`reselect` selector** stored under the given `cacheKey`
3.  **Return found selector or create a new one** if no selector was found
4.  **Call returned selector** with provided arguments

### Other viable solutions

#### 1- Declare a different selector for each different call

Easy, but doesn't scale. See ["join similar selectors" example][example-1].

#### 2- Declare a `makeGetPieceOfData` selector factory as explained in Reselect docs

The solution suggested in [Reselect docs][reselect-sharing-selectors] is fine, but it has a few downsides:

- Bloats your code by exposing both `get` selectors and `makeGet` selector factories
- Needs to import/call the selector factory instead of directly using the selector
- Two different instances, given the same arguments, will individually store and recompute the same result (read [this](https://github.com/reactjs/reselect/pull/213))

#### 3- Wrap your `makeGetPieceOfData` selector factory into a memoizer function and call the returning memoized selector

This is what `re-reselect` actually does. 😀

## Examples

- [Join similar selectors][example-1]
- [Avoid selector factories][example-2]
- [Cache API calls][example-3]
- [Programmatic keySelector composition][example-4]
- [Usage with Selectorator][example-5]

## FAQ

<details>
  <summary>
    <b>How do I wrap my existing selector with re-reselect?</b>
  </summary>
  <br/>

Given your `reselect` selectors:

  <!-- prettier-ignore -->

```js
import {createSelector} from 'reselect';

export const getMyData = createSelector(
  selectorA,
  selectorB,
  selectorC,
  (A, B, C) => doSomethingWith(A, B, C)
);
```

...add `keySelector` in the second function call:

  <!-- prettier-ignore -->

```js
import {createCachedSelector} from 're-reselect';

export const getMyData = createCachedSelector(
  selectorA,
  selectorB,
  selectorC,
  (A, B, C) => doSomethingWith(A, B, C)
)(
  (state, arg1, arg2) => arg2 // Use arg2 as cacheKey
);
```

Voilà, `getMyData` is ready for use!

```js
const myData = getMyData(state, 'foo', 'bar');
```

</details>

<details>
  <summary>
    <b>How do I use multiple inputs to set the cacheKey?</b>
  </summary>
  <br/>

A few good examples and [a bonus](https://github.com/toomuchdesign/re-reselect/issues/3):

<!-- prettier-ignore -->
```js
// Basic usage: use a single argument as cacheKey
createCachedSelector(
  // ...
)(
  (state, arg1, arg2, arg3) => arg3
)

// Use multiple arguments and chain them into a string
createCachedSelector(
  // ...
)(
  (state, arg1, arg2, arg3) => `${arg1}:${arg3}`
)

// Extract properties from an object
createCachedSelector(
  // ...
)(
  (state, props) => `${props.a}:${props.b}`
)
```

</details>

<details>
  <summary>
    <b>How do I limit the cache size?</b>
  </summary>
  <br/>

Use a [`cacheObject`][cache-objects-docs] which provides that feature by supplying a [`cacheObject` option](#cacheobject).

You can also write **your own cache strategy**!

</details>

<details>
  <summary>
    <b>How to share a selector across multiple components while passing in props and retaining memoization?</b>
  </summary>
  <br/>

[This example][example-2] shows how `re-reselect` would solve the scenario described in [reselect docs][reselect-sharing-selectors].

</details>

<details>
  <summary>
    <b>How do I test a re-reselect selector?</b>
  </summary>
  <br/>

Like a normal reselect selector!

`re-reselect` selectors expose the same `reselect` testing methods:

- `dependencies`
- `resultFunc`
- `recomputations`
- `resetRecomputations`

Read more about testing selectors on [`reselect` docs][reselect-test-selectors].

#### Testing `reselect` selectors stored in the cache

Each **re-reselect** selector exposes a `getMatchingSelector` method which returns the **underlying matching selector** instance for the given arguments, **instead of the result**.

`getMatchingSelector` expects the same arguments as a normal selector call **BUT returns the instance of the cached selector itself**.

Once you get a selector instance you can call [its public methods][reselect-selectors-methods].

<!-- prettier-ignore -->
```js
import {createCachedSelector} from 're-reselect';

export const getMyData = createCachedSelector(selectorA, selectorB, (A, B) =>
  doSomethingWith(A, B)
)(
  (state, arg1) => arg1 // cacheKey
);

// Call your selector
const myFooData = getMyData(state, 'foo');
const myBarData = getMyData(state, 'bar');

// Call getMatchingSelector method to retrieve underlying reselect selectors
// which generated "myFooData" and "myBarData" results
const myFooDataSelector = getMyData.getMatchingSelector(state, 'foo');
const myBarDataSelector = getMyData.getMatchingSelector(state, 'bar');

// Call reselect's selectors methods
myFooDataSelector.recomputations();
myFooDataSelector.resetRecomputations();
```

</details>

## API

### createCachedSelector

<!-- prettier-ignore -->
```js
import {createCachedSelector} from 're-reselect';

createCachedSelector(
  // ...reselect's `createSelector` arguments
)(
  keySelector | { options }
)
```

Takes the same arguments as reselect's [`createSelector`][reselect-create-selector] and returns a new function which accepts a [`keySelector`](#keyselector) or an [`options`](#options) object.

**Returns** a [selector instance][selector-instance-docs].

### createStructuredCachedSelector

<!-- prettier-ignore -->
```js
import {createStructuredCachedSelector} from 're-reselect';

createStructuredCachedSelector(
  // ...reselect's `createStructuredSelector` arguments
)(
  keySelector | { options }
)
```

Takes the same arguments as reselect's [`createStructuredSelector`][reselect-create-structured-selector] and returns a new function which accepts a [`keySelector`](#keyselector) or an [`options`](#options) object.

**Returns** a [selector instance][selector-instance-docs].

### keySelector

A custom function receiving the same arguments as your selectors (and `inputSelectors`) and **returning a `cacheKey`**.

`cacheKey` is **by default a `string` or `number`** but can be anything depending on the chosen cache strategy (see [`cacheObject` option](#optionscacheobject)).

The `keySelector` idea comes from [Lodash's .memoize resolver][lodash-memoize].

### options

#### keySelector

Type: `function`<br />
Default: `undefined`

The [`keySelector`](#keyselector) used by the cached selector.

#### cacheObject

Type: `object`<br />
Default: [`FlatObjectCache`][cache-objects-docs]

An optional custom **cache strategy object** to handle the caching behaviour. Read more about [re-reselect's custom cache here][cache-objects-docs].

#### keySelectorCreator

Type: `function`<br />
Default: `undefined`

An optional function with the following signature returning the [`keySelector`](#keyselector) used by the cached selector.

```typescript
type keySelectorCreator = (selectorInputs: {
  inputSelectors: InputSelector[];
  resultFunc: ResultFunc;
  keySelector: KeySelector;
}) => KeySelector;
```

This allows the ability to dynamically **generate `keySelectors` on runtime** based on provided `inputSelectors`/`resultFunc` supporting [**key selectors composition**](https://github.com/toomuchdesign/re-reselect/pull/73). It overrides any provided `keySelector`.

See [programmatic keySelector composition][example-4] example.

#### selectorCreator

Type: `function`<br />
Default: `reselect`'s [`createSelector`][reselect-create-selector]

An optional function describing a [custom version of createSelector][reselect-create-selector-creator].

### re-reselect selector instance

`createCachedSelector` and `createStructuredCachedSelector` return a **selector instance** which extends the API of a **standard reselect selector**.

> The followings are advanced methods and you won't need them for basic usage!

#### selector`.getMatchingSelector(selectorArguments)`

Retrieve the selector responding to the given arguments.

#### selector`.removeMatchingSelector(selectorArguments)`

Remove from the cache the selector responding to the given arguments.

#### selector`.cache`

Get the cacheObject instance being used by the selector (for advanced caching operations like [this](https://github.com/toomuchdesign/re-reselect/issues/40)).

#### selector`.clearCache()`

Clear whole `selector` cache.

#### selector`.dependencies`

Get an array containing the provided `inputSelectors`. Refer to relevant discussion on [Reselect repo][reselect-test-selectors-dependencies].

#### selector`.resultFunc`

Get `resultFunc` for easily [testing composed selectors][reselect-test-selectors].

#### selector`.recomputations()`

Return the number of times the selector's result function has been recomputed.

#### selector`.resetRecomputations()`

Reset `recomputations` count.

#### selector`.keySelector`

Get `keySelector` for utility compositions or testing.

## About re-reselect

- [re-reselect your whole redux state](https://patrickdesjardins.com/blog/re-reselect-your-whole-redux-state)
- [Understanding reselect and re-reselect](http://alexnitta.com/understanding-reselect-and-re-reselect/)
- [Advanced Redux patterns: selectors](https://blog.brainsandbeards.com/advanced-redux-patterns-selectors-cb9f88381d74)
- [Be selective with your state](https://medium.com/riipen-engineering/be-selective-with-your-state-8f1be76cb9f4)
- [A swift developer’s React Native experience](https://swiftwithjustin.co/2018/06/24/a-swift-developers-react-native-experience)
- [5 key Redux libraries to improve code reuse](https://blog.logrocket.com/5-redux-libraries-to-improve-code-reuse-9f93eaceaa83)
- [Rematch's docs](https://github.com/rematch/rematch/blob/1.1.0/plugins/select/README.md#re-reselect)
- [Redux re-reselect playground](https://codesandbox.io/s/135rwqj2jj)

## Todo's

- Improve TS tests readability
- More examples

## Contributors

Thanks to you all ([emoji key][docs-all-contributors]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td><a href="http://www.andreacarraro.it"><img src="https://avatars3.githubusercontent.com/u/4573549?v=4" width="100px;" alt=""/><br /><sub><b>Andrea Carraro</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/commits?author=toomuchdesign" title="Code">💻</a> <a href="https://github.com/toomuchdesign/re-reselect/commits?author=toomuchdesign" title="Documentation">📖</a> <a href="#infra-toomuchdesign" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/toomuchdesign/re-reselect/commits?author=toomuchdesign" title="Tests">⚠️</a> <a href="https://github.com/toomuchdesign/re-reselect/pulls?q=is%3Apr+reviewed-by%3Atoomuchdesign" title="Reviewed Pull Requests">👀</a></td>
    <td><a href="https://github.com/xsburg"><img src="https://avatars2.githubusercontent.com/u/830824?v=4" width="100px;" alt=""/><br /><sub><b>Stepan Burguchev</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/commits?author=xsburg" title="Code">💻</a> <a href="#ideas-xsburg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#question-xsburg" title="Answering Questions">💬</a> <a href="https://github.com/toomuchdesign/re-reselect/pulls?q=is%3Apr+reviewed-by%3Axsburg" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/toomuchdesign/re-reselect/commits?author=xsburg" title="Tests">⚠️</a></td>
    <td><a href="https://github.com/sgrishchenko"><img src="https://avatars3.githubusercontent.com/u/15995890?v=4" width="100px;" alt=""/><br /><sub><b>Sergei Grishchenko</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/commits?author=sgrishchenko" title="Code">💻</a> <a href="#ideas-sgrishchenko" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/toomuchdesign/re-reselect/commits?author=sgrishchenko" title="Tests">⚠️</a> <a href="#tool-sgrishchenko" title="Tools">🔧</a></td>
    <td><a href="https://github.com/Andarist"><img src="https://avatars2.githubusercontent.com/u/9800850?v=4" width="100px;" alt=""/><br /><sub><b>Mateusz Burzyński</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/commits?author=Andarist" title="Code">💻</a> <a href="#infra-Andarist" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td><a href="https://olslash.github.io/"><img src="https://avatars3.githubusercontent.com/u/693493?v=4" width="100px;" alt=""/><br /><sub><b>Mitch Robb</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/commits?author=olslash" title="Code">💻</a> <a href="https://github.com/toomuchdesign/re-reselect/commits?author=olslash" title="Tests">⚠️</a></td>
    <td><a href="https://github.com/rufman"><img src="https://avatars3.githubusercontent.com/u/1128559?v=4" width="100px;" alt=""/><br /><sub><b>Stephane Rufer</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/commits?author=rufman" title="Code">💻</a> <a href="https://github.com/toomuchdesign/re-reselect/commits?author=rufman" title="Tests">⚠️</a></td>
    <td><a href="https://github.com/spiffysparrow"><img src="https://avatars0.githubusercontent.com/u/2788860?v=4" width="100px;" alt=""/><br /><sub><b>Tracy Mullen</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/commits?author=spiffysparrow" title="Code">💻</a> <a href="https://github.com/toomuchdesign/re-reselect/commits?author=spiffysparrow" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td><a href="https://www.skc.name"><img src="https://avatars1.githubusercontent.com/u/4211838?v=4" width="100px;" alt=""/><br /><sub><b>Sushain Cherivirala</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/commits?author=sushain97" title="Code">💻</a></td>
    <td><a href="https://twitter.com/MaoStevemao"><img src="https://avatars0.githubusercontent.com/u/6316590?v=4" width="100px;" alt=""/><br /><sub><b>Steve Mao</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/commits?author=stevemao" title="Documentation">📖</a></td>
    <td><a href="https://github.com/Dante-101"><img src="https://avatars2.githubusercontent.com/u/1428826?v=4" width="100px;" alt=""/><br /><sub><b>Gaurav Lahoti</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/issues?q=author%3ADante-101" title="Bug reports">🐛</a></td>
    <td><a href="http://lon.im"><img src="https://avatars3.githubusercontent.com/u/13602053?v=4" width="100px;" alt=""/><br /><sub><b>Lon</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/issues?q=author%3Acnlon" title="Bug reports">🐛</a></td>
    <td><a href="https://github.com/bratushka"><img src="https://avatars2.githubusercontent.com/u/5492495?v=4" width="100px;" alt=""/><br /><sub><b>bratushka</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/commits?author=bratushka" title="Code">💻</a></td>
    <td><a href="https://andrz.me"><img src="https://avatars3.githubusercontent.com/u/615381?v=4" width="100px;" alt=""/><br /><sub><b>Anders D. Johnson</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/commits?author=AndersDJohnson" title="Documentation">📖</a></td>
    <td><a href="https://github.com/wormyy"><img src="https://avatars3.githubusercontent.com/u/8556724?v=4" width="100px;" alt=""/><br /><sub><b>Július Retzer</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/commits?author=wormyy" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td><a href="https://github.com/maartenschumacher"><img src="https://avatars3.githubusercontent.com/u/10407025?v=4" width="100px;" alt=""/><br /><sub><b>Maarten Schumacher</b></sub></a><br /><a href="#ideas-maartenschumacher" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td><a href="https://github.com/alexanderjarvis"><img src="https://avatars2.githubusercontent.com/u/664238?v=4" width="100px;" alt=""/><br /><sub><b>Alexander Jarvis</b></sub></a><br /><a href="#ideas-alexanderjarvis" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td><a href="https://github.com/greggb"><img src="https://avatars1.githubusercontent.com/u/514026?v=4" width="100px;" alt=""/><br /><sub><b>Gregg B</b></sub></a><br /><a href="#example-greggb" title="Examples">💡</a></td>
    <td><a href="http://ianobermiller.com"><img src="https://avatars0.githubusercontent.com/u/897931?v=4" width="100px;" alt=""/><br /><sub><b>Ian Obermiller</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/pulls?q=is%3Apr+reviewed-by%3Aianobermiller" title="Reviewed Pull Requests">👀</a></td>
    <td><a href="https://github.com/lukyth"><img src="https://avatars3.githubusercontent.com/u/7040242?v=4" width="100px;" alt=""/><br /><sub><b>Kanitkorn Sujautra</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/commits?author=lukyth" title="Documentation">📖</a></td>
    <td><a href="https://github.com/suark"><img src="https://avatars2.githubusercontent.com/u/6233440?v=4" width="100px;" alt=""/><br /><sub><b>Brian Kraus</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/commits?author=suark" title="Documentation">📖</a></td>
    <td><a href="https://github.com/el-dav"><img src="https://avatars1.githubusercontent.com/u/7252227?v=4" width="100px;" alt=""/><br /><sub><b>el-dav</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/issues?q=author%3Ael-dav" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td><a href="https://augustin-riedinger.fr"><img src="https://avatars3.githubusercontent.com/u/1970156?v=4" width="100px;" alt=""/><br /><sub><b>Augustin Riedinger</b></sub></a><br /><a href="#ideas-augnustin" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td><a href="https://github.com/RichardForrester"><img src="https://avatars0.githubusercontent.com/u/12902182?v=4" width="100px;" alt=""/><br /><sub><b>RichardForrester</b></sub></a><br /><a href="#ideas-RichardForrester" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td><a href="https://alfonsomillan.com/"><img src="https://avatars3.githubusercontent.com/u/25711137?v=4" width="100px;" alt=""/><br /><sub><b>Alfonso Millan</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/commits?author=mechmillan" title="Documentation">📖</a></td>
    <td><a href="https://github.com/parkerault"><img src="https://avatars2.githubusercontent.com/u/78856?v=4" width="100px;" alt=""/><br /><sub><b>parkerault</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/issues?q=author%3Aparkerault" title="Bug reports">🐛</a></td>
    <td><a href="https://github.com/dahannes"><img src="https://avatars0.githubusercontent.com/u/2493211?v=4" width="100px;" alt=""/><br /><sub><b>johannes</b></sub></a><br /><a href="https://github.com/toomuchdesign/re-reselect/issues?q=author%3Adahannes" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

[reselect]: https://github.com/reactjs/reselect
[reselect-sharing-selectors]: https://github.com/reduxjs/reselect/tree/v4.0.0#sharing-selectors-with-props-across-multiple-component-instances
[reselect-test-selectors]: https://github.com/reactjs/reselect/tree/v4.0.0#q-how-do-i-test-a-selector
[reselect-test-selectors-dependencies]: https://github.com/reduxjs/reselect/issues/76#issuecomment-299194186
[reselect-selectors-methods]: https://github.com/reduxjs/reselect/blob/v4.0.0/src/index.js#L81
[reselect-create-selector]: https://github.com/reactjs/reselect/tree/v4.0.0#createselectorinputselectors--inputselectors-resultfunc
[reselect-create-structured-selector]: https://github.com/reduxjs/reselect/tree/v4.0.0#createstructuredselectorinputselectors-selectorcreator--createselector
[reselect-create-selector-creator]: https://github.com/reactjs/reselect/tree/v4.0.0#createselectorcreatormemoize-memoizeoptions
[lodash-memoize]: https://lodash.com/docs/4.17.4#memoize
[ci-badge]: https://github.com/toomuchdesign/re-reselect/actions/workflows/ci.yml/badge.svg
[ci]: https://github.com/toomuchdesign/re-reselect/actions/workflows/ci.yml
[coveralls-badge]: https://coveralls.io/repos/github/toomuchdesign/re-reselect/badge.svg?branch=master
[coveralls]: https://coveralls.io/github/toomuchdesign/re-reselect?branch=master
[npm]: https://www.npmjs.com/package/re-reselect
[npm-version-badge]: https://img.shields.io/npm/v/re-reselect.svg
[npm-downloads-badge]: https://img.shields.io/npm/dm/re-reselect.svg
[reselect-and-re-reselect-sketch]: examples/reselect-and-re-reselect.png?raw=true
[example-1]: examples/1-join-selectors.md
[example-2]: examples/2-avoid-selector-factories.md
[example-3]: examples/3-cache-api-calls.md
[example-4]: examples/4-programmatic-keyselector-composition.md
[example-5]: examples/5-selectorator.md
[selector-instance-docs]: #re-reselect-selector-instance
[cache-objects-docs]: src/cache#readme
[docs-all-contributors]: https://allcontributors.org/docs/en/emoji-key
