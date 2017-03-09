# PostCSS SCSS Syntax [![Build Status][ci-img]][ci]

<img align="right" width="95" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo.svg">

A [SCSS] parser for [PostCSS].

**This module does not compile SCSS.** It simply parses mixins as custom
at-rules & variables as properties, so that PostCSS plugins can then transform
SCSS source code alongside CSS.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://img.shields.io/travis/postcss/postcss-scss.svg
[SCSS]:    http://sass-lang.com/
[ci]:      https://travis-ci.org/postcss/postcss-scss

<a href="https://evilmartians.com/?utm_source=postcss">
<img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg" alt="Sponsored by Evil Martians" width="236" height="54">
</a>

## Usage

### SCSS Transformations

The main use case of this plugin is to apply PostCSS transformations directly
to SCSS source code. For example, if you ship a theme written in SCSS and need
[Autoprefixer] to add the appropriate vendor prefixes to it; or you need to
lint SCSS with a plugin such as [Stylelint].

```js
var syntax = require('postcss-scss');
postcss(plugins).process(scss, { syntax: syntax }).then(function (result) {
    result.content // SCSS with transformations
});
```

[Autoprefixer]: https://github.com/postcss/autoprefixer
[Stylelint]:    http://stylelint.io/

### Inline Comments for PostCSS

This module also enables parsing of single-line comments in CSS source code.

```scss
:root {
    // Main theme color
    --color: red;
}
```

Note that you don’t need a special stringifier to handle the output; the default
one will automatically convert single line comments into block comments.

```js
var syntax = require('postcss-scss');
postcss(plugins).process(scss, { parser: syntax }).then(function (result) {
    result.css // CSS with normal comments
});
```

If you want Sass behaviour with removing inline comments, you can use
[postcss-strip-inline-comments] plugin.

[postcss-strip-inline-comments]: https://github.com/mummybot/postcss-strip-inline-comments
