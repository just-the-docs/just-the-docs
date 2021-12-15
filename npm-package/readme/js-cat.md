# js-cat, cat CLI powered by nodejs.

js-cat is easily customizable cat.

## Install

install with [npm](http://npmjs.org/)

```
npm install -g jscat
```

## Usage

jscat works like unix cat.

```
jscat *.js
```

following two commands concatenate javascripts of current directory to `all.js`

```
jscat *.js > all.js
```

or

```
jscat *.js --out all.js
```

### Execute with Namespace

assuming you have already installed `uglifyjs` globally, the next command will yield compressed javascripts.

```
jscat -n compress *.js
```

if you don't installed uglify-js

```
npm install -g uglify-js
```

### What's happening with namespace?

Jscat has three process, `read`, `each`, `join`.
Each event has extension and namespace scope.
The following code is the default Event hook implementation.

```
var exec = require('child_process').exec;

exports['read.js:compress'] = function (srcPath, next) {
  // balk if srcPath is like *min.js
  if (/min\.js$/.test(srcPath)) return next();
  exec('uglifyjs ' + srcPath, next);
};
```

For more details, see next section.

## Events

All event call is done asynchronously. You have to call callback rather than return value.

### "read" (filePath, callback)

read event is basically called once. But when callback is called with no arguments,
next matched event will be called.

Arguments

* filePath {String}
* callback {Function} (err, fileContent)

### "each" (data, callback)

each event is called recursively unless you set truthy value in third argument `stop`
Arguments

* data {Object}
* callback {Function} (err, fileContent, stop)

```
data = {
  path: {String}
  content: {Buffer}
};
```

### "join" (dataArray, callback)

Arguments

* files {Array}
* callback {Function} (err, fileContent)

```
dataArray = [
  {
    path: {String},
    content: {Buffer}
  },
  {
    path: {String},
    content: {Buffer}
  }
  ...
];
```
### Events Extension

Simply, file extension is applied. 

* `read.js` will listen javascript's read event.
* `each.css` will listen css's each event.
* `join.html` will listen html's join event.

unlike `read` and `each`, `join`'s extension is only available when you set `--out, -o`.
See Note section for details.

### Events Namespace 

You can define your own event namespace. Make sure namespace should be followed by extension.

* `read.js:production` : this is legal. 
* `read:production.js` : this is illegal.

### Order of priority

1. [key][.ext][:namespace]
2. [key][.ext][:namespace]
3. [key][:namespace]
4. [key]


## Example

The following events hook is do nothing especially.

```
exports['read'] = function (srcPath, next) {
  // Balk hook event with no argument.
  next();
};

// make sure you return `data.content`, not `data`
exports['each'] = function (data, callback, stop) {
  callback(null, data.content);
};

// You cannot balk join event
exports['join'] = function (dataArray, next) {
  var files = dataArray.map(function (data) {
    return data.content;
  });
  next(null, files.join('\n'));
};
```

You may want to implement your own event hook. 

```

exports['each.js:compress'] = function (data, callback) {
  var jsp = require("uglify-js").parser;
  var pro = require("uglify-js").uglify;
  // your own uglify implementation
  callback(null, content);
};

```

## Command-line API

`jscat --help` to see help

```

Usage: jscat [options] [dir|file|namespace ...]

Options:

  -h, --help                   output usage information
  -V, --version                output the version number
  -h, --hook <path>            specify event hook source path
  -o, --out <path>             excute writeFile to path
  -n, --namespace <namespace>  add namespace
  -N, --no-src                 excute with no hook including default hook
  -v, --verbose                verbose logging


```

## Notes

### Difference between shell redirection and `-o, --out`

You cannot listen join's extension event when you use redirection.
Let's say you define join event hooks like following.

```javascript

exports['join.js'] = function (dataArray, next) {
  var files = dataArray.map(function (data) {
    return data.content;
  });
  next(null, 'This is custom join \n' + files.join(';\n\n\n'));
};

exports['join'] = function (dataArray, next) {
  var files = dataArray.map(function (data) {
    return data.content;
  });
  next(null, 'yet another custom join' + files.join('\n\n\n\n=============\n\n\n\n'));
};

```

The first hook won't be called. Instead, the second hook will be called.

```
jscat foo.js bar.js
jscat foo.js bar.js > all.js
```

The first hook will be called when you specify `--out` or `-o`.

```
jscat foo.js bar.js --out all.js
```


### Avoid `console.log`

use `console.error` when you log your config. Otherwise you'll end up with a hilarious situation.

```javascript
exports['each.js'] = function (data, next) {
  console.log('I am debbuging!!');
  // do some work
  var content = ...;
  next(null, content);
};
```

```
jscat ./src/*.js > ./my-lib-built.js

cat my-lib-built.js
~
I an debugging!!
~
```


## Contribute

Implementation is quite simple with [async](https://github.com/caolan/async) and [commander](https://github.com/visionmedia/commander.js). Feel free to do pull request or suggestion.


### syntax

To test code syntax, make sure you install [jshint](https://github.com/jshint/node-jshint) globally.
```
npm install -g jshint
```

```
make jshint
```

### test

TODO

## TODO

* example
* middleware
* test script
* multi namespace: how to do syntax??

## License

(The MIT License)

Copyright (C) 2012 Shimaguchi Tomoya

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
