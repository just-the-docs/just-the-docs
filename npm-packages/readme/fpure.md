# fpure
Pure functional programming library (Work in progress -- use Ramda or Sanctuary while I build this out)


[![Build Status](https://travis-ci.org/SeanCannon/fpure.svg?branch=master)](https://travis-ci.org/SeanCannon/fpure) [![Coverage Status](https://coveralls.io/repos/SeanCannon/fpure/badge.svg?branch=master&service=github)](https://coveralls.io/github/SeanCannon/fpure?branch=master) [![npm version](http://img.shields.io/npm/v/fpure.svg)](https://npmjs.org/package/fpure) [![Dependency Status](https://david-dm.org/SeanCannon/fpure.svg)](https://david-dm.org/SeanCannon/fpure)

## Install

```
$ npm install fpure --save
```

Run the specs

```
$ npm test
```

## Usage

```js

const fp = require('fpure');

fp.compose(fp.multiply(4), fp.add(3))(5); // 32
fp.compose(fp.add(3), fp.multiply(4))(5); // 23
```

## Math

### add
Number → Number
```
expect(add(4)(5)).toBe(9);
expect(add('4')('5')).toBe('45');
expect(add(4)('5')).toBe('45');
expect(add('4')(5)).toBe('45');
```

### subtract
Number → Number
```
expect(subtract(8)(5)).toBe(3);
expect(subtract(5)(8)).toBe(-3);
```

### multiply
Number → Number
```
expect(multiply(4)(5)).toBe(20);
```
