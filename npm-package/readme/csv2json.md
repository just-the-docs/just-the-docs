# csv2json

[![Package Version](https://badgen.net/npm/v/csv2json)](https://npmjs.org/package/csv2json) [![Build Status](https://travis-ci.org/julien-f/csv2json.png?branch=master)](https://travis-ci.org/julien-f/csv2json) [![PackagePhobia](https://badgen.net/packagephobia/install/csv2json)](https://packagephobia.now.sh/result?p=csv2json) [![Latest Commit](https://badgen.net/github/last-commit/julien-f/csv2json)](https://github.com/julien-f/csv2json/commits/master)

> Stream and CLI to convert CSV to JSON.

## Install

Installation of the [npm package](https://npmjs.org/package/csv2json):

Install globally if you want to use the CLI:

```
npm install --global csv2json
```

Install locally if you want to use it as a library:

```
npm install --save csv2json
```

## Usage

### CLI

```
Usage: csv2json [OPTIONS] [<input file> [<output file>]]

  -d, --dynamic-typing
    Convert booleans and numeric to their type instead of strings.

  -s <separator>, --separator=<separator>
    Field separator to use (default to comma “,”).

  -t, --tsv
    Use tab as separator, overrides separator flag.

  <input file>
    CSV file to read data from.
    If unspecified or a dash (“-”), use the standard input.

  <output file>
    JSON file to write data to.
    If unspecified or a dash (“-”), use the standard output.
```

### Stream

```javascript
var csv2json = require('csv2json');
var fs = require('fs');

fs.createReadStream('data.csv')
  .pipe(csv2json({
    // Defaults to comma.
    separator: ';'
  }))
  .pipe(fs.createWriteStream('data.json'));
```

## Contributions

Contributions are *very* welcomed, either on the documentation or on
the code.

You may:

- report any [issue](https://github.com/julien-f/csv2json/issues)
  you've encountered;
- fork and create a pull request.

## Note

Thanks to @twilson63 for letting me use the *csv2json* name on [npm](https://www.npmjs.org/).

## License

ISC © [Julien Fontanet](http://julien.isonoe.net)
