# json-2-csv
**Convert JSON to CSV _or_ CSV to JSON**

[![Dependencies](https://img.shields.io/david/mrodrig/json-2-csv.svg)](https://www.npmjs.org/package/json-2-csv)
[![Downloads](https://img.shields.io/npm/dm/json-2-csv.svg)](https://www.npmjs.org/package/json-2-csv)
[![NPM version](https://img.shields.io/npm/v/json-2-csv.svg)](https://www.npmjs.org/package/json-2-csv)
[![Minzipped Size](https://flat.badgen.net/bundlephobia/minzip/json-2-csv)](https://bundlephobia.com/result?p=json-2-csv)

[![Build Status](https://travis-ci.org/mrodrig/json-2-csv.svg?branch=master)](https://travis-ci.org/mrodrig/json-2-csv)
[![Coverage Status](https://coveralls.io/repos/github/mrodrig/json-2-csv/badge.svg?branch=stable)](https://coveralls.io/github/mrodrig/json-2-csv?branch=stable)
[![Maintainability](https://api.codeclimate.com/v1/badges/8c0cc3699d054fb77abe/maintainability)](https://codeclimate.com/github/mrodrig/json-2-csv/maintainability)
[![Typings](https://shields-staging.herokuapp.com/npm/types/json-2-csv.svg?style=flat)](https://www.npmjs.org/package/json-2-csv)

This node module will convert an array of JSON documents to a CSV string.
Column headings will be automatically generated based on the keys of the JSON documents. Nested documents will have a '.' appended between the keys.

It is also capable of converting CSV of the same form back into the original array of JSON documents.
The columns headings will be used as the JSON document keys.  All lines must have the same exact number of CSV values.

## Installation

```bash
$ npm install json-2-csv
```

CLI:
```bash
$ npm install @mrodrig/json-2-csv-cli
```

## Upgrading?

Upgrading to v3 from v2? Check out the [upgrade guide](https://github.com/mrodrig/json-2-csv/blob/master/upgrade_guides/UPGRADE_2_to_3.md).

## Usage

```javascript
let converter = require('json-2-csv');
```
or
```javascript
import { json2csv } from 'json-2-csv';
```
Looking for examples? Check out the Wiki: [json-2-csv Wiki](https://github.com/mrodrig/json-2-csv/wiki)

### API

#### `converter.json2csv(array, callback, options)`

* `array` - An array of JSON documents to be converted to CSV.
* `callback` - A function of the form `function (err, csv)`; 
  * This function will receive any errors and/or the string of CSV generated.
* `options` - (Optional) A JSON document specifying any of the following key value pairs:
  * `checkSchemaDifferences` - Boolean - Should all documents have the same schema?
    * Default: `false`
    * Note: An error will be thrown if some documents have differing schemas when this is set to `true`.
  * `delimiter` - Document - Specifies the different types of delimiters
    * `field` - String - Field Delimiter. 
      * Default: `,`
    * `wrap` - String - Wrap values in the delimiter of choice (e.g. wrap values in quotes). 
      * Default: `"`
    * `eol` - String - End of Line Delimiter. 
      * Default: `\n`
  * `emptyFieldValue` - Any - Value that, if specified, will be substituted in for field values that are `undefined`, `null`, or an empty string.
    * Default: none
  * `excelBOM` - Boolean - Should a unicode character be prepended to allow Excel to open a UTF-8 encoded file with non-ASCII characters present.
  * `excludeKeys` - Array - Specify the keys that should be excluded from the output.
    * Default: `[]`
    * Note: When used with `unwindArrays`, arrays present at excluded key paths will not be unwound.
  * `expandArrayObjects` - Boolean - Should objects in array values be deep-converted to CSV?
  	* Default: `false`
  	* Example:
	```json
	[
		{ 
			"specifications": [
				{ "features": [...] },
				{ "mileage": "5000" }
			]
		}
	]
	```
  	* `true` uses the following keys:
  		* `['specifications.features', 'specifications.mileage']`
  	* `false` uses the following keys:
  		* `['specifications']`
    * Note: This may result in CSV output that does not map back exactly to the original JSON. See #102 for more information.
  * `keys` - Array - Specify the keys that should be converted.
    * Default: These will be auto-detected from your data by default.
    * Keys can either be specified as a String representing the key path that should be converted, or as an Object with the `field` property specifying the path. When specifying keys as an Object, you can also optionally specify a `title` which will be used for that column in the header. The list specified can contain a combination of Objects and Strings. 
      * `[ 'key1', 'key2', ... ]`
      * `[ { field: 'key1', title: 'Key 1' }, { field: 'key2' }, 'key3', ... ]`
    * Key Paths - If you are converting a nested object (ie. {info : {name: 'Mike'}}), then set this to ['info.name']
  * `parseValue` - Function - Specify how values should be converted into CSV format. This function is provided a single field value at a time and must return a `String`.
    * Default: A built-in method is used to parse out a variety of different value types to well-known formats.
    * Note: Using this option may override other options, including `useDateIso8601Format` and `useLocaleFormat`.
  * `prependHeader` - Boolean - Should the auto-generated header be prepended as the first line in the CSV?
    * Default: `true`
  * `sortHeader` - Boolean - Should the header keys be sorted in alphabetical order? 
    * Default: `false`
  * `trimFieldValues` - Boolean - Should the field values be trimmed?
    * Default: `false`
  * `trimHeaderFields` - Boolean - Should the header fields be trimmed? 
    * Default: `false`
  * `unwindArrays` - Boolean - Should array values be "unwound" such that there is one line per value in the array?
      * Default: `false`
      * Example:
      ```json
      [
          {
              "_id": {"$oid": "5cf7ca3616c91100018844af"},
              "data": {"category": "Computers", "options": [{"name": "MacBook Pro 15"}, {"name": "MacBook Air 13"}]}
          },
          {
              "_id": {"$oid": "5cf7ca3616c91100018844bf"},
              "data": {"category": "Cars", "options": [{"name": "Supercharger"}, {"name": "Turbocharger"}]}
          }
      ]
      ```
      * `true` will unwind the JSON to four objects, and therefore four lines of CSV values:
      ```csv
      _id.$oid,data.category,data.options.name
      5cf7ca3616c91100018844af,Computers,MacBook Pro 15
      5cf7ca3616c91100018844af,Computers,MacBook Air 13
      5cf7ca3616c91100018844bf,Cars,Supercharger
      5cf7ca3616c91100018844bf,Cars,Turbocharger
      ```
      * `false` will leave the values unwound and will convert the array as-is (when this option is used without expandArrayObjects):
      ```csv
      _id.$oid,data.category,data.options
      5cf7ca3616c91100018844af,Computers,"[{""name"":""MacBook Pro 15""},{""name"":""MacBook Air 13""}]"
      5cf7ca3616c91100018844bf,Cars,"[{""name"":""Supercharger""},{""name"":""Turbocharger""}]"
      ```
  	* Note: This may result in CSV output that does not map back exactly to the original JSON.
  * `useDateIso8601Format` - Boolean - Should date values be converted to an ISO8601 date string?
    * Default: `false`
    * Note: If selected, values will be converted using `toISOString()` rather than `toString()` or `toLocaleString()` depending on the other options provided.
  * `useLocaleFormat` - Boolean - Should values be converted to a locale specific string?
    * Default: `false`
    * Note: If selected, values will be converted using `toLocaleString()` rather than `toString()`
  * `wrapBooleans` - Boolean - Should boolean values be wrapped in wrap delimiters to prevent Excel from converting them to Excel's TRUE/FALSE Boolean values.
    * Default: `false`


For examples, please refer to the [json2csv API Documentation (Link)](https://github.com/mrodrig/json-2-csv/wiki/json2csv-Documentation)

#### Promisified Version: `converter.json2csvAsync(array, options)`

Available in version `2.2.0`, this functionality makes use of promises from the `bluebird` module.

#### `converter.csv2json(csv, callback, options)`

* `csv` - A string of CSV
* `callback` - A function of the form `function (err, array)`; This function will receive any errors and/or the array of JSON documents generated.
* `options` - (Optional) A JSON document specifying any of the following key value pairs:
  * `delimiter` - Document - Specifies the different types of delimiters
    * `field` - String - Field Delimiter. 
      * Default: `,`
    * `wrap` - String - The character that field values are wrapped in. 
      * Default: `"`
    * `eol` - String - End of Line Delimiter. 
      * Default: `\n`
  * `excelBOM` - Boolean - Does the CSV contain a unicode character prepended in order to allow Excel to open a UTF-8 encoded file with non-ASCII characters present?
    * Default: `false`
  * `keys` - Array - Specify the keys (as strings) that should be converted. 
    * Default: `null`
    * If you have a nested object (ie. `{info : {name: 'Mike'}}`), then set this to `['info.name']`
    * If you want all keys to be converted, then specify `null` or don't specify the option to utilize the default.
  * `parseValue` - Function - Specify how `String` representations of field values should be parsed when converting back to JSON. This function is provided a single `String` and can return any value.
    * Default: `JSON.parse` - An attempt is made to convert the String back to its original value using `JSON.parse`.
  * `trimHeaderFields` - Boolean - Should the header fields be trimmed? 
    * Default: `false`
  * `trimFieldValues` - Boolean - Should the field values be trimmed? 
    * Default: `false`

For examples, please refer to the [csv2json API Documentation (Link)](https://github.com/mrodrig/json-2-csv/wiki/csv2json-Documentation)

#### Promisified Version: `csv2jsonAsync(csv, options)`

Available in version `2.2.0`, this functionality makes use of promises from the `bluebird` module.

### CLI
Note: As of `3.5.8`, the command line interface functionality has been pulled out to a separate package. Please be sure to
install the `@mrodrig/json-2-csv-cli` NPM package if you wish to use the CLI functionality shown below:

```bash
$ npm install @mrodrig/json-2-csv-cli
``` 

#### json2csv
```
Usage: json2csv <jsonFile> [options]

Options:
  -V, --version                    output the version number
  -o, --output [output]            Path of output file. If not provided, then stdout will be used
  -f, --field <delimiter>          Optional field delimiter
  -w, --wrap <delimiter>           Optional wrap delimiter
  -e, --eol <delimiter>            Optional end of line delimiter
  -b, --excel-bom                  Excel Byte Order Mark character prepended to CSV
  -W, --without-header             Withhold the prepended header
  -s, --sort-header                Sort the header fields
  -H, --trim-header                Trim header fields
  -F, --trim-fields                Trim field values
  -S, --check-schema               Check for schema differences
  -E, --empty-field-value <value>  Empty field value
  -A, --expand-array-objects       Expand array objects
  -k, --keys [keys]                Keys of documents to convert to CSV
  -h, --help                       output usage information
```

#### csv2json
```
Usage: csv2json <csvFile> [options]

Options:
  -V, --version            output the version number
  -c, --csv <csv>          Path of json file to be converted
  -o, --output [output]    Path of output file. If not provided, then stdout will be used
  -f, --field <delimiter>  Optional field delimiter
  -w, --wrap <delimiter>   Optional wrap delimiter
  -e, --eol <delimiter>    Optional end of line delimiter
  -b, --excel-bom          Excel Byte Order Mark character prepended to CSV
  -H, --trim-header        Trim header fields
  -F, --trim-fields        Trim field values
  -k, --keys [keys]        Keys of documents to convert to CSV
  -h, --help               output usage information
```

## Tests

```bash
$ npm test
```

To see test coverage, please run:
```bash
$ npm run coverage
```

Current Coverage is:
```
Statements   : 100% ( 286/286 )
Branches     : 100% ( 166/166 )
Functions    : 100% ( 73/73 )
Lines        : 100% ( 280/280 )
```

## Frequently Asked Questions (FAQ)
Please find the updated list (relocated to the Wiki) here: [Frequently Asked Questions (Link)](https://github.com/mrodrig/json-2-csv/wiki/FAQ)

## Features
* Header Generation (per document keys)
* Allows for conversion of specific keys in both json2csv and csv2json via the options.keys parameter (as of 1.1.2)
* Document schema verification functionality (field order is irrelevant) (as of 1.1.0)
* Supports sub-documents natively
* Supports arrays as document values for both json2csv and csv2json
* Custom ordering of columns (see F.A.Q. for more information)
* Ability to re-generate the JSON documents that were used to generate the CSV (including nested documents)
* Allows for custom field delimiters, end of line delimiters, etc.
* Wrapped value support for json2csv and csv2json (as of 1.3.0)
* Support for multiple different schemas (as of 1.4.0)
* Promisified versions of the functions are now available by default: json2csvAsync, csv2jsonAsync (as of 2.2.0)
* RFC 4180 Compliance (as of 3.0.0)
* CLI functionality (as of 3.0.0)
	* `csv2json test.csv -o output.json`
	* *and*
	* `json2csv test.json -o output.csv -W -k arrayOfStrings -o output.csv`
* Empty field value option (as of 3.1.0)
* TypeScript typings included (as of 3.4.0) - thanks to [@GabrielCastro](https://github.com/GabrielCastro)!
