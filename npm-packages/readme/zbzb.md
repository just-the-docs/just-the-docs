## zbzb

Module System for browser like Node

inspired by `browserify` & `browserbuild`

## Example


1. example
    **exapmple/package.json**

    ```js
    {
        "name": "sample",
        "version": "0.1.1",
        "main": "./sample.js"
    }
    ```
    
    **example/math.js**
    
    ```js
    var CONST = 100;
    exports.add = function(n){
      return 100 + n;
    };
    ```

    **example/sample.js**
    
    ```js
    var add = require('./math.js').add,
        map = module.exports = function () {
          return Array.prototype.slice.call(arguments).map(add);
        };
    console.log(map(1, 2, 3));
    require('example2/example3');
    var type = require('example2').type;
    console.log(type(console.log)); // Function
    ```

2. example2

    **example/example2/package.json**
    
    ```js
    {
        "name": "sample2",
        "version": "0.0.1"
    }
    ```

    **example/.global/core.js**
    
    ```js
    var core_toString = Object.prototype.toString;
    // this will be global var under sample2 package
    ```

    **example/example2/index.js**
    
    ```js
    var type = exports.type = function (obj) {
      return obj == null ?
             String(obj) :
             core_toString.call(obj).slice(8, -1);
    };
    console.log('this is package example2');
    ```

3. example3

    **example/example2/example3/package.json**
    
    ```js
    {
        "name": "sample3",
        "version": "0.0.1"
    }
    ```

    **example/example2/example3/index.js**
    
    ```js
    console.log('this is package example3');
    ```



4. go

    `node spec > bin.js` & `node bin`

    ```
    [ 101, 102, 103 ]
    this is package example3
    this is package example2
    Function
    ```
##Desc

regard a directory has 'package.json' as a package.

root package's main(default index.js) will be call first.

'.global' directory will be global variable (this is for library)

## License

The MIT License
