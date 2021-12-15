# JFormat

[![Node](https://img.shields.io/node/v/jformat.svg?style=flat-square)](https://npmjs.org/package/jformat) [![Version](https://img.shields.io/npm/v/jformat.svg?style=flat-square)](https://npmjs.org/package/jformat) [![Downloads](https://img.shields.io/npm/dt/jformat.svg?style=flat-square)](https://npmjs.org/package/jformat) [![Travis](https://img.shields.io/travis/TiagoDanin/JFormat.svg?branch=master&style=flat-square)](https://travis-ci.org/TiagoDanin/JFormat) 

Python function str.format for JavaScript

## Installation

Module available through the [npm registry](https://www.npmjs.com/). It can be installed using the  [`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) or [`yarn`](https://yarnpkg.com/en/) command line tools.

```sh
# NPM
npm install jformat --save
# Or Using Yarn
yarn add jformat
```

## Example

```js
"Forever {Python}".format({Python: "JavaScript"});
// "Forever JavaScript"

"Forever {0}".format(["JavaScript"]);
// "Forever JavaScript"

"Forever {Java}".format({}, true);
// "Forever "

format("Forever {Python}", {Python: "JavaScript"});
// "Forever JavaScript"

format("Forever {0}", ["JavaScript"]);
// "Forever JavaScript"

format("Forever {Java}", {}, true);
// "Forever "
```

## Documentation

```js
format(string, table, HideIfNull)
```

### Options

- **string**

Type: `string`

- **table**

Type: `array` & `object`

- **HideIfNull**

Type: `boolean`

## Tests

To run the test suite, first install the dependencies, then run `test`:

```sh
# NPM
npm test
# Or Using Yarn
yarn test
```

## Dependencies

None

## Contributors

Pull requests and stars are always welcome. For bugs and feature requests, please [create an issue](https://github.com/TiagoDanin/JFormat/issues). [List of all contributors](https://github.com/TiagoDanin/JFormat/graphs/contributors).

## License

[MIT](LICENSE) © [TiagoDanin](https://TiagoDanin.github.io)