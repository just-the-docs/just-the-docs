# grunt-force

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url]

The stupid force-flag toggler.

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-force --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-force');
```

## Tasks

### `force:on`

Sets the `force` option to `true`.

### `force:off`

Sets the `force` option to `false`.

### `force` or `force:reset`

Sets the `force` option back to its original value. Defaults to `false`, but would be `true` if Grunt was executed with the `--force` flag.

## Example

```js
grunt.registerTask('default', [
    'force:on',
    'csslint',
    'jshint',
    'force:off',
    'testTask',
    'force:reset',
    'buildTask'
]);
```

## Contribute

[![Tasks][waffle-img]][waffle-url] [![Tip][gittip-img]][gittip-url]

Standards for this project, including tests, code coverage, and semantics are enforced with a build tool. Pull requests must include passing tests with 100% code coverage and no linting errors.

----

© 2015 Shannon Moeller <me@shannonmoeller.com>

Licensed under [MIT](http://shannonmoeller.com/mit.txt)

[downloads-img]: http://img.shields.io/npm/dm/grunt-force.svg?style=flat-square
[gittip-img]:    http://img.shields.io/gittip/shannonmoeller.svg?style=flat-square
[gittip-url]:    https://www.gittip.com/shannonmoeller
[npm-img]:       http://img.shields.io/npm/v/grunt-force.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/grunt-force
[waffle-img]:    http://img.shields.io/github/issues/shannonmoeller/grunt-force.svg?style=flat-square
[waffle-url]:    http://waffle.io/shannonmoeller/grunt-force
