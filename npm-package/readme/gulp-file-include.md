[![NPM version][npm-img]][npm-url]
[![Build status][travis-img]][travis-url]
[![Test coverage][coveralls-img]][coveralls-url]
[![License][license-img]][license-url]
[![Dependency status][david-img]][david-url]
[![Gitter][gitter-img]][gitter-url]

# gulp-file-include
a [gulp](https://github.com/gulpjs/gulp) plugin for file includes

## Installation

```bash
npm install --save-dev gulp-file-include
```

## API

```js
const fileinclude = require('gulp-file-include');
```

### fileinclude([prefix])

#### prefix

Type: `string`<br>
Default: `'@@'`

### fileinclude([options])

#### options

Type: `object`

##### options.prefix

Type: `string`<br>
Default: `'@@'`

##### options.suffix

Type: `string`<br>
Default: `''`

##### options.basepath

Type: `string`<br>
Default: `'@file'`

Possible values:
  - `'@file'`:  include file relative to the dir in which `file` resides ([example](#include-options---type-json))
  - `'@root'`: include file relative to the dir in which `gulp` is running
  - `path/to/dir`: include file relative to the basepath you provide

##### options.filters

Type: `object`<br>
Default: `false`

Filters of include content.

##### options.context

Type: `object`
Default: `{}`

Context of `if` statement.

##### options.indent

Type: `boolean`
Default: `false`

## Examples

### @@include options - type: `JSON`

index.html
```html
<!DOCTYPE html>
<html>
  <body>
  @@include('./view.html')
  @@include('./var.html', {
    "name": "haoxin",
    "age": 12345,
    "socials": {
      "fb": "facebook.com/include",
      "tw": "twitter.com/include"
    }
  })
  </body>
</html>
```

view.html
```html
<h1>view</h1>
```

var.html
```html
<label>@@name</label>
<label>@@age</label>
<strong>@@socials.fb</strong>
<strong>@@socials.tw</strong>
```

gulpfile.js
```js
const fileinclude = require('gulp-file-include');
const gulp = require('gulp');

gulp.task('fileinclude', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});
```

result:
```html
<!DOCTYPE html>
<html>
  <body>
  <h1>view</h1>
  <label>haoxin</label>
<label>12345</label>
<strong>facebook.com/include</strong>
<strong>twitter.com/include</strong>
  </body>
</html>
```

### @@include_once options - type: `JSON`

index.html
```html
<!DOCTYPE html>
<html>
  <body>
  @@include_once('./view.html')
  @@include_once('./var.html', {
    "name": "haoxin",
    "age": 12345,
    "socials": {
      "fb": "facebook.com/include",
      "tw": "twitter.com/include"
    }
  })
  @@include_once('./var.html', {
    "name": "haoxin",
    "age": 12345,
    "socials": {
      "fb": "facebook.com/include",
      "tw": "twitter.com/include"
    }
  })
  </body>
</html>
```

view.html
```html
<h1>view</h1>
```

var.html
```html
<label>@@name</label>
<label>@@age</label>
<strong>@@socials.fb</strong>
<strong>@@socials.tw</strong>
```

gulpfile.js
```js
const fileinclude = require('gulp-file-include');
const gulp = require('gulp');

gulp.task('fileinclude', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});
```

result:
```html
<!DOCTYPE html>
<html>
  <body>
  <h1>view</h1>
  <label>haoxin</label>
<label>12345</label>
<strong>facebook.com/include</strong>
<strong>twitter.com/include</strong>

  </body>
</html>
```


### filters

index.html
```html
<!DOCTYPE html>
<html>
  <body>
  @@include(markdown('view.md'))
  @@include('./var.html', {
    "name": "haoxin",
    "age": 12345
  })
  </body>
</html>
```

view.md
```html
view
====
```

gulpfile.js
```js
const fileinclude = require('gulp-file-include');
const markdown = require('markdown');
const gulp = require('gulp');

gulp.task('fileinclude', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      filters: {
        markdown: markdown.parse
      }
    }))
    .pipe(gulp.dest('./'));
});
```

### `if` statement

index.html
```
@@include('some.html', { "nav": true })

@@if (name === 'test' && nav === true) {
  @@include('test.html')
}
```

gulpfile.js
```js
fileinclude({
  context: {
    name: 'test'
  }
});
```

### `for` statement

index.html
```html
<ul>
@@for (var i = 0; i < arr.length; i++) {
  <li>`+arr[i]+`</li>
}
</ul>
```

gulpfile.js
```js
fileinclude({
  context: {
    arr: ['test1', 'test2']
  }
});
```

### `loop` statement

index.html
```html
<body>
  @@loop('loop-article.html', [
    { "title": "My post title", "text": "<p>lorem ipsum...</p>" },
    { "title": "Another post", "text": "<p>lorem ipsum...</p>" },
    { "title": "One more post", "text": "<p>lorem ipsum...</p>" }
  ])
</body>
```

loop-article.html
```html
<article>
  <h1>@@title</h1>
  @@text
</article>
```

### `loop` statement + `data.json`

data.json
```js
[
  { "title": "My post title", "text": "<p>lorem ipsum...</p>" },
  { "title": "Another post", "text": "<p>lorem ipsum...</p>" },
  { "title": "One more post", "text": "<p>lorem ipsum...</p>" }
]
```

loop-article.html
```html
<body>
  @@loop("loop-article.html", "data.json")
</body>
```

### `webRoot` built-in context variable

The `webRoot` field of the context contains the relative path from the source document to
the source root (unless the value is already set in the context options).

support/contact/index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <link type=stylesheet src=@@webRoot/css/style.css>
  </head>
  <body>
    <h1>Support Contact Info</h1>
    <footer><a href=@@webRoot>Home</a></footer>
  </body>
  </body>
</html>
```

result:
```html
<!DOCTYPE html>
<html>
  <head>
    <link type=stylesheet src=../../css/style.css>
  </head>
  <body>
    <h1>Support Contact Info</h1>
    <footer><a href=../..>Home</a></footer>
  </body>
  </body>
</html>
```

### License
MIT

[npm-img]: https://img.shields.io/npm/v/gulp-file-include.svg?style=flat-square
[npm-url]: https://npmjs.org/package/gulp-file-include
[travis-img]: https://img.shields.io/travis/haoxins/gulp-file-include.svg?style=flat-square
[travis-url]: https://travis-ci.org/haoxins/gulp-file-include
[coveralls-img]: https://img.shields.io/coveralls/coderhaoxin/gulp-file-include.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/coderhaoxin/gulp-file-include?branch=master
[license-img]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[david-img]: https://img.shields.io/david/coderhaoxin/gulp-file-include.svg?style=flat-square
[david-url]: https://david-dm.org/coderhaoxin/gulp-file-include
[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/coderhaoxin/gulp-file-include?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge
