Dexonline
===================

node-dexonline is a simple interface that provides definitions for romanian
words directly into your js file or terminal.

### Instalation

```sh
$ sudo npm install -g dexonline
```

### Usage

#### Directly from the terminal

```sh
$ dexonline definitie Internet
```

#### Javascript file

```js
var dex = require('dexonline');

dex.definitie('Internet', function (err, def) {
    console.log(err || def);
});

dex.text('Internet', function (err, def) {
    console.log(err || def);
});
```

### Methods

#### `definitie (word, callback)`
  - word: String representing the word you want to search
  - callback: the callback function.

#### `text (word, callback)`
  - word: String representing the word you want to search
  - callback: the callback function.

NOTE: Better explanation with ```dexonline#text```.

## Test

```sh
$ npm test
```

## Changelog

  - `0.0.2`
    - Add README and bump version.
    - Change formatting and add comments.
  - `0.0.1` - First release
  - `0.0.0` - First working version

## License
See the [LICENSE](https://raw.githubusercontent.com/radubogdan/node-dexonline/master/LICENSE) file.
