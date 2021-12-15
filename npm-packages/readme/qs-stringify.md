# qs-stringify

Simple query stringify with nesting.

[![npm][npm-image]][npm-url]
[![github][github-image]][github-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/qs-stringify.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/qs-stringify
[github-image]: https://github.com/goto-bus-stop/qs-stringify/workflows/Node%20CI/badge.svg
[github-url]: https://github.com/goto-bus-stop/qs-stringify/actions
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```
npm install qs-stringify
```

## Usage

```js
var stringify = require('qs-stringify')

stringify({
  page: {
    offset: 50,
    limit: 25
  },
  filter: 'hello world'
})
// → "page[offset]=50&page[limit]=25&filter=hello%20world"
```

## License

[MIT](LICENSE.md)
