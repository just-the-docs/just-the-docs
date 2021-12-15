# [![CSJS logo](https://cdn.rawgit.com/rtsao/csjs/logo/logo.svg "CSJS (Cascading Style JavaScripts)")](https://github.com/rtsao/csjs)

[![build status][build-badge]][build-href]
[![coverage status][coverage-badge]][coverage-href]
[![dependencies status][deps-badge]][deps-href]
[![npm version][npm-badge]][npm-href]

> CSJS allows you to write modular, scoped CSS with valid JavaScript.

## Features
* Extremely simple and lightweight
  * Zero dependencies, [~2KB minified and gzipped][csjs-bundle]
* Leverages native ES6 and CSS features <sup>[(1)]</sup> rather than reinventing the wheel
  * Seamless modular, scoped styles with explicit dependencies powered by CommonJS/ES6 modules
  * Dead-simple variables/mixins using tagged ES6 template strings
  * Style composition with optimal reuse via natural class composition mechanics already in CSS/HTML<sup>[(2)]</sup>
* Works tooling-free; no required transpilation/compilation/build steps <sup>[(3)]</sup>
* Framework-agnostic (No React dependency; works with Web Components, etc.)
* Fully supported native CSS media queries, pseudo-classes, keyframe animations, etc.
* Server-rendered/universal JavaScript support

## Quick Example
([Live editable codepen.io demo](http://codepen.io/rtsao/pen/jWRJZj?editors=0010))
```javascript
const csjs = require('csjs');
const {div, h1} = require('react').DOM;

const green = '#33aa22';

const styles = csjs`

  .panel {
    border: 1px solid black;
    background-color: ${green};
  }

  .title {
    padding: 4px;
    font-size: 15px;
  }

`;

const html = require('react-dom/server').renderToStaticMarkup(
  div({className: styles.panel}, [ 
    h1({className: styles.title}, 'Hello World!')
  ])
);
/*
<div class="panel_4Eda43">
  <h1 class="title_4Eda43">Hello World!</h1>
</div>
*/

const css = csjs.getCss(styles);
/*
.panel_4Eda43 {
  border: 1px solid black;
  background-color: #33aa22;
}

.title_4Eda43 {
  padding: 4px;
  font-size: 15px;
}
*/
```

### Simple, tooling-free

CSJS runs in ES6 environments without transpilation, compilation, or build steps (including Node 4+ and latest stable Chrome/Firefox/Safari/Edge).

[![sauce labs test status][sauce-badge]][sauce-href]

Of course, you can always transpile ES6 template strings using Babel, allowing you to use CSJS in any ES5 environment.

### Framework-agnostic

CSJS works with any framework, be it React, native Web Components, or something else.

### Full power of JavaScript in your CSS

* Real, full-fledged JavaScript
* Obviates the need for Sass/Less or other preprocessors
 * Proper imports/require
 * Real variables, functions, loops, etc.
 * As extensible as JavaScript itself

### Class Composition Syntax

CSJS also features class composition that works like [CSS Modules]:

([Live editable codepen.io demo](http://codepen.io/rtsao/pen/RrmpdX?editors=0010))

**common-styles.js**
```javascript
const csjs = require('csjs');

module.exports = csjs`

  .border {
    border: 1px solid black;
  }

  .italic {
    font-family: serif;
    font-style: italic;
  }

`;

```

**quote-styles.js**
```javascript
const csjs = require('csjs');

const common = require('./common-styles');

module.exports = csjs`

  .blockQuote extends ${common.italic} {
    background: #ccc;
    padding: 8px;
    border-radius: 4px;
  }

  .pullQuote extends .blockQuote, ${common.border} {
    background: #eee;
    font-weight: bold;
  }

`;

```

**app.js**
```javascript
const getCss = require('csjs/get-css');
const commonStyles = require('./common-styles');
const quoteStyles = require('./quote-styles');

quoteStyles.blockQuote;
// => "blockQuote_2bVd7K italic_3YGtO7"

quoteStyles.pullQuote;
// => "pullQuote_2bVd7K blockQuote_2bVd7K italic_3YGtO7 border_3YGtO7"

getCss(quoteStyles);
/*
.blockQuote_2bVd7K {
  background: #ccc;
  padding: 8px;
  border-radius: 4px;
}

.pullQuote_2bVd7K {
  background: #eee;
  font-weight: bold;
}
*/

getCss(commonStyles);
/*
.border_3YGtO7 {
  border: 1px solid black;
}

.italic_3YGtO7 {
  font-family: serif;
  font-style: italic;
}
*/
```

### Optional tooling

#### Extracted static CSS bundles

[csjs-extractify](https://github.com/rtsao/csjs-extractify) is a browserify plugin that allows you to extract your application's CSJS into a static CSS file at build time.

#### Automatic CSS injection

[csjs-injectify](https://github.com/rtsao/csjs-injectify) is a browserify transform that automatically replaces `csjs` with [`csjs-inject`](https://github.com/rtsao/csjs-inject), which automatically injects your scoped CSS into the `<head>` at runtime. It is recommended to use this rather than the [csjs-inject](https://github.com/rtsao/csjs-inject) module directly.

#### PostCSS

[babel-plugin-csjs-postcss](https://github.com/rtsao/babel-plugin-csjs-postcss) is a Babel plugin that allows you to run PostCSS on the CSS contained within CSJS template string literals at build time. Works with plugins such as [Autoprefixer].

#### Syntax highlighting
[neurosnap](https://github.com/neurosnap) has created an [Atom plugin for syntax highlighting](https://github.com/neurosnap/language-csjs) CSS within CSJS tagged template strings.


## FAQ

##### Why the name CSJS?

CSJS is 100% valid JavaScript, hence the name Cascading Style JavaScripts.

##### Why not Sass?

Sass doesn't provide any way to scope CSS, thus encapsulation of styles in components isn't possible with Sass alone. Additionally, because Sass was designed for use in a global CSS namespace, many of its features just don't make sense when styles are scoped and encapsulated in components. `@extend` in Sass is extremely problematic, whereas CSJS has a proper mechanism for class composition that actually works like it should. Furthermore, with CSJS, you have the ability to use real JavaScript in CSS, which is significantly more powerful and extensible than the language features included in Sass, so there's not really any reason to use Sass at all.

##### Why not CSS Modules?

CSJS was inspired by [CSS Modules] and they are virtually identical in concept. However, unlike CSS Modules which attempts to reproduce an ES6-style module system into CSS itself, CSJS simply uses native JS modules. CSJS also uses normal JS variables whereas CSS Modules invents its own CSS variable syntax.

Consquently, CSJS is merely plain JavaScript and works without any extra tooling (CSS Modules is not valid CSS). Furthermore, because CSJS is essentially an amalgamation of plain JavaScript and plain CSS, there's no any new syntax or semantics to learn (besides the optional composition syntactic sugar, which closely mimicks ES6 classes).

##### Why not Radium?

Inline styles are cool, but there are limitations to using pure inline styles. For example, CSS pseudo-classes and media queries aren't possible with inline styles. This is the premise behind Radium, which works around this by re-implementing these CSS features using JavaScript.

Whereas Radium is wholly dependent on React and involves performance trade-offs in its JavaScript implementations of CSS features, CSJS works regardless of framework (or lack thereof) and allows for the use of all CSS features natively (including media queries and pseudo-classes).

## See Also
* https://github.com/rtsao/csjs-example-app
* https://github.com/rtsao/csjs-extractify
* https://github.com/rtsao/csjs-injectify
* https://github.com/rtsao/csjs-inject
* https://github.com/rtsao/babel-plugin-csjs-postcss
* https://github.com/rtsao/scope-styles

## License
MIT

[(1)]: #full-power-of-javascript-in-your-css
[(2)]: #class-composition-syntax
[(3)]: #simple-tooling-free

[CSS Modules]: https://github.com/css-modules/css-modules
[Autoprefixer]: https://github.com/postcss/autoprefixer

[csjs-bundle]: https://wzrd.in/bundle/csjs@latest

[npm-badge]: https://badge.fury.io/js/csjs.svg
[npm-href]: https://www.npmjs.com/package/csjs
[build-badge]: https://travis-ci.org/rtsao/csjs.svg?branch=master
[build-href]: https://travis-ci.org/rtsao/csjs
[coverage-badge]: https://coveralls.io/repos/rtsao/csjs/badge.svg?branch=master&service=github
[coverage-href]: https://coveralls.io/github/rtsao/csjs?branch=master
[deps-badge]: https://img.shields.io/badge/dependencies-none-brightgreen.svg
[deps-href]: https://david-dm.org/rtsao/csjs
[sauce-badge]: https://saucelabs.com/browser-matrix/csjs.svg
[sauce-href]: https://saucelabs.com/u/csjs
