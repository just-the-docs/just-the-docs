# [react-linkify](http://tasti.github.io/react-linkify/)
React component to parse links (urls, emails, etc.) in text into clickable links

## Examples

Live examples are available at [http://tasti.github.io/react-linkify/](http://tasti.github.io/react-linkify/).

### Basic

Any link that appears inside the `Linkify` component will become clickable.

```
<Linkify>See examples at tasti.github.io/react-linkify/.</Linkify>
```

Renders to:

See examples at `tasti.github.io/react-linkify/`.

### Advanced

If you're feeling lazy, you can wrap `Linkify` around anywhere that you want links to become clickable. Even with nested elements, it traverses the tree to find links.

```
<Linkify>
  <div>react-linkify <span>(tasti.github.io/react-linkify/)</span></div>
    <div>React component to parse links (urls, emails, etc.) in text into clickable links</div>
  See examples at tasti.github.io/react-linkify/.
    <footer>Contact: tasti@zakarie.com</footer>
</Linkify>
```

Renders to:

react-linkify (`tasti.github.io/react-linkify/`)
React component to parse links (urls, emails, etc.) in text into clickable links
See examples at `tasti.github.io/react-linkify/`.
Contact: `tasti@zakarie.com`


## Installation

```
yarn add react-linkify
```

or

```
npm install react-linkify --save
```

## Usage

```js
import Linkify from 'react-linkify';

React.render(
  <Linkify>Examples are available at tasti.github.io/react-linkify/.</Linkify>,
  document.body
);
```

## Props

**component**
The type of component to wrap links in.
_type:_ `any`
_default:_ `'a'`

**properties**
The props that will be added to every matched component.
_type:_ `object`
_default:_ `{}`

NOTE: Use `Linkify.MATCH` as a value to specify the matched link. The properties prop will always contain `{href: Linkify.MATCH, key: 'LINKIFY_KEY_#'}` unless overridden.


## Customization

You can access to the global `Linkify` instance used to linkify contents by importing it (`import { linkify } from 'react-linkify'`).
That way you can customize as needed (e.g. disabling existing schemas or adding new ones).

Note that any customization made to that instance will affect every `Linkify` component you use.

## Examples

All kind of links detectable by
[linkify-it](https://github.com/markdown-it/linkify-it) are supported. For
examples, visit [their website](http://markdown-it.github.io/linkify-it/).
