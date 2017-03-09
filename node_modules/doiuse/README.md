[![Build Status](https://travis-ci.org/anandthakker/doiuse.svg?branch=master)](https://travis-ci.org/anandthakker/doiuse)

doiuse
======

Lint CSS for browser support against caniuse database.

# Install

```sh
npm install -g doiuse
```

# Developing
```sh
git clone git@github.com:anandthakker/doiuse.git
cd doiuse
npm install
npm run babel
```

That last step transpiles the ES6 from src/ to ES5 in lib/. Already happens as a `pretest` step for `npm test`.


# Usage Examples

## Command Line
```bash
doiuse --browsers "ie >= 9, > 1%, last 2 versions" main.css
# or
cat main.css | doiuse --browsers "ie >= 9, > 1%, last 2 versions"
```


**Sample output:**
```
/projects/website/main.css:5:3: CSS3 Box-sizing not supported by: IE (8,9,10,11), Chrome (36,37,38), Safari (8,7.1), Opera (24,25), iOS Safari (8,7.1,8.1), Android Browser (4.1,4.4,4.4.4), IE Mobile (10,11)
/projects/website/main.css:6:3: CSS3 Box-sizing not supported by: IE (8,9,10,11), Chrome (36,37,38), Safari (8,7.1), Opera (24,25), iOS Safari (8,7.1,8.1), Android Browser (4.1,4.4,4.4.4), IE Mobile (10,11)
/projects/website/main.css:8:3: CSS user-select: none not supported by: IE (8,9)
/projects/website/main.css:9:3: CSS user-select: none not supported by: IE (8,9)
/projects/website/main.css:10:3: CSS user-select: none not supported by: IE (8,9)
/projects/website/main.css:11:3: CSS user-select: none not supported by: IE (8,9)
/projects/website/main.css:12:3: CSS user-select: none not supported by: IE (8,9)
/projects/website/main.css:13:3: Pointer events not supported by: IE (8,9,10), Firefox (32,33), Chrome (36,37,38), Safari (8,7.1), Opera (24,25), iOS Safari (8,7.1,8.1), Android Browser (4.1,4.4,4.4.4), IE Mobile (10)
/projects/website/main.css:14:3: Pointer events not supported by: IE (8,9,10), Firefox (32,33), Chrome (36,37,38), Safari (8,7.1), Opera (24,25), iOS Safari (8,7.1,8.1), Android Browser (4.1,4.4,4.4.4), IE Mobile (10)
/projects/website/main.css:32:3: CSS3 Transforms not supported by: IE (8)
```

Use `--json` to get output as (newline-delimited) JSON objects.


## JS
```javascript
var postcss = require('postcss');
var doiuse = require('doiuse');

postcss(doiuse({
  browsers:['ie >= 6', '> 1%'],
  ignore: ['rem'], // an optional array of features to ignore
  ignoreFiles: ['**/normalize.css'], // an optional array of file globs to match against original source file path, to ignore
  onFeatureUsage: function(usageInfo) {
    console.log(usageInfo.message);
  }
})).process("a { background-size: cover; }")
```

## Gulp

```javascript
var gulp = require('gulp')
var postcss = require('postcss')
var doiuse = require('doiuse')

gulp.src(src, { cwd: process.cwd() })
.pipe(gulp.postcss([
  doiuse({
    browsers: [
      'ie >= 8',
      '> 1%'
    ],
    ignore: ['rem'], // an optional array of features to ignore
    ignoreFiles: ['**/normalize.css'], // an optional array of file globs to match against original source file path, to ignore
    onFeatureUsage: function (usageInfo) {
      console.log(usageInfo.message)
    }
  })
]))
```

# How it works
In particular, the approach to detecting features usage is currently quite naive.

<a name="features-list"></a>Refer to the data in [/data/features.js](data/features.js).

- If a feature in that dataset only specifies `properties`, we just use those
  properties for regex/substring matches against the properties used in the input CSS.
- If a feature also specifies `values`, then we also require that the associated
  value matches one of those values.

# API Details:

## As a transform stream
```javascript
var doiuse = require('doiuse/stream');

process.stdin
  .pipe(doiuse({ browsers: ['ie >= 8', '> 1%'], ignore: ['rem'] }))
  .on('data', function (usageInfo) {
    console.log(JSON.stringify(usageInfo))
  })
```

Yields `UsageInfo` objects as described below.


## As a postcss plugin
`postcss(doiuse(opts)).process(css)`, where `opts` is:
```javascript
{
  browsers: ['ie >= 8', '> 1%'], // an autoprefixer-like array of browsers.
  ignore: ['rem'], // an optional array of features to ignore
  ignoreFiles: ['**/normalize.css'], // an optional array of file globs to match against original source file path, to ignore
  onFeatureUsage: function(usageInfo) { } // a callback for usages of features not supported by the selected browsers
}
```

And `usageInfo` looks like this:

```javascript
{
  message: '<input source>: line <l>, col <c> - CSS3 Gradients not supported by: IE (8)'
  feature: 'css-gradients', //slug identifying a caniuse-db feature
  featureData:{
    title: 'CSS Gradients',
    missing: "IE (8)" // string of browsers missing support for this feature.
    missingData: {
      // map of browser -> version -> (lack of)support code
      ie: { '8': 'n' }
    },
    caniuseData: { // data from caniuse-db/features-json/[feature].json }
  },
  usage: {} //the postcss node where that feature is being used.
}
```
    Called once for each usage of each css feature not supported by the selected
    browsers.

## Ignoring file-specific rules: 
For disabling some checks you can use just-in-place comments
##### `/* doiuse-disable */`
Disables checks of _all [features](#features-list)_
##### `/* doiuse-disable feature */`
Disables checks of _specified [feature(s)](#features-list)_ (can be comma separated list)
##### `/* doiuse-enable */`
Re-enables checks of _all [features](#features-list)_
##### `/* doiuse-enable feature */`
Enables checks of _specified [feature(s)](#features-list)_  (can be comma separated list)
 - for following lines in file

# [Contributing](CONTRIBUTING.md)

doiuse is an [OPEN Open Source](http://openopensource.org/) Project. This means that:

Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

# License

MIT

**NOTE:** Many of the files in test/cases are from autoprefixer-core, Copyright 2013 Andrey Sitnik <andrey@sitnik.ru>.  Please see https://github.com/postcss/autoprefixer-core.
