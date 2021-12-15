<img src="https://github.com/atomiks/tippy.js-react/raw/master/logo.png" alt="Logo" height="105">

<h1>Tippy.js for React</h1>

[Tippy.js](https://github.com/atomiks/tippyjs/) is the complete tooltip,
popover, dropdown, and menu solution for the web, powered by Popper.

Tippy is an abstraction over Popper that provides common logic involved in all
types of elements that pop out on top of the UI, positioned next to a target or
reference element. This is a React wrapper for the core library, providing full
integration including headless rendering abilities.

## 🚀 Installation

```bash
# npm
npm i @tippyjs/react

# Yarn
yarn add @tippyjs/react
```

CDN: https://unpkg.com/@tippyjs/react

## 🖲 Usage

There are two ways to use this component:

- **Default**: With the built-in DOM rendering and optionally the default CSS.
  This is complete "out of the box" behavior and requires no setup. If you want
  something that just works, this is for you.
- **Headless**: With React's DOM rendering for improved usage with CSS-in-JS and
  spring libraries. If you want greater control over your poppers to integrate
  fully with design systems, this is for you.

Both may be used in conjunction.

### Default Tippy

Import the `Tippy` component and (optionally) the core CSS. Wrap the `<Tippy />`
component around the element, supplying the tooltip's content as the `content`
prop. It can take a string or a tree of React elements.

```jsx
import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
const StringContent = () => (
  <Tippy content="Hello">
    <button>My button</button>
  </Tippy>
);
const JSXContent = () => (
  <Tippy content={<span>Tooltip</span>}>
    <button>My button</button>
  </Tippy>
);
```

Default Tippy "just works" out of the box.

### Headless Tippy

Render your own tippy element from scratch:

```jsx
import React from 'react';
import Tippy from '@tippyjs/react/headless'; // different import path!

const HeadlessTippy = () => (
  <Tippy
    render={attrs => (
      <div className="box" tabIndex="-1" {...attrs}>
        My tippy box
      </div>
    )}
  >
    <button>My button</button>
  </Tippy>
);
```

`attrs` is an object containing `data-placement`, `data-reference-hidden`, and
`data-escaped` attributes. This allows you to conditionally style your tippy.

#### Headless animation

- [`framer-motion`](https://codesandbox.io/s/festive-fire-hcr47)
- [`react-spring`](https://codesandbox.io/s/vigilant-northcutt-7w3yr)

#### Headless arrow

To make Popper position your custom arrow, set a `data-popper-arrow` attribute
on it:

```jsx
<Tippy
  render={attrs => (
    <Box {...attrs}>
      Hello
      <Arrow data-popper-arrow="" />
    </Box>
  )}
>
  <button>Reference</button>
</Tippy>
```

For details on styling the arrow from scratch,
[take a look at the Popper tutorial](https://popper.js.org/docs/v2/tutorial/#arrow).

**Note: your arrow must be an `HTMLElement` (not an `SVGElement`). To use an SVG
arrow, wrap it in a `<div>` tag with the `data-popper-arrow` attribute.**

You may also pass a ref to the element directly without the attribute using a
callback ref

#### Headless root element

When rendering an element with the `render` prop, you're rendering the inner
element that the root popper (positioned) node wraps.

For advanced cases you can access the root element via `instance.popper`.

[Here's `moveTransition` with Framer Motion](https://codesandbox.io/s/tippyjs-react-framer-motion-j94mj).

### Component children

If you want to use a component element as a child of the component, ensure you
forward the ref to the DOM node:

```jsx
import React, {forwardRef} from 'react';
function ThisWontWork() {
  return <button>Reference</button>;
}
const ThisWillWork = forwardRef((props, ref) => {
  return <button ref={ref}>Reference</button>;
});
function App() {
  return (
    <Tippy content="Tooltip">
      <ThisWillWork />
    </Tippy>
  );
}
```

`styled-components` v4+ does this for you automatically, so it should be
seamless when using the `styled` constructor.

Workaround for old libraries that don't forward the ref is to use a `<span>`
wrapper tag:

```jsx
<Tippy content="Tooltip">
  <span tabIndex="0">
    <LegacyComponent>Reference</LegacyComponent>
  </span>
</Tippy>
```

## 🧬 Props

All of the native Tippy.js props can be passed to the component.

Visit [All Props](https://atomiks.github.io/tippyjs/v6/all-props/) to view the
complete list.

```jsx
<Tippy content="Tooltip" interactive={true} interactiveBorder={20} delay={100}>
  <button>Reference</button>
</Tippy>
```

In addition, there are 3 more props added specifically for the React component.

### `className?: string`

```jsx
<Tippy content="Tooltip" className="hello world">
  <button>Reference</button>
</Tippy>
```

This allows you to use `styled(Tippy)` or the `css` prop in `styled-components`
or `emotion`.

> Note: Does not apply if using Headless Tippy.

### `disabled?: boolean`

```jsx
function App() {
  const [disabled, setDisabled] = useState(false);
  return (
    <Tippy content="Tooltip" disabled={disabled}>
      <button>Reference</button>
    </Tippy>
  );
}
```

### `visible?: boolean` (controlled mode)

Use React's state to fully control the tippy instead of relying on the native
`trigger` and `hideOnClick` props:

```jsx
function App() {
  const [visible, setVisible] = useState(true);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  return (
    <Tippy content="Tooltip" visible={visible} onClickOutside={hide}>
      <button onClick={visible ? hide : show}>Reference</button>
    </Tippy>
  );
}
```

### `reference?: React.RefObject | Element`

> Available from `v4.1.0`

If you can't place your reference element as a child inside `<Tippy />`, you can
use this prop instead. It accepts a React `RefObject` (`.current` property) or a
plain `Element`.

```jsx
function App() {
  const ref = useRef();
  return (
    <>
      <button ref={ref} />
      <Tippy content="Tooltip" reference={ref} />
    </>
  );
}
```

### Plugins

Tippy.js splits certain props into separate pieces of code called plugins to
enable tree-shaking, so that components or routes that don't need the prop's
functionality are not burdened with the bundle size cost of it. In addition,
they enable a neat way to extend the functionality of tippy instances.

```jsx
import Tippy from '@tippyjs/react';
// ⚠️ import from 'tippy.js/headless' if using Headless Tippy
import {followCursor} from 'tippy.js';
function App() {
  return (
    <Tippy content="Tooltip" followCursor={true} plugins={[followCursor]}>
      <button>Reference</button>
    </Tippy>
  );
}
```

[Read more about plugins here](https://atomiks.github.io/tippyjs/v6/plugins/).

## 🌈 Multiple tippies on a single element

You can nest the components like so:

```jsx
<Tippy content="Tooltip" placement="bottom">
  <Tippy content="Tooltip" placement="left">
    <Tippy content="Tooltip" placement="right">
      <Tippy content="Tooltip">
        <button>Reference</button>
      </Tippy>
    </Tippy>
  </Tippy>
</Tippy>
```

## Lazy mounting

By default, Tippy mounts your `content` or `render` elements into a container
element once created, even if the tippy isn't mounted on the DOM. In most cases,
this is fine, but in performance-sensitive scenarios or cases where mounting the
component should fire effects only when the tippy mounted, you can lazify the
component.

[View the following gists to optimize your `<Tippy />` if needed.](https://gist.github.com/atomiks/520f4b0c7b537202a23a3059d4eec908)

## 📚 useSingleton

A Hook for the
[`createSingleton()`](https://atomiks.github.io/tippyjs/v6/addons/#singleton)
addon to re-use a single tippy element for many different reference element
targets.

[View on CodeSandbox](https://codesandbox.io/s/unruffled-pasteur-4yy99?file=/src/App.js)

```jsx
import Tippy, {useSingleton} from '@tippyjs/react';

function App() {
  const [source, target] = useSingleton();

  return (
    <>
      {/* This is the tippy that gets used as the singleton */}
      <Tippy singleton={source} delay={500} />

      {/* These become "virtual" */}
      <Tippy content="Hello" singleton={target}>
        <button>Reference</button>
      </Tippy>
      <Tippy content="Bye" singleton={target}>
        <button>Reference</button>
      </Tippy>
    </>
  );
}
```

`useSingleton()` takes an optional props argument:

```js
const [source, target] = useSingleton({
  disabled: true,
  overrides: ['placement'],
});
```

### Headless singleton

The `render` prop takes the singleton content as a second parameter:

```jsx
import Tippy, {useSingleton} from '@tippyjs/react/headless';

function App() {
  const [source, target] = useSingleton();

  return (
    <>
      <Tippy
        singleton={source}
        render={(attrs, content) => (
          <div className="box" tabIndex="-1" {...attrs}>
            {content}
          </div>
        )}
        delay={500}
      />

      <Tippy content="Hello" singleton={target}>
        <button>Reference</button>
      </Tippy>
      <Tippy content="Bye" singleton={target}>
        <button>Reference</button>
      </Tippy>
    </>
  );
}
```

## 📝 License

MIT