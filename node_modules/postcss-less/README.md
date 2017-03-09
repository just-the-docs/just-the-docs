# PostCSS LESS Syntax

[PostCSS]: https://github.com/postcss/postcss
[PostCSS-SCSS]: https://github.com/postcss/postcss-scss
[LESS]: http://lesless.org
[Autoprefixer]: https://github.com/postcss/autoprefixer
[Stylelint]: http://stylelint.io/

> This project is not stable and is in development. If you'd like to contribute, please submit a Pull Request.

<img align="right" width="95" height="95"
     title="Philosopher's stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo.svg">

[![Build Status](https://img.shields.io/travis/webschik/postcss-less.svg?branch=develop)](https://travis-ci.org/webschik/postcss-less)
[![npm Downloads](https://img.shields.io/npm/dt/postcss-less.svg)](https://www.npmjs.com/package/postcss-less)
[![npm Version](https://img.shields.io/npm/v/postcss-less.svg)](https://www.npmjs.com/package/postcss-less)
[![npm License](https://img.shields.io/npm/l/postcss-less.svg)](https://www.npmjs.com/package/postcss-less)
[![js-strict-standard-style](https://img.shields.io/badge/code%20style-strict-117D6B.svg)](https://github.com/keithamus/eslint-config-strict)

A [LESS] parser for [PostCSS].

**This module does not compile LESS.** It simply parses mixins and variables so that PostCSS plugins can then transform LESS source code alongside CSS.

## Use Cases

* lint your LESS code with 3rd-part plugins.
* apply PostCSS transformations (such as [Autoprefixer](https://github.com/postcss/autoprefixer)) directly to the LESS source code

## Usage

### LESS Transformations

The main use case of this plugin is to apply PostCSS transformations directly
to LESS source code. For example, if you ship a theme written in LESS and need
[Autoprefixer] to add the appropriate vendor prefixes to it.

```js
const syntax = require('postcss-less');
postcss(plugins).process(lessText, { syntax: syntax }).then(function (result) {
    result.content // LESS with transformations
});
```

### Comments

#### Inline comments

This module also enables parsing of single-line comments in CSS source code.

````less
:root {
    // Main theme color
    --color: red;
}
````

Note that you don't need a special stringifier to handle the output; the default
one will automatically convert single line comments into block comments. 
If you need to get inline comments, use [custom PostCSSLess stringifier](#stringifier)

### Rule node
[PostCSS Rule Node](https://github.com/postcss/postcss/blob/master/docs/api.md#rule-node)

#### rule.ruleWithoutBody
It shows that Rule node has body or not.

````js
import postCssLess from 'postcss-less';
const less = `
    .class2 {
        &:extend(.class1);
        .mixin-name(@param1, @param2);
    }
`;
const root = postCssLess.parse(less);

root.first.nodes[0].ruleWithoutBody // => true for &:extend
root.first.nodes[1].ruleWithoutBody // => true for calling of mixin
````
#### rule.nodes

Array of children nodes. 
**Note** that rules without body don't have this property.

````js
import postCssLess from 'postcss-less';
const less = `
    .class2 {
        &:extend(.class1);
        .mixin-name(@param1, @param2);
    }
`;
const root = postCssLess.parse(less);

root.first.nodes[0].nodes // => undefined for &:extend
root.first.nodes[1].nodes // => undefined for mixin calling
````

#### rule.extendRule
It shows that Rule node is a nested [extend](http://lesscss.org/features/#extend-feature-extend-inside-ruleset) rule.

````js
import postCssLess from 'postcss-less';
const less = `
    .class2 {
        &:extend(.class1);
    }
`;
const root = postCssLess.parse(less);

root.first.nodes[0].extendRule // => true
````

### Comment Node

[PostCSS Comment Node](https://github.com/postcss/postcss/blob/master/docs/api.md#comment-node)

#### comment.inline
It's inline comment or not.
````js
import postCssLess from 'postcss-less';

const root = postCssLess.parse('// Hello world');

root.first.inline // => true
````

#### comment.block
It's block comment or not.
````js
import postCssLess from 'postcss-less';

const root = postCssLess.parse('/* Hello world */');

root.first.block // => true
````

#### comment.raws.begin
Precending characters of comment node: `//` or `/*`.

#### comment.raws.content
Raw content of the comment.
````js
import postCssLess from 'postcss-less';

const root = postCssLess.parse('// Hello world');

root.first.raws.content // => '// Hello world'
````

### Stringifier

If you need to have LESS code without PostCSS transformation, you have to specify a custom stringifier:

````js
import postcss from 'postcss';
import postcssLess from 'postcss-less';
import stringify from 'postcss-less/less-stringify';

const lessCode = `
    // Non-css comment
    
    .container {
        .mixin-1();
        .mixin-2;
        .mixin-3 (@width: 100px) {
            width: @width;
        }
    }
    
    .rotation(@deg:5deg){
      .transform(rotate(@deg));
    }
`;

postcss().process(less, {
    syntax: postcssLess,
    stringifier: stringify
}).then((result) => {
    console.log(result.content); // this will be value of `lessCode` without changing of comment nodes and mixins
});         
````

## Contribution
Please, check our guidelines: [CONTRIBUTING.md](./CONTRIBUTING.md)

## Attribution

This module is based on the work of [postcss-scss](https://github.com/postcss/postcss-scss) library and includes the `LESS` parser efforts of [github:gilt/postcss-less](https://github.com/gilt/postcss-less)
