# fulcon [![NPM Module](https://img.shields.io/npm/v/fulcon.svg?style=flat)](https://www.npmjs.com/package/fulcon)

Clones a function (creates wrapper function), with the same signature as source function

[![PhantomJS Build](https://img.shields.io/travis/alexindigo/fulcon/master.svg?label=browser&style=flat)](https://travis-ci.org/alexindigo/fulcon)
[![Linux Build](https://img.shields.io/travis/alexindigo/fulcon/master.svg?label=linux:6.x-10.x&style=flat)](https://travis-ci.org/alexindigo/fulcon)
[![MacOS Build](https://img.shields.io/travis/alexindigo/fulcon/master.svg?label=macos:6.x-10.x&style=flat)](https://travis-ci.org/alexindigo/fulcon)
[![Windows Build](https://img.shields.io/appveyor/ci/alexindigo/fulcon/master.svg?label=windows:6.x-10.x&style=flat)](https://ci.appveyor.com/project/alexindigo/fulcon)

[![Coverage Status](https://img.shields.io/coveralls/alexindigo/fulcon/master.svg?label=code+coverage&style=flat)](https://coveralls.io/github/alexindigo/fulcon?branch=master)
[![Dependency Status](https://img.shields.io/david/alexindigo/fulcon.svg?style=flat)](https://david-dm.org/alexindigo/fulcon)
[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](https://opensource.org/licenses/MIT)

| compression      |    size |
| :--------------- | ------: |
| fulcon.js        | 1.03 kB |
| fulcon.min.js    |   686 B |
| fulcon.min.js.gz |   386 B |


## Install

```sh
$ npm install --save fulcon
```

## Example

```javascript
var fulcon = require('fulcon');

function original(a, b, c)
{
  return 42 + a + b + c;
}

assert.strictEqual(original.length, 3, 'signature of the original function has 3 arguments');
assert.strictEqual(original(1, 2, 3), 48, 'original function returns 48');

var cloned = fulcon(original);

assert.notStrictEqual(original, cloned, 'original and cloned functions are not the same function');

assert.strictEqual(cloned.length, 3, 'signature of the cloned function has 3 arguments');
assert.strictEqual(cloned(1, 2, 3), 48, 'cloned function returns 48');
```

_Note: Beware of functions with side-effects! Cloned function calls original function under the hood, so it has same side-effects for better or for worst. Check [test.js](test.js) for details._

## Want to Know More?

More examples can be found in [test.js](test.js).

Or open an [issue](https://github.com/alexindigo/fulcon/issues) with questions and/or suggestions.

## License

Fulcon is released under the [MIT](LICENSE) license.
