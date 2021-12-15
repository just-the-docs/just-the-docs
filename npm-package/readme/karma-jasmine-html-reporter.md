# karma-jasmine-html-reporter

[![npm version](https://img.shields.io/npm/v/karma-jasmine-html-reporter.svg)](https://www.npmjs.com/package/karma-jasmine-html-reporter) [![npm downloads](https://img.shields.io/npm/dm/karma-jasmine-html-reporter.svg)](https://www.npmjs.com/package/karma-jasmine-html-reporter)

Reporter that dynamically shows tests results at debug.html page.

Jasmine 1.3 is not supported. For Jasmine < 3.0.0, use version 0.2.2

![alt tag](/screenshots/reporter_1.png)

You can also run a describe block, or a single test.

![alt tag](/screenshots/reporter_2.png)

## Installation

You can simply install `karma-jasmine-html-reporter` as a devDependency by:
```bash
npm install karma-jasmine-html-reporter --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    reporters: ['kjhtml']
  });
};
```
#### With options
In combination with multiple reporters you may want to disable terminal messages because it's already handled by another reporter.

*Example using the 'karma-mocha-reporter' plugin*:
```js
// karma.conf.js
module.exports = function(config) {
  config.set({

    // Combine multiple reporters
    reporters: ['kjhtml', 'mocha'],

    jasmineHtmlReporter: {
      suppressAll: true, // Suppress all messages (overrides other suppress settings)
      suppressFailed: true // Suppress failed messages
    }

  });
};
```

You can pass a list of reporters as a CLI argument too:
```bash
karma start --reporters kjhtml
```

## Develop

There's not much to this package.

[`adapter.js`](src/lib/adapter.js), [`html.jasmine.reporter.js`](src/lib/html.jasmine.reporter.js), and [`jasmine.css`](src/css/jasmine.css) are copied with small adjustments from [`jasmine/lib/jasmine-core/boot.js`](https://github.com/jasmine/jasmine/blob/main/lib/jasmine-core/boot.js) and [`jasmine/lib/jasmine-core/jasmine-html.js`](https://github.com/jasmine/jasmine/blob/main/lib/jasmine-core/jasmine-html.js), and [`jasmine/lib/jasmine-core/jasmine.css`](https://github.com/jasmine/jasmine/blob/main/lib/jasmine-core/jasmine.css) respectively.

Just pull over changes from Jasmine as needed. There is a script to help with that; just run `npm run build` and review the changes. Specifically, [`adapter.js`](src/lib/adapter.js) needs a lot of manual removals.
