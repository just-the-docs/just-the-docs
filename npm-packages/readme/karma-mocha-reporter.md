# karma-mocha-reporter

> Karma reporter plugin with mocha style logging.

> [![NPM version](https://badge.fury.io/js/karma-mocha-reporter.svg)](http://badge.fury.io/js/karma-mocha-reporter)
[![Build Status](https://secure.travis-ci.org/litixsoft/karma-mocha-reporter.svg?branch=master)](https://travis-ci.org/litixsoft/karma-mocha-reporter)
[![david-dm](https://david-dm.org/litixsoft/karma-mocha-reporter.svg?theme=shields.io)](https://david-dm.org/litixsoft/karma-mocha-reporter/)
[![david-dm](https://david-dm.org/litixsoft/karma-mocha-reporter/dev-status.svg?theme=shields.io)](https://david-dm.org/litixsoft/karma-mocha-reporter#info=devDependencies&view=table)

## How does it look like
![screenshot](demo/screen.png)

## Installation
The easiest way is to keep `karma-mocha-reporter` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "^1.0.0",
    "karma-mocha-reporter": "^2.0.0"
  }
}
```

You can simply do it by:

    $ npm install karma-mocha-reporter --save-dev

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    // reporters configuration
    reporters: ['mocha']
  });
};
```

## Options
### colors
**Type:** Object | Boolean

Lets you overwrite the default colors. Possible values are all colors and background colors from [chalk](https://github.com/chalk/chalk#colors).

**Possible Values:**

Value | Description | Default
------ | ----------- | -------
`success` | success messages | green
`info` | info messages | grey
`warning` | warn messages | yellow
`error` | error messages | red

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    // reporters configuration
    reporters: ['mocha'],

    // reporter options
    mochaReporter: {
      colors: {
        success: 'blue',
        info: 'bgGreen',
        warning: 'cyan',
        error: 'bgRed'
      },
      symbols: {
        success: '+',
        info: '#',
        warning: '!',
        error: 'x'
      }
    }
  });
};
```

To disable the colors please use the `colors` option in the karma config.

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    // reporters configuration
    reporters: ['mocha'],

    // disable colors
    colors: false
  });
};
```

### symbols
**Type:** Object

Lets you overwrite the default symbols.

**Possible Values:**

Value | Description | Default
------ | ----------- | -------
`success` | success messages | ✔
`info` | info messages | ℹ
`warning` | warn messages | ⚠
`error` | error messages | ✖

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    // reporters configuration
    reporters: ['mocha'],

    // reporter options
    mochaReporter: {
      symbols: {
        success: '+',
        info: '#',
        warning: '!',
        error: 'x'
      }
    }
  });
};
```

### output
**Type:** String

**Possible Values:**

Value | Description
------ | -----------
`full` (default) | all output is printed to the console
`autowatch` | first run will have the full output and the next runs just output the summary and errors in mocha style
`minimal` | only the summary and errors are printed to the console in mocha style
`noFailures` | the failure details are not logged

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    // reporters configuration
    reporters: ['mocha'],

    // reporter options
    mochaReporter: {
      output: 'autowatch'
    }
  });
};
```

### showDiff
**Type:** String | Boolean

Shows a diff output. Is disabled by default. All credits to the contributors of [mocha](https://github.com/mochajs/mocha), since the diff logic is used from there and customized for this module.

![screenshot](demo/diff.png)

Currently only works with karma-mocha >= v0.2.2 Not supported for karma-jasmine since the additional properties needed to render the diff are not supported in jasmine yet.

**Possible Values:**

Value | Description
------ | -----------
`true` | prints each diff in its own line, same as `'unified'`
`'unified'` | prints each diff in its own line
`'inline'` | prints diffs inline

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],

    // reporters configuration
    reporters: ['mocha'],

    // reporter options
    mochaReporter: {
      showDiff: true
    }
  });
};
```

### divider
**Type:** String

**Default:** 80 equals signs ('=')

The string to output between multiple test runs. Set to `false` or empty string to disable

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    // reporters configuration
    reporters: ['mocha'],

    // reporter options
    mochaReporter: {
      divider: ''
    }
  });
};
```

### ignoreSkipped
**Type:** Boolean

**Possible Values:**
  * `false` (default)
  * `true`

When setting the ignoreSkipped flag to true, the reporter will ignore the skipped tests in the output and you will see
only the tests that where really executed. The summary will still contain the number of skipped tests.

### maxLogLines
**Type:** Number

Lets you set the maximum number of lines which are printed for a failure. The default value is 999. Helps to cut long stack traces.
Set the value to `-1` to disable stack traces.

### printFirstSuccess
**Type:** Boolean

**Possible Values:**
  * `false` (default)
  * `true`

Prints the result of an it block after it is run in one browser. This options is useful when you have tests which are conditionally run in one browser only.
Otherwise the result of the it block would not be printed because it was not run in all browsers.

```js
// testfile.spec.js
if (navigator.userAgent.match(/firefox/i)) {
  describe('Firefox tests', function() {
    it('this would only be reported when printFirstSuccess is true', function() {
      console.log('firefox test');
    });
  });
}

describe('Other tests', function() {
  it('this should be always reported', function() {
    console.log('hello world');
  });
});
```


## Contributing
In lieu of a formal styleguide take care to maintain the existing coding style. Lint and test your code using [grunt](http://gruntjs.com/).

You can preview your changes by running:

    $ npm run demo

## Author
[Litixsoft GmbH](http://www.litixsoft.de)

## License
Copyright (C) 2013-2017 Litixsoft GmbH <info@litixsoft.de>
Licensed under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included i
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
