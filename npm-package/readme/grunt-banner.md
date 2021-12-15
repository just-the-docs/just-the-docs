# grunt-banner

[![NPM version](https://img.shields.io/npm/v/grunt-banner.svg)](https://www.npmjs.com/package/grunt-banner)
[![Build Status](https://img.shields.io/travis/mattstyles/grunt-banner/master.svg)](https://travis-ci.org/mattstyles/grunt-banner)
[![Dependency Status](https://img.shields.io/david/mattstyles/grunt-banner.svg)](https://david-dm.org/mattstyles/grunt-banner#info=deependencies)
[![devDependency Status](https://img.shields.io/david/dev/mattstyles/grunt-banner.svg)](https://david-dm.org/mattstyles/grunt-banner#info=devDependencies)

> Adds a simple banner to files

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-banner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-banner');
```

Or if you are using [matchdep](https://github.com/tkellen/node-matchdep) it will be included along with other `grunt-*` tasks by using this line of JavaScript:

```js
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
```

## The "usebanner" task

*grunt-banner renamed its task from `banner` to `usebanner` as a `banner` is often used to hold a banner template for a number of grunt plugins.*

### Overview

In your project's Gruntfile, add a section named `usebanner` to the data object passed into `grunt.initConfig()`.

The wildcard selector `*` is perfectly valid for selecting targets to add a banner to.

```js
grunt.initConfig({
  usebanner: {
    taskName: {
      options: {
        position: 'top',
        banner: '// banner text <%= templates encouraged %>',
        linebreak: true
      },
      files: {
        src: [ 'path/to/file.ext', 'path/to/another/*.ext' ]
      }
    }
  }
})
```

### Options

#### options.position

Type: `String`  
Default: `'top'`  
Value range: `'top'` or `'bottom'` or `'replace'`

The position to place the banner - *either* the top or bottom or in place of the contents in the desired file specified by `'replaceContent'` when and existing banner is replaced by `grunt-banner`.

When `position` is set to `'replace'`, this *implies* `options.replace: true` unless that option has explicitly been set by the user already (see below).

When `position` is set to `'replace'` and replacement fails, i.e. no existing banner could be spotted, then `grunt-banner` falls back to regular `position: 'top' | position: 'bottom'` banner insertion behaviour.

In short: `grunt-banner` will always either *replace* or *add* a banner!

#### options.replace

Type: `Boolean`, `String`, `RegExp` or `Function`

The text in the specified file that the banner should replace. When `position` is set to `'replace'`, every occurrence of a banner (see below for more on how existing banners are located) will be replaced by the new one. When `position` is set to either `'top'` or `'bottom'`, then the existing banners will be removed and replaced by a single new banner at the top or bottom of the file as directed by the `position` setting.

These `options.replace` parameter types / values are supported:

* Boolean `false` (default) - do not look for existing banners; simply add the banner at the specified position (top / bottom).
* Boolean `true` - 'smart' replace mode: use the built-in 'smart' locate-and-mark scanner to dig out the existing banners (more on the rules what maketh a banner below).
* (string) - replace any part of the source code which matches this *implicit regex*.
  > This means most strings are matched as-is, but do not get mistaken about this: dot `.`, star `*` et al will not be the *literal characters* you might have expected, but are treated as regex operators! E.g. `replace: "/* blurb */"` will **not** work as if a literal string, since the stars `*` in there will make it match lines like `// blurb //` but **will not** match an actual C-style comment line `/* blurb */`. You will need to specify the proper regex string for that instead: `replace: "\/\* blurb \*\/"`.
  > Also note that *every* regex match will be replaced by the specified banner. If your regex is not selective or precise enough, you may end up with some surprising replacements. **This is not a bug. You are responsible for providing *fitting* regexes to have `grunt-banner` match against.**
* (RegExp) - a rexexp instance to match against. The same caveats as the (string) type value above apply.
* (function) - provide your own callback method to locate and mark the input. The interface for the callback function is:

  ```js
  function (fileContents, newBanner, insertPositionMarker, src, options)
  ```

  which should *return* the marked `fileContents`, i.e. the `fileContents` with all banners eligible for replacement removed and replaced by a simple `insertPositionMarker` string (see below). Your locate-and-match callback may insert *one*, *multiple* markers or *none*: `grunt-banner` will check how many markers you injected and either replace them when one or more markers are seen, or when none are found, revert to its basic `top|bottom` position-based banner *insertion* process.

  The callback function parameters:

  * `fileContents` (string) - the contents of the `src` file.
  * `newBanner` (string) - the new banner to be inserted by `grunt-banner`.
    > This (and the `options` parameter, see below) allows you to customize `grunt-banner` behaviour to an extreme degree, even providing your own custom *replacer* entirely: simply return your processed result with a single marker and reduce the `options.banner` to an empty string. But I digress...
  * `insertPositionMarker` (string) - the insert marker.
    Currently this is the Unicode `REPLACEMENT CHARACTER` character, i.e. `\uFFFD`. We *assume* your original file content does not contain this marker already.
  * `src` (string) - the path to the file being processed.
  * `options` (object reference) - a *reference* to the current `options` object as used by `grunt-banner`.

    This **is not** the same as the `options` object you provided through your `Gruntfile`; this is a reference to the updated/augmented clone of that original as used by `grunt-banner` internally.

    Though the following coding practice should be frowned upon as 'side effects' are generally undesirable, you *can* tweak the `options.banner` value to suit your custom needs, for example.

    **Treat with great care when you are about to *edit* attributes in this `options` object reference! The fact that you *can* doesn't mean you *should* fiddle with it!**

#### options.banner

Type: `String`

The text to use as a banner. Templated strings are perfectly acceptable and encouraged.

#### options.pattern

Type: `String`

Allows the banner to be added only if the supplied pattern matches.

#### options.linebreak

Type: `Boolean`  
Default: `true`

Set `linebreak` to true to add a line break between banner and file content.

#### options.process

Type: `Function`

Allows the banner to be generated for each file using the output of the process function.

### The `options.replace: true` default locate-and-mark functionality

The default locate-and-mark process, invoked when you specify the `replace: true` option (or `position: "replace"` without any `replace:` value to go with that one) is set up to locate copyright banner comment chunks in either C or C++ style format, i.e. surrounded by `/*....*/` or single- or multiline `//` comment chunks.

The process will inspect each comment chunk which start at the **left edge** (hence we ignore all *indented* comment chunks!) and which span *entire* lines, hence ruling out any comments which are leading or trailing source code statements *on the same line*.

The last restriction placed on any 'old' banner to replace is that it **must** have the (case-**in**sensitive) word `Copyright` in there somewhere. And that word **must** be followed by a bit of non-whitespace blurb on the same line: generally a year, a name or both suffices to satisfy this last condition.

Any such 'banner' block is marked for replacement in its entirety.

#### Warning Note

**The replacer *does not* check if the *new* banner also includes the `Copyright` phrase, hence multiple applications of `grunt-banner` may lead to the later rounds of `grunt-banner` application *adding* the shiny new banner at the top (or bottom) of the source file.**

### Usage Examples

#### Basic Usage

In this example an `appConfig` is read from a JSON file and used to populate a `banner` template which is then used by `grunt-banner` to place at the top of some files. Each file in the array will have the banner placed on to it and all `.js` files in the `/more-scripts/` folder will have a banner thanks to the `*` wildcard.

```js
var appConfig = grunt.file.readJSON( 'app-config.json' ) || {};
grunt.initConfig({
  banner: '/* <%= appConfig.info.name %> - version <%= appConfig.info.version %> - ' +
          '<%= grunt.template.today("dd-mm-yyyy") %>\n' +
          '<%= appConfig.info.description %>\n ' +
          '&#169 <%= grunt.template.today("yyyy") %> <%= appConfig.info.author.name %> ' +
          '- <%= appConfig.info.author.email %> */\n',
  usebanner: {
    dist: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: [ 'scripts/main-min.js', 'stylesheets/main-min.css', 'more-scripts/*.js' ]
      }
    }
  }
})
```

#### Process Usage

By supplying a process **function** you effectively take control of how the banner is generated, the task is still responsible for placing it. In essence, it replaces the need for a banner object being specified in your grunt config as you are creating it from code for each file. This gives you the flexibility to add file-specific data to your banners.

This example uses [grunt templating](http://gruntjs.com/api/grunt.template) to generate a banner that references the file name it is being appended to. Run the test cases to see this in action.

```js
usebanner: {
  dist: {
    options: {
      position: 'top',
      process: function ( filepath ) {
        return grunt.template.process(
          '// banner for file: <%= filename %>', {
            data: {
              filename: filepath.match(/\/([^/]*)$/)[1]
            }
          }
        );
      }
    },
    files: {
      src: [ 'test/tmp/someProcess.js' ]
    }
  }
}
```

### Notes

`grunt-banner` *adds* the banner to the head or foot of the files that are specified by the array passed to `files.src` unless ways to see if a banner already exists have been properly set up (`options.replace` and/or `position: 'replace'`).

It is up to the user to ensure that either the file should not already contain a banner or that the configured locate-and-mark means (default locate-and-mark function, user-specified regex or user-specified callback function) are sufficient to ensure that no undesired code chunk replacements may occur. To this end it is recommended to use the [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean) task and only add banners to built code.

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
