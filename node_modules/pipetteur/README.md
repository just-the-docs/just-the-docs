Pipetteur
=========
[![NPM version](https://badge.fury.io/js/pipetteur.svg)](http://badge.fury.io/js/pipetteur)
[![Build Status](https://travis-ci.org/Munter/pipetteur.svg?branch=master)](https://travis-ci.org/Munter/pipetteur)
[![Coverage Status](https://coveralls.io/repos/Munter/pipetteur/badge.svg?style=flat)](https://coveralls.io/r/Munter/pipetteur)
[![Dependency Status](https://david-dm.org/Munter/pipetteur.svg)](https://david-dm.org/Munter/pipetteur)

A module to find all color syntax substrings in a string with their offsets and their color instance.
It's an automated eyedropper tool for your text, css, html, svg etc.

It takes a single string argument and returns an array of objects like this:

``` javascript
{
    match: '#FF0000', // The found color match
    index: 0, // Zero based index of the match in the string
    line: 1, // 1-based line number
    column: 1, // 1-based column number
    color: <one-color>
}
```

The color object returned is an instance of [one-color](https://github.com/One-com/one-color/#usage), giving you instant access to highlevel color manipulation without having to think about color space conversions.


Usage
-----

``` javascript
var pipetteur = require('pipetteur');

pipetteur('Roses are rgb(255,0,0), violet are #00f');

[ { index: 10,
    line: 1,
    column: 11,
    match: 'rgb(255,0,0)',
    color:
     { _red: 1,
       _green: 0,
       _blue: 0,
       _alpha: 1 } },
  { index: 24,
    line: 1,
    column: 25,
    match: 'violet',
    color:
     { _red: 0.9333333333333333,
       _green: 0.5098039215686274,
       _blue: 0.9333333333333333,
       _alpha: 1 } },
  { index: 35,
    line: 1,
    column: 36,
    match: '#00f',
    color:
     { _red: 0,
       _green: 0,
       _blue: 1,
       _alpha: 1 } } ]
```


License
-------

The MIT License (MIT)

Copyright (c) 2014 Peter Müller <munter@fumle.dk>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
