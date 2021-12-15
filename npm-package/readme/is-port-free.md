# is-port-free

[![Shippable branch](https://img.shields.io/shippable/5818b23b8ec3a610001a7293/master.svg)](https://app.shippable.com/projects/5818b23b8ec3a610001a7293) [![npm](https://img.shields.io/npm/dt/is-port-free.svg)](https://www.npmjs.com/package/is-port-free) [![Linked In](https://img.shields.io/badge/Linked-In-blue.svg)](https://www.linkedin.com/in/john-i-doherty) [![Twitter Follow](https://img.shields.io/twitter/follow/mrJohnDoherty.svg?style=social&label=Twitter&style=plastic)](https://twitter.com/mrJohnDoherty)

A simple node module to check if a TCP port is free on the local machine. See also [is-port-busy](https://www.npmjs.com/package/is-port-busy)

## Installation

```bash
$ npm install --save is-port-free
```

## Example

```js
var isPortFree = require('is-port-free');

isPortFree(8080).then(function(){
    console.log('yes');
})
.catch(function(){
    console.log('no');
});
```

## Running tests

Install dev dependencies and run tests:

```
$ npm install -d && npm test
```

## License

Licensed under [ISC License](LICENSE) &copy; [John Doherty](http://www.johndoherty.info)