# Keccak.js

The only Keccak hash (aka SHA3 before standardisation) library you need in Javascript. Ever. Pinky promise!

It is a meta package and lets you to use `node-sha3` or `js-sha3` with the same interface on your choice of deployment. It uses `browserify-sha3` to do the mapping for you.

There's no speed loss, it is as thin as it can get (but there is some twiddling in `package.json` to select the right package for your environment):
```js
module.exports = require('sha3').SHA3Hash
```

Example usage:
```js
const keccak = require('keccakjs')

var hash = new keccak() // uses 512 bits by default
hash.update('hello')
hash.update(Buffer.from('42004200', 'hex'))
hash.digest() // binary output
hash.digest('hex') // hex output
```

**NOTE: This library supports the Keccak padding only - and not the final SHA3 padding.**
