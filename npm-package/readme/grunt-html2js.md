# grunt-html-to-jsobj

> This is a fork of the `grunt-common-html2js` which is a fork of the `grunt-html2js` which is only for AngularJS template.This fork adds a new option to modify/simplify the processed template name in the JS object.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-html-to-jsobj --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-html-to-jsobj');
```

## The "html2js" task

### Setup

In your project's Gruntfile, add a section named `html2js` to the data object passed into `grunt.initConfig()`.

This simplest configuration will assemble all templates in your src tree into a module named `templates-main`, and write the JavaScript source for the module to `tmp/template.js`:

```js
grunt.initConfig({
  html2js: {
    options: {
      // custom options, see below
    },
    main: {
      src: ['src/**/*.tpl.html'],
      dest: 'tmp/templates.js'
    },
  },
})
```

Assuming you concatenate the resulting file with the rest of your application code, you can then specify the module as a dependency in your code:

```
;(function (templates, undefined) {
  templates["test/fixtures/one.tpl.html"] = "1 2 3";
  templates["test/fixtures/two.tpl.html"] = "Testing";
})(this.templates = this.templates || {});
```

Note that you should use relative paths to specify the template URL, to
match the keys by which the template source is cached.

### Gotchas

The `dest` property must be a string.  If it is an array, Grunt will fail when attempting to write the bundle file.

### Options

#### removed options.base

#### removed options.module

#### removed options.rename

#### options.globalname
Type: `String`
Default value: `'templates'`

Update the global name, by default it's on `this.templates`.

#### options.target
Type: `String`
Default value: `'js'`

Language of the output file. Possible values: `'coffee'`, `'js'`.

#### options.quoteChar
Type: `Character`
Default value: `"`

Strings are quoted with double-quotes by default.  However, for projects
that want strict single quote-only usage, you can specify:

```
options: { quoteChar: '\'' }
```

to use single quotes, or any other odd quoting character you want

#### options.indentString
Type: `String`
Default value: `  `

By default a 2-space indent is used for the generated code. However,
you can specify alternate indenting via:

```
options: { indentString: '    ' }
```

to get, for example, 4-space indents. Same goes for tabs or any other
indent system you want to use.

#### options.fileHeaderString:
Type: `String`
Default value: ``

If specified, this string  will get written at the top of the output
Template.js file. As an example, jshint directives such as
/* global angular: false */ can be put at the head of the file.

#### options.fileFooterString:
Type: `String`
Default value: ``

If specified, this string  will get written at the end of the output
file.  May be used in conjunction with `fileHeaderString` to wrap
the output.

#### options.useStrict:
Type: `Boolean`
Default value: ``

If set true, each module in JavaScript will have 'use strict'; written at the top of the
module.  Useful for global strict jshint settings.

```
options: { useStrict: true }
```

#### options.htmlmin:
Type: `Object`
Default value: {}

Minifies HTML using [html-minifier](https://github.com/kangax/html-minifier).

```
options: {
  htmlmin: {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  }
}
```

#### options.process:
Type: `Object` or `Boolean` or `Function`
Default value: `false`

Performs arbitrary processing on the template as part of the compilation process.

Option value can be one of:

1. a function that accepts `content` and `filepath` as arguments, and returns the transformed content
2. an object that is passed as the second options argument to `grunt.template.process` (with the file content as the first argument)
3.  `true` to call `grunt.template.process` with the content and no options

#### options.templatePropertyName:
Type: `String`
Default value: ``

Switches between two property name usage policy: either use the path of the file as a property name or a part of the file name

Option value can be one of:

1. You can add an empty string as a value to use the default functionality
2. You can use the `useFileName` value to use the first part of the file name if it's divided by dots like `mytemplate.tpl.html` will be `test.templates.mytemplate` with the sample options used below

```
options: {
  htmlmin: {
    globalname: 'test.templates',
    templatePropertyName: 'useFileName'
  }
}
```

### Usage Examples

See the `Gruntfile.js` in the project source code for various configuration examples.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

0.3.4 make it suitable for common html template converting.
