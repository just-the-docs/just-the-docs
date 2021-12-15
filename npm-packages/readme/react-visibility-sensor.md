React Visibility Sensor
====

[![Build Status](https://secure.travis-ci.org/joshwnj/react-visibility-sensor.png)](http://travis-ci.org/joshwnj/react-visibility-sensor)

Sensor component for React that notifies you when it goes in or out of the window viewport.

Sponsored by [X-Team](https://x-team.com)

Install
----

`npm install react-visibility-sensor`

### Including the script directly

Useful if you want to use with bower, or in a plain old `<script>` tag.

In this case, make sure that `React` and `ReactDOM` are already loaded and globally accessible.

- Plain: <https://unpkg.com/react-visibility-sensor@5.0.1/dist/visibility-sensor.js>
- Minified <https://unpkg.com/react-visibility-sensor@5.0.1/dist/visibility-sensor.min.js>

Take a look at the [umd example](./example-umd/) to see this in action

Example
----

[View an example on codesandbox](https://codesandbox.io/s/p73kyx9zpm)

Or if you'd like to try building an example yourself locally, here's another:

[View the example](https://joshwnj.github.io/react-visibility-sensor/)

To run the example locally:

- `npm run build-example`
- open `example/index.html` in a browser

General usage goes something like:

```js
const VisibilitySensor = require('react-visibility-sensor');

function onChange (isVisible) {
  console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
}

function MyComponent (props) {
  return (
    <VisibilitySensor onChange={onChange}>
      <div>...content goes here...</div>
    </VisibilitySensor>
  );
}
```

You can also pass a child function, which can be convenient if you don't need to store the visibility anywhere:

```js
function MyComponent (props) {
  return (
    <VisibilitySensor>
      {({isVisible}) =>
        <div>I am {isVisible ? 'visible' : 'invisible'}</div>
      }
    </VisibilitySensor>
  );
}
```

Props
----

- `onChange`: callback for whenever the element changes from being within the window viewport or not. Function is called with 1 argument `(isVisible: boolean)`
- `active`: (default `true`) boolean flag for enabling / disabling the sensor.  When `active !== true` the sensor will not fire the `onChange` callback.
- `partialVisibility`: (default `false`) consider element visible if only part of it is visible. Also possible values are - 'top', 'right', 'bottom', 'left' - in case it's needed to detect when one of these become visible explicitly.
- `offset`: (default `{}`) with offset you can define amount of px from one side when the visibility should already change. So in example setting `offset={{top:10}}` means that the visibility changes hidden when there is less than 10px to top of the viewport. Offset works along with `partialVisibility`
- `minTopValue`: (default `0`) consider element visible if only part of it is visible and a minimum amount of pixels could be set, so if at least 100px are in viewport, we mark element as visible.
- `intervalCheck`: (default `true`) when this is true, it gives you the possibility to check if the element is in view even if it wasn't because of a user scroll
- `intervalDelay`: (default `100`) integer, number of milliseconds between checking the element's position in relation the the window viewport. Making this number too low will have a negative impact on performance.
- `scrollCheck`: (default: `false`) by making this true, the scroll listener is enabled.
- `scrollDelay`: (default: `250`) is the debounce rate at which the check is triggered. Ex: 250ms after the user stopped scrolling.
- `scrollThrottle`: (default: `-1`) by specifying a value > -1, you are enabling throttle instead of the delay to trigger checks on scroll event. Throttle supercedes delay.
- `resizeCheck`: (default: `false`) by making this true, the resize listener is enabled. Resize listener only listens to the window.
- `resizeDelay`: (default: `250`) is the debounce rate at which the check is triggered. Ex: 250ms after the user stopped resizing.
- `resizeThrottle`: (default: `-1`) by specifying a value > -1, you are enabling throttle instead of the delay to trigger checks on resize event. Throttle supercedes delay.
- `containment`: (optional) element to use as a viewport when checking visibility. Default behaviour is to use the browser window as viewport.
- `delayedCall`: (default `false`) if is set to true, wont execute on page load ( prevents react apps triggering elements as visible before styles are loaded )
- `children`: can be a React element or a function.  If you provide a function, it will be called with 1 argument `{isVisible: ?boolean, visibilityRect: Object}`

It's possible to use both `intervalCheck` and `scrollCheck` together. This means you can detect most visibility changes quickly with `scrollCheck`, and an `intervalCheck` with a higher `intervalDelay` will act as a fallback for other visibility events, such as resize of a container.

Thanks
----

Special thanks to [contributors](https://github.com/joshwnj/react-visibility-sensor/graphs/contributors)

License
----

MIT
