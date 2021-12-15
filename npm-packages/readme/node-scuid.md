# scuid
[![npm](https://img.shields.io/npm/v/scuid.svg?style=flat-square)](https://npmjs.com/package/scuid)
[![npm license](https://img.shields.io/npm/l/scuid.svg?style=flat-square)](https://npmjs.com/package/scuid)
[![npm downloads](https://img.shields.io/npm/dm/scuid.svg?style=flat-square)](https://npmjs.com/package/scuid)
[![build status](https://img.shields.io/travis/jhermsmeier/node-scuid.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-scuid)

Collision-resistant IDs optimized for horizontal scaling and performance.

A slim, alternative, and compatible implementation of [cuid] for node,
also featuring a wide range of options, as well as custom random number generator support.
It can serve as a drop-in replacement, and is also faster than [cuid].

[cuid]: https://github.com/ericelliott/cuid

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save scuid
```

## Usage

```js
var scuid = require( 'scuid' )
```

**Generate an ID**

```js
var id = scuid()
> 'ciux3hs0x0000io10cusdm8r2'
```

**Generate a slug**

```js
var slug = scuid.slug()
> '6x1i0r0'
```

**Get the process' fingerprint**

```js
var fingerprint = scuid.fingerprint()
> 'io10'
```

**Use a custom (P)RNG**

```js
// Create a random number generator;
// It has to have a method called `random`
var generator = {
  random: function() {
    return 5 // chosen by fair dice roll
  }
}

// Create a custom scuid instance
var scuid = require( 'scuid' ).create({
  rng: generator
})
```

**Use other custom options**

Note that fiddeling with these might make your IDs incompatible with [cuid]'s guarantees.

```js
var scuid = require( 'scuid' ).create({
  prefix: 'c', // the ID's prefix
  base: 36, // radix used in .toString() calls (2-36)
  blockSize: 4, // block size to pad and trim to
  fill: '0', // block padding character
  pid: process.pid, // process ID
  fingerprint: scuid.createFingerprint( [pid], [hostname] ), // Machine fingerprint
  rng: Math, // Random number generator
})
```

## Tests

Just like `cuid`, collision resistance for both – slugs and IDs – is tested
over 1 million and 2 million iterations respectively.
To run the tests, run:

```
$ npm test
```

## Benchmarks

```
$ npm run compare
```

```js
NANOBENCH version 2               |    NANOBENCH version 2
> nanobench benchmark/index.js    |    > nanobench benchmark/cuid.js
                                  |
# id ⨉ 1000000                   <<<   # id ⨉ 1000000
ok ~1 s (1 s + 439835 ns)        <<<   ok ~4.74 s (4 s + 737960551 ns)
                                  |
# slug ⨉ 1000000                 <<<   # slug ⨉ 1000000
ok ~859 ms (0 s + 858990359 ns)  <<<   ok ~2.67 s (2 s + 665230762 ns)
                                  |
# fingerprint ⨉ 1000000          >>>   # fingerprint ⨉ 1000000
ok ~1.87 ms (0 s + 1870116 ns)   >>>   ok ~1.57 ms (0 s + 1571116 ns)
                                  |
all benchmarks completed         <<<   all benchmarks completed
ok ~1.86 s (1 s + 861300310 ns)  <<<   ok ~7.4 s (7 s + 404762429 ns)
```
