## detectIe

[![npm version](https://badge.fury.io/js/detectie.svg)](https://badge.fury.io/js/detectie)

A node module to detect the IE browser version, returns false for non IE browsers

Thanks to [mario z](https://github.com/marzepani) for the code

``` js
var detectIe = require('detectIe');
console.log(detectIe());

```
## Running Tests server side

**modify test.js for any tests**

    npm install
    npm test

## Running Tests client side

**modify test.js for any tests**

    npm install

make sure you have webpack installed globally

`npm install webpack -g`

compile test.js to a bundle with webpack

	webpack ./test/test.js ./test/test-bundle.js

open test.html to view the tests in the browser

## License

[MIT](http://isekivacenz.mit-license.org/)