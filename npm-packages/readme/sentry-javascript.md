<p>
  <a href="https://sentry.io" target="_blank">
    <img src="https://sentry-brand.storage.googleapis.com/sentry-logo-black.png" width="280">
  </a>
  <br />
</p>

_Bad software is everywhere, and we're tired of it. Sentry is on a mission to help developers write better software faster, so we can get back to enjoying technology. If you want to join us [<kbd>**Check out our open positions**</kbd>](https://sentry.io/careers/)_

![Build & Test](https://github.com/getsentry/sentry-javascript/workflows/Build%20&%20Test/badge.svg)
[![codecov](https://codecov.io/gh/getsentry/sentry-javascript/branch/master/graph/badge.svg)](https://codecov.io/gh/getsentry/sentry-javascript)
[![npm version](https://img.shields.io/npm/v/@sentry/core.svg)](https://www.npmjs.com/package/@sentry/core)
[![typedoc](https://img.shields.io/badge/docs-typedoc-blue.svg)](http://getsentry.github.io/sentry-javascript/)
[![Discord](https://img.shields.io/discord/621778831602221064)](https://discord.gg/Ww9hbqr)

# Official Sentry SDKs for JavaScript

This is the next line of Sentry JavaScript SDKs, comprised in the `@sentry/` namespace. It will provide a more
convenient interface and improved consistency between various JavaScript environments.

## Links

- [![TypeDoc](https://img.shields.io/badge/documentation-TypeDoc-green.svg)](http://getsentry.github.io/sentry-javascript/)
- [![Documentation](https://img.shields.io/badge/documentation-sentry.io-green.svg)](https://docs.sentry.io/quickstart/)
- [![Forum](https://img.shields.io/badge/forum-sentry-green.svg)](https://forum.sentry.io/c/sdks)
- [![Discord](https://img.shields.io/discord/621778831602221064)](https://discord.gg/Ww9hbqr)
- [![Stack Overflow](https://img.shields.io/badge/stack%20overflow-sentry-green.svg)](http://stackoverflow.com/questions/tagged/sentry)
- [![Twitter Follow](https://img.shields.io/twitter/follow/getsentry?label=getsentry&style=social)](https://twitter.com/intent/follow?screen_name=getsentry)

## Contents

- [Contributing](https://github.com/getsentry/sentry-javascript/blob/master/CONTRIBUTING.md)
- [Supported Platforms](#supported-platforms)
- [Installation and Usage](#installation-and-usage)
- [Other Packages](#other-packages)

## Supported Platforms

For each major JavaScript platform, there is a specific high-level SDK that provides all the tools you need in a single
package. Please refer to the README and instructions of those SDKs for more detailed information:

- [`@sentry/browser`](https://github.com/getsentry/sentry-javascript/tree/master/packages/browser): SDK for Browsers
  including integrations for Backbone
- [`@sentry/node`](https://github.com/getsentry/sentry-javascript/tree/master/packages/node): SDK for Node, including
  integrations for Express, Koa, Loopback, Sails and Connect
- [`@sentry/angular`](https://github.com/getsentry/sentry-javascript/tree/master/packages/angular): browser SDK with Angular integration enabled
- [`@sentry/react`](https://github.com/getsentry/sentry-javascript/tree/master/packages/react): browser SDK with React integration enabled 
- [`@sentry/ember`](https://github.com/getsentry/sentry-javascript/tree/master/packages/ember): browser SDK with Ember integration enabled
- [`@sentry/vue`](https://github.com/getsentry/sentry-javascript/tree/master/packages/vue): browser SDK with Vue integration enabled
- [`@sentry/gatsby`](https://github.com/getsentry/sentry-javascript/tree/master/packages/gatsby): SDK for Gatsby
- [`@sentry/nextjs`](https://github.com/getsentry/sentry-javascript/tree/master/packages/nextjs): SDK for Next.js
- [`@sentry/integrations`](https://github.com/getsentry/sentry-javascript/tree/master/packages/integrations): Pluggable
  integrations that can be used to enhance JS SDKs
- [`@sentry/electron`](https://github.com/getsentry/sentry-electron): SDK for Electron with support for native crashes
- [`@sentry/react-native`](https://github.com/getsentry/sentry-react-native): SDK for React Native with support for native crashes
- [`@sentry/capacitor`](https://github.com/getsentry/sentry-capacitor): SDK for Capacitor Apps and Ionic with support for
  native crashes
- [`sentry-cordova`](https://github.com/getsentry/sentry-cordova): SDK for Cordova Apps and Ionic with support for
  native crashes
- [`raven-js`](https://github.com/getsentry/sentry-javascript/tree/3.x/packages/raven-js): Our old stable JavaScript
  SDK, we still support and release bug fixes for the SDK but all new features will be implemented in `@sentry/browser`
  which is the successor.
- [`raven`](https://github.com/getsentry/sentry-javascript/tree/3.x/packages/raven-node): Our old stable Node SDK,
  same as for `raven-js` we still support and release bug fixes for the SDK but all new features will be implemented in
  `@sentry/node` which is the successor.

## Installation and Usage

To install a SDK, simply add the high-level package, for example:

```sh
npm install --save @sentry/browser
yarn add @sentry/browser
```

Setup and usage of these SDKs always follows the same principle.

```javascript
import { init, captureMessage } from '@sentry/browser';

init({
  dsn: '__DSN__',
  // ...
});

captureMessage('Hello, world!');
```

## Other Packages

Besides the high-level SDKs, this repository contains shared packages, helpers and configuration used for SDK
development. If you're thinking about contributing to or creating a JavaScript-based SDK, have a look at the resources
below:

- [`@sentry/tracing`](https://github.com/getsentry/sentry-javascript/tree/master/packages/tracing): Provides Integrations and
extensions for Performance Monitoring / Tracing
- [`@sentry/hub`](https://github.com/getsentry/sentry-javascript/tree/master/packages/hub): Global state management of
  SDKs
- [`@sentry/minimal`](https://github.com/getsentry/sentry-javascript/tree/master/packages/minimal): Minimal SDK for
  library authors to add Sentry support
- [`@sentry/core`](https://github.com/getsentry/sentry-javascript/tree/master/packages/core): The base for all
  JavaScript SDKs with interfaces, type definitions and base classes.
- [`@sentry/utils`](https://github.com/getsentry/sentry-javascript/tree/master/packages/utils): A set of helpers and
  utility functions useful for various SDKs.
- [`@sentry/types`](https://github.com/getsentry/sentry-javascript/tree/master/packages/types): Types used in all
  packages.
