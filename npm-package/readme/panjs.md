## panJS

[![Build Status](https://travis-ci.org/Knape/panjs.svg?branch=master)](https://travis-ci.org/Knape/panjs)
[![Coverage Status](https://coveralls.io/repos/github/Knape/panjs/badge.svg?branch=master)](https://coveralls.io/github/Knape/panjs?branch=master)
[![Sauce Test Status](https://saucelabs.com/buildstatus/PanJs)](https://saucelabs.com/u/PanJs)

### Description
Pan images without dependencies

### Install with npm

```bash
npm install --save panjs
```

### Install with bower

```bash
bower install panjs --save
```

## Usage

### Prerequisited markup

```html
<div class="img-wrapper">
    <img src="/path/to/image.jpg" alt="">
</div>
```

### Prerequisited css

```css
.img-wrapper {
  overflow: hidden;
}
```

### Integration

```js
  import panjs from 'panjs';
  var wrapper = document.querySelectorAll('.img-wrapper');

  panjs(wrapper, {
    // options going here, at the moment we do not support any options
  });
```

## Public API

|Name|Description|arguments|returns|
|---|---|---|---|
|setup|inds eventlisteners, merging default and user options, setup the pan based on DOM (called once during initialisation). Call setup if DOM or user options have changed or eventlisteners needs to be rebinded.|String | HTMLElement|Void|
|reset|Sets the pan back to the starting position or position passed to method|Object|Void|
|destroy|Resets and destroys the panjs instance by removing all panjs specific event listeners||Void|
|offset|Get the current offset, values between 0 - 1||Object|

## Options

|Name|Description|Type|Default|
|---|---|---|---|
|target|If multiple images are inside wrapper, pass a target css selector to select the preferred image|String | Null|null|
|offset|Start offset for inner image, between 0 - 1|Object|{ x: 0, y: 0 }|
|xAxisLock|Ability to lock x-axis|Boolean|false|
|yAxisLock|Ability to lock y-axis|Boolean|false|
|speed|Speed on returning to default state when calling reset or destroy|Number|0|
|easing|Kind of css easing on returning to default state when calling reset or destroy|String|ease|

## Browser support

[![Sauce Test Status](https://saucelabs.com/browser-matrix/PanJs.svg)](https://saucelabs.com/u/PanJs)

Note: If you attend to use this module with older browser its mandatory to polyfill both `Array.from` and `Object.assign`

## License

[MIT](LICENSE). Copyright (c) 2016 Philip Knape.
