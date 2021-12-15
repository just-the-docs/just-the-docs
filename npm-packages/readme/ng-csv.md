ngCsv - Export to CSV using AngularJS
======

An AngularJS simple directive that turns arrays and objects into downloadable CSV files,

[![Build Status](https://travis-ci.org/asafdav/ng-csv.svg?branch=master)](https://travis-ci.org/asafdav/ng-csv)

## Dependencies
* angular.js (of course!), any version starting with 1
* angular-sanitize.js, any version starting with 1


## How to get it ?

#### Manual Download
Download the from [here](https://github.com/asafdav/ng-csv/releases)

#### Bower
```
bower install ng-csv
```

#### Npm
```
npm install ng-csv
```

#### CDN
ng-csv is available at [cdnjs](http://www.cdnjs.com/libraries/ng-csv)


## Usage
1. Add ng-csv.min.js to your main file (index.html).
please also make sure you're adding angular-sanitize.min.js.

2. Set `ngCsv` as a dependency in your module
  ```javascript
  var myapp = angular.module('myapp', ['ngSanitize', 'ngCsv'])
  ```

3. Add ng-csv directive to the wanted element, example:
  ```html
  <button type="button" ng-csv="getArray" filename="test.csv">Export</button>
  ```

ngCsv attributes
----------------
* ng-csv: The data array - Could be an expression, a value or a promise.
* filename: The filename that will be stored on the user's computer
* csv-header: If provided, would use this attribute to create a header row

    ```html
  <button type="button" ng-csv="getArray" csv-header="['Field A', 'Field B', 'Field C']" filename="test.csv">Export</button>
  ```

* csv-column-order: Defines the column order to be set when creating the body of the CSV (may be according to the csv-headers) - use it when you have an array of objects.
* field-separator: Defines the field separator character (default is ,)
* decimal-separator: Defines the decimal separator character (default is .). If set to "locale", it uses the [language sensitive representation of the number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString).
* text-delimiter: If provided, will use this characters to "escape" fields, otherwise will use double quotes as deafult
* quote-strings: If provided, will force escaping of every string field.
* lazy-load: If defined and set to true, ngCsv will generate the data string only on demand. See the lazy_load example for more details.
* add-bom: Add the Byte Order Mark, use this option if you are getting an unexpected char when opening the file on any windows App.
* charset: Defines the charset of the downloadable Csv file. Default is "utf-8".
* csv-label: Defines whether or not using keys as csv column value (default is false).

## Examples
You can check out this live example here: https://asafdav.github.io/ng-csv/example/

For lazy load example using promises see this example: https://asafdav.github.io/ng-csv/example/lazy_load.html

Supported Browsers
------------------
| Browser         | Filenames     |
| --------------- | ------------- |
| Firefox 20+     | Yes           |
| Chrome 14+      | Yes           |
| Safari          | No            |
| IE 10+          | Yes           |

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/asafdav/ng-csv/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

