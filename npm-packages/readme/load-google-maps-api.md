# load-google-maps-api [![npm Version](https://badgen.net/npm/v/load-google-maps-api)](https://www.npmjs.org/package/load-google-maps-api) [![Build Status](https://badgen.net/travis/yuanqing/load-google-maps-api?label=build)](https://travis-ci.org/yuanqing/load-google-maps-api) [![Bundle Size](https://badgen.net/bundlephobia/minzip/load-google-maps-api)](https://bundlephobia.com/result?p=load-google-maps-api)

> A lightweight Promise-returning helper for loading the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/)

- The Promise’s fulfilled callback is passed the `google.maps` object
- Optionally set a timeout, an API key, the language, [and more](#loadgooglemapsapioptions)

## Usage

> [**Editable demo (CodePen)**](https://codepen.io/lyuanqing/pen/YeYBrN)

```js
const loadGoogleMapsApi = require('load-google-maps-api')

loadGoogleMapsApi().then(function (googleMaps) {
  new googleMaps.Map(document.querySelector('.map'), {
    center: {
      lat: 40.7484405,
      lng: -73.9944191
    },
    zoom: 12
  })
}).catch(function (error) {
  console.error(error)
})
```

*N.B.* Just like the Google Maps API itself, this module is client-side only.

## Motivation

[Without this module](https://developers.google.com/maps/documentation/javascript/tutorial#Loading_the_Maps_API), you would need to specify a named *global* callback, and pass said callback’s name as a parameter in the `script` tag’s `src`. For example:

```html
<script>
window.googleMapsOnLoad = function () {
  // `window.google.maps` available here
}
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?callback=googleMapsOnLoad"></script>
```

This module abstracts this ceremony away, and fits better with modern bundlers like [Browserify](http://browserify.org/) or [Webpack](https://webpack.github.io/).

## API

```js
const loadGoogleMapsApi = require('load-google-maps-api')
```

### loadGoogleMapsApi([options])

Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

- **Fulfilled** if loading was successful. The fulfilled callback is passed the `google.maps` object. If `loadGoogleMapsApi` is called multiple times on a page, the fulfilled callback will be passed the previously-loaded `google.maps` object.
- **Rejected** if we weren’t able to load the Google Maps API after `options.timeout`.

See [Usage](#usage).

`options` is an optional object literal:

  Key | Description | Default
  :--|:--|:--
  `apiUrl` | The Google Maps API `script` tag URL | `'https://maps.googleapis.com/maps/api/js'`
  `channel` | [Client usage reporting channel](https://developers.google.com/maps/premium/reports/usage-reports#channels) | `undefined`
  `client` | [Client ID](https://developers.google.com/maps/documentation/javascript/get-api-key#specifying-a-client-id-when-loading-the-api) | `undefined`
  `key` | [Your API key](https://developers.google.com/maps/documentation/javascript/get-api-key#step-2-add-the-api-key-to-your-application) | `undefined`
  `language` | [Language](https://developers.google.com/maps/documentation/javascript/localization#Language) | `undefined`
  `libraries` | [Supplemental libraries to load](https://developers.google.com/maps/documentation/javascript/libraries) | `[]`
  `region` | [Region](https://developers.google.com/maps/documentation/javascript/localization#Region) | `undefined`
  `timeout` | Time in milliseconds before rejecting the Promise | `10000`
  `v` | [API version](https://developers.google.com/maps/documentation/javascript/versions) | `undefined`

## Installation

```sh
$ yarn add load-google-maps-api
```

## License

[MIT](LICENSE.md)
