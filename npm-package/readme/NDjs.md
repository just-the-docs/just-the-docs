# NDjs

A JavaScript implementation of W3C DOM for Node.js. It supports
`DOMParser` and `XMLSerializer` interface such as in browser, it can also provide a window with a document for [jQuery](https://github.com/jquery/jquery) to work in Node.js.

## Installation

### Node.js

```
npm install ndjs
```

### AMD

Follow the instruction of the environments you are using.

## How to use

### Node.js

```JavaScript
var ndjs = require('ndjs');

var html = '<html><body>NDjs</body></html>';
var dom = new ndjs.DOMParser().parseFromString(html);
var window = ndjs.window(dom);
```

### AMD

```JavaScript
define(['ndjs'], function(ndjs){
    var html = '<html><body>NDjs</body></html>';
    var dom = new ndjs.DOMParser().parseFromString(html);
    var window = ndjs.window(dom);
});
```

## Authors and Contributors

+ Jianwei Liu

## License

NDjs is released under the [MIT license](http://www.opensource.org/licenses/MIT).