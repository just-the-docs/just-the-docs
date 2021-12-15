# `decache`

Delete a module from node.js' `require.cache` so you can freshly `require` it again.

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/dwyl/decache/Node.js%20CI?style=flat-square)](https://github.com/dwyl/decache/actions)
[![codecov.io](https://img.shields.io/codecov/c/github/dwyl/decache/main.svg?style=flat-square)](http://codecov.io/github/dwyl/decache?branch=main)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/dwyl/decache.svg?style=flat-square)](https://github.com/dwyl/decache)
[![dependency status](https://img.shields.io/librariesio/release/npm/decache?style=flat-square)](https://github.com/dwyl/decache/blob/main/package.json#L43)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/dwyl/decache/issues)
[![HitCount](http://hits.dwyl.com/dwyl/decache.svg)](http://hits.dwyl.com/dwyl/decache)

In node.js when you `require()` a module, node stores a cached version of the
module, so that all subsequent calls to `require()` do not have to reload
the module from the filesystem.

`decache` ( _**De**lete **Cache**_ ) lets you delete modules from node.js `require()` cache
this is useful when _**testing**_ your modules/projects.

## Why?

When testing our modules we often need to re-require the module being tested.
This makes it easy.

## What?

An easy way to delete a cached module.

## How? (_usage_)

### install

Install the module from npm:

```sh
npm install decache --save-dev
```

### Use it in your code:

```js
// require the decache module:
const decache = require('decache');

// require a module that you wrote"
let mymod = require('./mymodule.js');

// use your module the way you need to:
console.log(mymod.count()); // 0   (the initial state for our counter is zero)
console.log(mymod.incrementRunCount()); // 1

// delete the cached module:
decache('./mymodule.js');

//
mymod = require('./mymodule.js'); // fresh start
console.log(mymod.count()); // 0   (back to initial state ... zero)
```

Modules other than `.js`, like for example, `.jsx`, are supported as well.

Note that native modules with the `.node` extension are ignored from decaching because
they behave unexpectedly when decached.

If you have any questions or need more examples, please create a GitHub issue:
https://github.com/dwyl/decache/issues

***Thanks***!
