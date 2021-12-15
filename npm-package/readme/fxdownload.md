# fxdownload

downloads and extracts forex data (by minute) from forexite.com

[![build status](https://secure.travis-ci.org/witwit/fxdownload.png)](http://travis-ci.org/witwit/fxdownload)

## Installation

This module is installed via npm:

``` bash
$ npm install fxdownload
```

## Example Usage

``` js
var fxdownload = require('fxdownload');

fxdownload.getDateForex({
    date :              new Date(2011, 9+1, 10),   // 9+1 = 11th month = November
    dir :               "./zip",
    clean :             true,
    parse :             true,
    onRecordParsed :    function(rec) {},
    onAllRecordsParsed: function(recs) {
        console.log(recs.length);
        console.log(recs[0]);
    }
});
```

This would give us
```
37705
{ ticker: 'EURUSD',
  date: '20111110',
  time: '000100',
  open: '1.3522',
  high: '1.3529',
  low: '1.3522',
  close: '1.3528' }
```