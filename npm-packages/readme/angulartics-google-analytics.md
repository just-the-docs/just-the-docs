## angulartics-google-analytics

[![NPM version][npm-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-downloads-url] [![Bower version][bower-image]][bower-url] [![Dependencies status][dep-status-image]][dep-status-url] [![MIT license][license-image]][license-url] [![Join the Slack chat][slack-image]][slack-url] [![Build Status](https://travis-ci.org/angulartics/angulartics-google-analytics.svg?branch=master)](https://travis-ci.org/angulartics/angulartics-google-analytics)

Google Analytics plugin for [Angulartics](https://github.com/angulartics/angulartics).

## Install

First make sure you've read installation and setup instructions for [Angulartics](https://github.com/angulartics/angulartics#install).

Then you can install this package either with `npm` or with `bower`.

### npm

```shell
npm install angulartics-google-analytics
```

Then add `angulartics.google.analytics` as a dependency for your app:

```javascript
require('angulartics')

angular.module('myApp', [
  'angulartics',
  require('angulartics-google-analytics')
]);
```

> Please note that core Angulartics doesn't export the name yet, but it will once we move it into [the new organization](http://github.com/angulartics).

### bower

```shell
bower install angulartics-google-analytics
```

Add the `<script>` to your `index.html`:

```html
<script src="/bower_components/angulartics-google-analytics/dist/angulartics-ga.min.js"></script>
```

Then add `angulartics.google.analytics` as a dependency for your app:

```javascript
angular.module('myApp', [
  'angulartics',
  'angulartics.google.analytics'
]);
```

## Changes in the Google Analytics snippet

The snippet code provided by Google Analytics does an automatic pageview hit, but this is already done by Angulartics (unless you disable it) so make sure to delete the tracking line:

```js
      ...
      ga('create', 'UA-XXXXXXXX-X', 'none'); // 'none' while you are working on localhost
      ga('send', 'pageview');  // DELETE THIS LINE!
    </script>
```

Done. Open your app, browse across the different routes and check [the realtime GA dashboard](https://www.google.com/analytics/web/?hl=en#realtime/rt-overview) to see the hits.

## Documentation

Documentation is available on the [Angulartics site](http://angulartics.github.io/).

### Settings
Module settings are done via the `$analyticsProvider.settings.ga` property.  The following are GA-specific properties:
* `transport`
  _(Default: `undefined`)_ -
  sets the `transport` property for the `ga` function call.  See the [GA Transport Documentation](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#transport) for more information how to properly set this value.  This should be a string.

## Development

```shell
npm run build
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/angulartics-google-analytics.svg
[npm-url]: https://npmjs.org/package/angulartics-google-analytics
[npm-downloads-image]: https://img.shields.io/npm/dm/angulartics-google-analytics.svg
[npm-downloads-url]: https://npmjs.org/package/angulartics-google-analytics
[bower-image]: https://img.shields.io/bower/v/angulartics-google-analytics.svg
[bower-url]: http://bower.io/search/?q=angulartics-google-analytics
[dep-status-image]: https://img.shields.io/david/angulartics/angulartics-google-analytics.svg
[dep-status-url]: https://david-dm.org/angulartics/angulartics-google-analytics
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE
[slack-image]: https://angulartics.herokuapp.com/badge.svg
[slack-url]: https://angulartics.herokuapp.com
