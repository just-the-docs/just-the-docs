<p>
  <img src="https://i.imgur.com/o0u6dto.png" width="300" height="300" alt="unistore">
  <br>
  <a href="https://www.npmjs.org/package/unistore"><img src="https://img.shields.io/npm/v/unistore.svg?style=flat" alt="npm"></a> <a href="https://travis-ci.org/developit/unistore"><img src="https://travis-ci.org/developit/unistore.svg?branch=master" alt="travis"></a>
</p>

# unistore

> A tiny 350b centralized state container with component bindings for [Preact] & [React].

- **Small** footprint complements Preact nicely _(unistore + unistore/preact is ~650b)_
- **Familiar** names and ideas from Redux-like libraries
- **Useful** data selectors to extract properties from state
- **Portable** actions can be moved into a common place and imported
- **Functional** actions are just reducers
- **NEW**: seamlessly run Unistore in a worker via [Stockroom](https://github.com/developit/stockroom)

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Examples](#examples)
- [API](#api)
- [License](#license)

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
npm install --save unistore
```

Then with a module bundler like [webpack](https://webpack.js.org) or [rollup](http://rollupjs.org), use as you would anything else:

```js
// The store:
import createStore from 'unistore'

// Preact integration
import { Provider, connect } from 'unistore/preact'

// React integration
import { Provider, connect } from 'unistore/react'
```

Alternatively, you can import the "full" build for each, which includes both `createStore` and the integration for your library of choice:

```js
import { createStore, Provider, connect } from 'unistore/full/preact'
```

The [UMD](https://github.com/umdjs/umd) build is also available on [unpkg](https://unpkg.com):

```html
<!-- just unistore(): -->
<script src="https://unpkg.com/unistore/dist/unistore.umd.js"></script>
<!-- for preact -->
<script src="https://unpkg.com/unistore/full/preact.umd.js"></script>
<!-- for react -->
<script src="https://unpkg.com/unistore/full/react.umd.js"></script>
```

You can find the library on `window.unistore`.

### Usage

```js
import createStore from 'unistore'
import { Provider, connect } from 'unistore/preact'

let store = createStore({ count: 0, stuff: [] })

let actions = {
  // Actions can just return a state update:
  increment(state) {
    // The returned object will be merged into the current state
    return { count: state.count+1 }
  },

  // The above example as an Arrow Function:
  increment2: ({ count }) => ({ count: count+1 }),

  // Actions receive current state as first parameter and any other params next
  // See the "Increment by 10"-button below
  incrementBy: ({ count }, incrementAmount) => {
    return { count: count+incrementAmount }
  },
}

// If actions is a function, it gets passed the store:
let actionFunctions = store => ({
  // Async actions can be pure async/promise functions:
  async getStuff(state) {
    const res = await fetch('/foo.json')
    return { stuff: await res.json() }
  },

  // ... or just actions that call store.setState() later:
  clearOutStuff(state) {
    setTimeout(() => {
      store.setState({ stuff: [] }) // clear 'stuff' after 1 second
    }, 1000)
  }

  // Remember that the state passed to the action function could be stale after
  // doing async work, so use getState() instead:
  async incrementAfterStuff(state) {
    const res = await fetch('foo.json')
    const resJson = await res.json()
    // the variable 'state' above could now be old,
    // better get a new one from the store
    const upToDateState = store.getState()

    return {
      stuff: resJson,
      count: upToDateState.count + resJson.length,
    }
  }
})

// Connecting a react/preact component to get current state and to bind actions
const App1 = connect('count', actions)(
  ({ count, increment, incrementBy }) => (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={() => incrementBy(10)}>Increment by 10</button>
    </div>
  )
)

// First argument to connect can also be a string, array or function while
// second argument can be an object or a function. Here we pass an array and
// a function.
const App2 = connect(['count', 'stuff'], actionFunctions)(
  ({ count, stuff, getStuff, clearOutStuff, incrementAfterStuff }) => (
    <div>
      <p>Count: {count}</p>
      <p>Stuff:
        <ul>{stuff.map(s => (
         <li>{s.name}</li>
        ))}</ul>
      </p>
      <button onClick={getStuff}>Get some stuff!</button>
      <button onClick={clearOutStuff}>Remove all stuff!</button>
      <button onClick={incrementAfterStuff}>Get and count stuff!</button>
    </div>
  )
)

export const getApp1 = () => (
  <Provider store={store}>
    <App1 />
  </Provider>
)

export const getApp2 = () => (
  <Provider store={store}>
    <App2 />
  </Provider>
)
```

### Debug

Make sure to have [Redux devtools extension](https://github.com/zalmoxisus/redux-devtools-extension) previously installed.

```js
import createStore from 'unistore'
import devtools    from 'unistore/devtools'

let initialState = { count: 0 };
let store = process.env.NODE_ENV === 'production' ?  createStore(initialState) : devtools(createStore(initialState));

// ...
```

### Examples

[README Example on CodeSandbox](https://codesandbox.io/s/l7y7w5qkz9)

### API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### createStore

Creates a new store, which is a tiny evented state container.

**Parameters**

- `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional initial state (optional, default `{}`)

**Examples**

```javascript
let store = createStore();
store.subscribe( state => console.log(state) );
store.setState({ a: 'b' });   // logs { a: 'b' }
store.setState({ c: 'd' });   // logs { a: 'b', c: 'd' }
```

Returns **[store](#store)** 

#### store

An observable state container, returned from [createStore](#createstore)

##### action

Create a bound copy of the given action function.
The bound returned function invokes action() and persists the result back to the store.
If the return value of `action` is a Promise, the resolved value will be used as state.

**Parameters**

- `action` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** An action of the form `action(state, ...args) -> stateUpdate`

Returns **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** boundAction()

##### setState

Apply a partial state object to the current state, invoking registered listeners.

**Parameters**

- `update` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** An object with properties to be merged into state
- `overwrite` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** If `true`, update will replace state instead of being merged into it (optional, default `false`)

##### subscribe

Register a listener function to be called whenever state is changed. Returns an `unsubscribe()` function.

**Parameters**

- `listener` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** A function to call when state changes. Gets passed the new state.

Returns **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** unsubscribe()

##### unsubscribe

Remove a previously-registered listener function.

**Parameters**

- `listener` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** The callback previously passed to `subscribe()` that should be removed.

##### getState

Retrieve the current state object.

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** state

#### connect

Wire a component up to the store. Passes state as props, re-renders on change.

**Parameters**

- `mapStateToProps` **([Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** A function mapping of store state to prop values, or an array/CSV of properties to map.
- `actions` **([Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) \| [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))?** Action functions (pure state mappings), or a factory returning them. Every action function gets current state as the first parameter and any other params next

**Examples**

```javascript
const Foo = connect('foo,bar')( ({ foo, bar }) => <div /> )
```

```javascript
const actions = { someAction }
const Foo = connect('foo,bar', actions)( ({ foo, bar, someAction }) => <div /> )
```

Returns **Component** ConnectedComponent

#### Provider

**Extends Component**

Provider exposes a store (passed as `props.store`) into context.

Generally, an entire application is wrapped in a single `<Provider>` at the root.

**Parameters**

- `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `props.store` **Store** A {Store} instance to expose via context.

### Reporting Issues

Found a problem? Want a new feature? First of all, see if your issue or idea has [already been reported](../../issues).
If not, just open a [new clear and descriptive issue](../../issues/new).

### License

[MIT License](https://oss.ninja/mit/developit) © [Jason Miller](https://jasonformat.com)

[preact]: https://github.com/developit/preact

[react]: https://github.com/facebook/react
