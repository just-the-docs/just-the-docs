# FClone

Clone objects by dropping circular references

[![Build Status](https://travis-ci.org/soyuka/fclone.svg?branch=master)](https://travis-ci.org/soyuka/fclone)

This module clones a Javascript object in safe mode (eg: drops circular values) recursively. Circular values are replaced with a string: `'[Circular]'`.

Ideas from [tracker1/safe-clone-deep](https://github.com/tracker1/safe-clone-deep). I improved the workflow a bit by:
- refactoring the code (complete rewrite)
- fixing node 6+
- micro optimizations
- use of `Array.isArray` and `Buffer.isBuffer`

Node 0.10 compatible, distributed files are translated to es2015.

## Installation

```bash
npm install fclone
# or
bower install fclone
```

## Usage

```javascript
const fclone = require('fclone');

let a = {c: 'hello'};
a.b = a;

let o = fclone(a);

console.log(o);
// outputs: { c: 'hello', b: '[Circular]' }

//JSON.stringify is now safe
console.log(JSON.stringify(o));
```

## Benchmarks

Some benchs:

```
# Clone
fclone (not a string) x 14,121 ops/sec ±0.75% (89 runs sampled)
clone (not a string) x 9,293 ops/sec ±0.93% (90 runs sampled)
deepcopy (not a string) x 5,375 ops/sec ±0.73% (92 runs sampled)
rfdc x 12,786 ops/sec ±1.31% (91 runs sampled)

# Stringify
fclone + json.stringify x 8,289 ops/sec ±0.74% (90 runs sampled)
fast-safe-stringify x 8,241 ops/sec ±0.48% (92 runs sampled)
util.inspect (outputs a string) x 2,115 ops/sec ±0.84% (89 runs sampled)
jsan x 5,090 ops/sec ±0.65% (92 runs sampled)
circularjson x 4,471 ops/sec ±0.67% (92 runs sampled)
json-stringify-safe x 7,150 ops/sec ±0.97% (91 runs sampled)
Fastest is fclone (not a string)
```
