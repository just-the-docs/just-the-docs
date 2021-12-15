# idle-js

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

`npm install idle-js --save`

## Usage

```js
// Those are the default values
var idle = new IdleJs({
  idle: 10000, // idle time in ms
  events: ['mousemove', 'keydown', 'mousedown', 'touchstart'], // events that will trigger the idle resetter
  onIdle: function () {}, // callback function to be executed after idle time
  onActive: function () {}, // callback function to be executed after back form idleness
  onHide: function () {}, // callback function to be executed when window become hidden
  onShow: function () {}, // callback function to be executed when window become visible
  keepTracking: true, // set it to false if you want to be notified only on the first idleness change
  startAtIdle: false // set it to true if you want to start in the idle state
});
idle.start();

// In case stopping is needed
idle.stop()   // stops all tracking
    .reset()  // reset visible and idle state to initial values
    .start();

// Reset to a specific state
idle.reset({
  idle: false,
  visible: ! document.hidden,
})
```

## Running examples

#### Webpack:

* Run the command `npx webpack ./example/webpack/entry.js ./example/webpack/bundle.js`.
* Open `./example/webpack/index.html` in your browser.

#### In browser:

* Open `./example/vanilla/index.html`
