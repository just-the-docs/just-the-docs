# amd-optimize

Find all the dependencies of one or more amd modules and sort them in the correct order, from leaf (module with no dependencies) to root (module which no other module depends on). This is an alternative to the official requireJS optimizer, but is designed as a library, not a stand alone application.

## Things it can and can't do

- [x] find dependencies of a module  
- [x] name anonymous modules  
- [x] sort modules from leaf to root  
- [x] produce source-maps  
- [x] use require config
  - [x] use paths
  - [x] use package
  - [ ] use map
- [ ] relative dependencies
- [x] exclude modules and paths  
- [x] umd/iife declarations
- [ ] commonJS style define
- [ ] plugins  


## UMD

This project tries to find top-level `define()` calls. If you call it with the option `umd: true` then it will try to find umd modules where the define call is not top-level. But to accept the define call it will need to be wrapped in an AMD test, like most of the examples on the [UMD](https://github.com/umdjs/umd) page. The define call in the following code will be found, and, if anonymous, will be named:

```js
if (typeof define === 'function' && define.amd) {
  define(['b'], factory);
}

if (typeof define === 'function' && define['amd']) {
  define(['b'], factory);
}

factory(typeof define === 'function' && define.amd ? define : function(){});
```