# nnmap
`nnmap` is a function that takes a function and a value, then call the function with the value only if the value is not nil (undefined or null).

Type signature:
```haskell
nnmap :: (a -> b) -> a? -> b?
```

### Usage
```
npm install --save nnmap
```

```js
var nnmap = require('nnmap');

nnmap(function(a) {
  return a + 2;
}, 3);
// > 5

nnmap(function(a) {
  return a + 2;
}, undefined);
// > undefined

nnmap(function(a) {
  return a + 2;
}, null);
// > null
```

It also supports currying

```js
var nnmap = require('nnmap');

[1,2,undefined, 4, 5].map(nnmap(function(a) {
  return a + 2;
}));
// > [3, 4, undefined, 6, 7]
```
