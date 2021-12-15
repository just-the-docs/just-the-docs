# vecn

> A module for creating n-dimensional vector types that support swizzling.

[![Build Status](https://travis-ci.org/Zunawe/vecn.svg?branch=master)](https://travis-ci.org/Zunawe/vecn) [![Coverage Status](https://coveralls.io/repos/github/Zunawe/vecn/badge.svg?branch=master)](https://coveralls.io/github/Zunawe/vecn?branch=master) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Allows for the creation of vectors of arbitrary dimension that are also JavaScript `Arrays`. There are a number of useful numeric methods that can be performed once you make a vector such as componentwise arithmetic, dot products, normalization, etc... Though the vectors are directly mutable via `Array` methods and direct setting of values, all methods behave in an immutable way (i.e. they create and return a new object). These arrays are fixed-length and accept only numbers as input, though they generally decay gracefully into regular `Arrays`. For example, you're allowed to use `map`, `reduce`, `concat`, and other `Array` methods, and if the result is a valid `vec`, a `vec` will be returned. Otherwise, you'll get back a standard `Array` with the new elements. These are specifically overloaded methods, so experimental, custom, and rebound methods aren't guaranteed to work.

## Install

```sh
$ npm install vecn
```

## Usage

Since they're the most common, `vec2`, `vec3`, and `vec4` are already included:
```js
const {vec3} = require('vecn')

let v = vec3(1, 2, 3)
console.log(v)
```

```js
[ 1, 2, 3 ]
```

If you need to create your own vector type:
```js
const vecn = require('vecn')

const vec5 = vecn.getVecType(5)
var v = vec5(1, 2, 3, 4, 5)
console.log(v)
```

```js
[ 1, 2, 3, 4, 5 ]
```

Once you have a vector, here are some things you can do:
```js
magnitude
approximatelyEquals()
argmax()
argmin()
choose()
copy()
div()
dot()
equals()
max()
min()
minus()
neg()
normalize()
plus()
pnorm()
pow()
reflect()
sum()
times()
```
And of course these methods can be chained
```js
v1.plus(v2).times(v3).normalize().neg()
```

For a more in-depth description of available vector methods and how to use them, see the [documentation](https://zunawe.github.io/vecn).

#### Swizzling

Swizzling is a technique used in GLSL that allows you to access a vector's components by name and build new vectors from them. It works the same here at arbitrary length. It's easiest to see in an example:

```js
var v = vec4(1, 2, 3, 4)

v.x                          // 1
v.y                          // 2
v.z                          // 3
v.w                          // 4

v.xx                         // vec2 [ 1, 1 ]
v.zy                         // vec2 [ 3, 2 ]
v.zywwxyyz                   // vec8 [ 3, 2, 4, 4, 1, 2, 2, 3 ]
```

We can also set values with swizzling.

```js
var v = vec3(1, 2, 3)

v.xz = [4, 5]
console.log(v)
```

```js
[ 4, 2, 5 ]
```

Swizzling only works for `vec2`, `vec3`, and `vec4` (with plans to extend it with custom accessors).

#### Important Nuance

When creating a new vecType, you _are_ generating a new class. However, this class is hidden behind a function that creates the object for you and returns a Proxy. Therefore, the function returned by `vecn.getVecType` is **not** a constructor. Since the `new` keyword implies a `return this` at the end of the function, but the function already returns, the existence of a `new` before the function call has no effect. The following code explains the importance:

```js
const vec2 = vecn.getVecType(2)

var v1 = vec2(1, 2)          // Valid construction
var v2 = new vec2(1, 2)      // Also valid, but misleading

v1.constructor === vec2      // false
```

Basically this allows for swizzling and lets me extend `Array` without letting the user mess with the length.
