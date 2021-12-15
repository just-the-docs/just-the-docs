# [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

# jstrs

Javascript String functions

jstrs 常用字符串处理函数

e.g.

+ input:

```js
console.log(jstrs.format('#{0} #{1} {0}', [10, 2])); // '10 2 10'
console.log(jstrs.encodeHTML('<div>')); // '&lt;div;&gt;'
```

## License

MIT © [zswang](http://weibo.com/zswang)

[npm-url]: https://npmjs.org/package/jstrs
[npm-image]: https://badge.fury.io/js/jstrs.svg
[travis-url]: https://travis-ci.org/zswang/jstrs
[travis-image]: https://travis-ci.org/zswang/jstrs.svg?branch=master
[coverage-url]: https://coveralls.io/github/zswang/jstrs?branch=master
[coverage-image]: https://coveralls.io/repos/zswang/jstrs/badge.svg?branch=master&service=github
