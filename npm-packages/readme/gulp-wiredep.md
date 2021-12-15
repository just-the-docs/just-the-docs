# gulp-wiredep

[![travis](https://img.shields.io/travis/ivoputzer/gulp-wiredep.svg?style=flat-square)](https://travis-ci.org/ivoputzer/gulp-wiredep) [![npm-dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-blue.svg?style=flat-square&colorB=44CC11)](package.json) [![standard-js](https://img.shields.io/badge/coding%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/) [![npm-package-quality](http://npm.packagequality.com/shield/gulp-wiredep.svg?style=flat-square&colorB=44CC11)](http://packagequality.com/#?package=gulp-wiredep) [![npm-node-version](https://img.shields.io/badge/node-4%2B-blue.svg?style=flat-square)](https://nodejs.org/docs/v4.0.0/api) [![npm-version](https://img.shields.io/npm/v/gulp-wiredep.svg?style=flat-square&colorB=007EC6)](https://www.npmjs.com/package/gulp-wiredep) [![npm-license](https://img.shields.io/npm/l/gulp-wiredep.svg?style=flat-square&colorB=007EC6)](https://spdx.org/licenses/MIT)

## standard usage

```javascript
const gulp = require('gulp')
const wiredep = require('gulp-wiredep')

gulp.task('bower', function () {
  gulp.src('./src/footer.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('./dest'))
})
```

## usage with plugin loader

```javascript
const gulp = require('gulp')
const plug = require('gulp-plugin-loader')

gulp.task('bower', function () {
  gulp.src('./src/footer.html')
    .pipe(plug.wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('./dest'))
})
```
