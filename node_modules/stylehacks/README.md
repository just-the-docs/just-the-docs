# stylehacks [![Build Status](https://travis-ci.org/ben-eb/stylehacks.svg?branch=master)][ci] [![NPM version](https://badge.fury.io/js/stylehacks.svg)][npm] [![Dependency Status](https://gemnasium.com/ben-eb/stylehacks.svg)][deps]

> Detect/remove browser hacks from CSS files.


## Install

With [npm](https://npmjs.org/package/stylehacks) do:

```
npm install stylehacks --save
```


## Example

In its default mode, stylehacks will remove hacks from your CSS file, based on
the browsers that you wish to support.

### Input

```css
h1 {
    _color: white;
    color: rgba(255, 255, 255, 0.5);
}
```

### Output

```css
h1 {
    color: rgba(255, 255, 255, 0.5);
}
```


## API

### `stylehacks.detect(node)`

Type: `function`  
Returns: `boolean`

This method will take any PostCSS *node*, run applicable plugins depending on
its type, then will return a boolean depending on whether it found any of
the supported hacks. For example, if the `decl` node found below is passed to
the `detect` function, it will return `true`. But if the `rule` node is passed,
it will return `false` instead.

```css
h1 { _color: red }
```

### `stylehacks.process(css, [options]).then(function(result) {})`

#### options

##### browsers

Type: `string|array`  
Default: [browserslist defaults](https://github.com/ai/browserslist)

Specify the browsers that you wish to support. The string will be passed
directly to browserslist and parsed, however if an array is passed instead then
stylehacks will use it instead of parsing the browsers itself.

##### lint

Type: `boolean`  
Default: `false`

If lint mode is enabled, stylehacks will not remove hacks from the CSS; instead,
it will warn that hacks were found. When using stylehacks as a PostCSS plugin,
you are expected to handle these messages yourself.

##### silent

Type: `boolean`  
Default: `false`

Used in combination with the lint option; disables all logging. When using the
CLI, the process will exit with 0 or 1 as usual.

##### sourcemap

Type: `boolean`  
Default: `false`

Generate a sourcemap with the transformed CSS.

### `postcss([ stylehacks(opts) ])`

stylehacks can also be consumed as a PostCSS plugin. See the
[documentation](https://github.com/postcss/postcss#usage) for examples for
your environment.

### CLI

stylehacks also ships with a CLI app. To see the available options, just run:

```sh
$ stylehacks --help
```


## Related

stylehacks works well with your existing PostCSS setup:

* [stylelint] - Comprehensive & modern CSS linter, to ensure that your code
  style rules are respected.


## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.


## License

MIT © [Ben Briggs](http://beneb.info)


[ci]:        https://travis-ci.org/ben-eb/stylehacks
[deps]:      https://gemnasium.com/ben-eb/stylehacks
[npm]:       http://badge.fury.io/js/stylehacks
[postcss]:   https://github.com/postcss/postcss
[stylelint]: https://github.com/stylelint/stylelint
