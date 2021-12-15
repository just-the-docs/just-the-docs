# date-fns-timezone
[![NPM version](https://badge.fury.io/js/date-fns-timezone.png)](http://badge.fury.io/js/date-fns-timezone)
[![Build Status](https://travis-ci.org/prantlf/date-fns-timezone.png)](https://travis-ci.org/prantlf/date-fns-timezone)
[![Coverage Status](https://coveralls.io/repos/github/prantlf/date-fns-timezone/badge.svg?branch=master)](https://coveralls.io/github/prantlf/date-fns-timezone?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4bb0f2ef6c1b4212a4ed2dbf1f3e8b29)](https://www.codacy.com/app/prantlf/date-fns-timezone?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=prantlf/date-fns-timezone&amp;utm_campaign=Badge_Grade)
[![Dependency Status](https://david-dm.org/prantlf/date-fns-timezone.svg)](https://david-dm.org/prantlf/date-fns-timezone)
[![devDependency Status](https://david-dm.org/prantlf/date-fns-timezone/dev-status.svg)](https://david-dm.org/prantlf/date-fns-timezone#info=devDependencies)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Provides parsing and formatting date strings and time zone conversions supporting [IANA time zones], following the design of functions in [date-fns]. List of canonical time zone names is provided by [timezone-support].

### Table of Contents

- [Synopsis](#synopsis)
- [Installation and Getting Started](#installation-and-getting-started)
- [Usage Scenarios](./docs/usage.md#usage-scenarios)
- [API Reference](./docs/API.md#api-reference)
- [Contributing](#contributing)
- [Release History](#release-history)
- [License](#license)

## Synopsis

```js
const { listTimeZones } = require('timezone-support')
const { parseFromTimeZone, formatToTimeZone } = require('date-fns-timezone')

// List canonical time zone names: [ 'Africa/Abidjan', ... ]
const timeZones = listTimeZones()

// Set the date to "2018-09-01T16:01:36.386Z"
const date = parseFromTimeZone('2018-09-01 18:01:36.386', { timeZone: 'Europe/Berlin' })

// Set the output to "1.9.2018 18:01:36.386 GMT+02:00 (CEST)"
const date = new Date('2018-09-01Z16:01:36.386Z')
const format = 'D.M.YYYY HH:mm:ss.SSS [GMT]Z (z)'
const output = formatToTimeZone(date, format, { timeZone: 'Europe/Berlin' })
```

## Installation and Getting Started

This module can be installed in your project using [NPM] or [Yarn]. Make sure, that you use [Node.js] version 6 or newer.

```sh
$ npm i date-fns-timezone --save
```

```sh
$ yarn add date-fns-timezone
```

Functions are exposed as named exports from the package modules, for example:

```js
const { parseFromTimeZone, formatToTimeZone } = require('date-fns-timezone')
```

You can read more about the [module loading](./docs/API.md#loading) in other environments, like with ES6 or in web browsers. [Usage scenarios](./docs/usage.md#usage-scenarios) demonstrate applications of this library in typical real-world scenarios. The [API reference](./docs/API.md#api-reference) lists all functions with a description of their functionality.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.  Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## Release History

* 2018-10-10   v0.1.4   Fix compatibility with IE. Thanks, [Andrii](https://github.com/AndriiDidkivsky)!
* 2018-10-06   v0.1.2   Add TypeScript export declarations.
* 2018-09-19   v0.1.0   Add parseString without a time zone to cover a gap in date-fns
* 2018-09-17   v0.0.1   Initial release

## License

Copyright (c) 2018 Ferdinand Prantl

Licensed under the MIT license.

[IANA time zones]: https://www.iana.org/time-zones
[date-fns]: https://github.com/date-fns/date-fns
[timezone-support]: https://github.com/prantlf/timezone-support
[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[Yarn]: https://yarnpkg.com/
[RequireJS]: https://requirejs.org/
