# [gulp](https://github.com/wearefractal/gulp)-concat-css
[![Build Status](https://secure.travis-ci.org/mariocasciaro/gulp-concat-css.png?branch=master)](https://travis-ci.org/mariocasciaro/gulp-concat-css)
[![NPM version](http://img.shields.io/npm/v/gulp-concat-css.svg)](https://www.npmjs.org/package/gulp-concat-css)
[![Dependency Status](https://david-dm.org/mariocasciaro/gulp-concat-css.svg)](https://david-dm.org/mariocasciaro/gulp-concat-css)
[![Downloads](http://img.shields.io/npm/dm/gulp-concat-css.svg)](https://www.npmjs.org/package/gulp-concat-css)

> Concatenates css files, bubbling up @import statements (as per the [standard](https://developer.mozilla.org/en-US/docs/Web/CSS/@import)), and optionally rebasing urls and inlining local @import statements.

## Install

Install with [npm](https://npmjs.org/package/gulp-concat-css).

```
npm install --save-dev gulp-concat-css
```

## Examples

```js
var gulp = require('gulp');
var concatCss = require('gulp-concat-css');

gulp.task('default', function () {
  return gulp.src('assets/**/*.css')
    .pipe(concatCss("styles/bundle.css"))
    .pipe(gulp.dest('out/'));
});
```

**TIP: for a proper import inlining and url rebase, make sure you set the proper `base` for the input files.**

## API

`concatCss(targetFile, options)`
* `targetFile`: The relative path of the generated file containing the concatenated css
* `options`: (since 2.1.0)
    * `inlineImports`: (default `true`) Inline any local import statement found
    * `rebaseUrls`: (default `true`) Adjust any relative URL to the location of the target file.
    * `includePaths`: (default `[]`) Include additional paths when inlining imports
    * `commonBase`: (default to the `base` property of the first file) Common base path from which files and urls resolve

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ Mario Casciaro
