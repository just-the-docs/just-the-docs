Synesthesia
===========
[![NPM version](https://badge.fury.io/js/synesthesia.svg)](http://badge.fury.io/js/synesthesia)
[![Build Status](https://travis-ci.org/Munter/synesthesia.svg?branch=master)](https://travis-ci.org/Munter/synesthesia)
[![Coverage Status](https://coveralls.io/repos/Munter/synesthesia/badge.svg?style=flat)](https://coveralls.io/r/Munter/synesthesia)
[![Dependency Status](https://david-dm.org/Munter/synesthesia.svg)](https://david-dm.org/Munter/synesthesia)

A collection og regular expressions to find occurences of valid color syntaxes.

It can match hex syntaxes, rgb, rgba, hsv, hsva, hsl, hsla and CSS color names.

Usage
-----

Consider the following setup:

``` javascript
// Let's get some color in here
var colorString = [
    'red green blue',
    '#FF0000 #00FF00 #0000FF',
    '#F00 #0F0 #00F',
    'rgb(255, 0, 0) rgb(0, 255, 0), rgb(0, 0, 255)',
    'rgba(255, 0, 0, 0.5) rgba(0, 255, 0, 0.5), rgba(0, 0, 255, 0.5)',
    'hsv(0, 100%, 100%) hsv(120, 100%, 100%) hsv(240, 100%, 100%)',
    'hsva(0, 100%, 100%, 0.5) hsva(120, 100%, 100%, 0.5) hsva(240, 100%, 100%, 0.5)',
    'hsl(0, 100%, 100%) hsl(120, 100%, 100%) hsl(240, 100%, 100%)',
    'hsla(0, 100%, 100%, 0.5) hsla(120, 100%, 100%, 0.5) hsla(240, 100%, 100%, 0.5)'
].join(', ');

var synesthesia = require('synesthesia');
```

##### Hex color matching:

``` javascript
colorString.match(synesthesia.hex);

[ '#FF0000',
  '#00FF00',
  '#0000FF',
  '#F00',
  '#0F0',
  '#00F' ]
```

##### RGB color matching:

``` javascript
colorString.match(synesthesia.rgb);

[ 'rgb(255, 0, 0)',
  'rgb(0, 255, 0)',
  'rgb(0, 0, 255)' ]
```

##### RGBA color matching:

``` javascript
colorString.match(synesthesia.rgba);

[ 'rgba(255, 0, 0, 0.5)',
  'rgba(0, 255, 0, 0.5)',
  'rgba(0, 0, 255, 0.5)' ]
```

##### HSV color matching:

``` javascript
colorString.match(synesthesia.hsv);

[ 'hsv(0, 100%, 100%)',
  'hsv(120, 100%, 100%)',
  'hsv(240, 100%, 100%)' ]
```

##### HSVA color matching:

``` javascript
colorString.match(synesthesia.hsva);

[ 'hsva(0, 100%, 100%, 0.5)',
  'hsva(120, 100%, 100%, 0.5)',
  'hsva(240, 100%, 100%, 0.5)' ]
```

##### HSL color matching:

``` javascript
colorString.match(synesthesia.hsl);

[ 'hsl(0, 100%, 100%)',
  'hsl(120, 100%, 100%)',
  'hsl(240, 100%, 100%)' ]
```

##### HSLA color matching:

``` javascript
colorString.match(synesthesia.hsla);

[ 'hsla(0, 100%, 100%, 0.5)',
  'hsla(120, 100%, 100%, 0.5)',
  'hsla(240, 100%, 100%, 0.5)' ]
```

##### CSS color names matching:

``` javascript
colorString.match(synesthesia.names);

[ 'red', 'green', 'blue' ]
```

##### And now all together:

``` javascript
colorString.match(synesthesia.all);

[ 'red',
  'green',
  'blue',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#F00',
  '#0F0',
  '#00F',
  'rgb(255, 0, 0)',
  'rgb(0, 255, 0)',
  'rgb(0, 0, 255)',
  'rgba(255, 0, 0, 0.5)',
  'rgba(0, 255, 0, 0.5)',
  'rgba(0, 0, 255, 0.5)',
  'hsv(0, 100%, 100%)',
  'hsv(120, 100%, 100%)',
  'hsv(240, 100%, 100%)',
  'hsva(0, 100%, 100%, 0.5)',
  'hsva(120, 100%, 100%, 0.5)',
  'hsva(240, 100%, 100%, 0.5)',
  'hsl(0, 100%, 100%)',
  'hsl(120, 100%, 100%)',
  'hsl(240, 100%, 100%)',
  'hsla(0, 100%, 100%, 0.5)',
  'hsla(120, 100%, 100%, 0.5)',
  'hsla(240, 100%, 100%, 0.5)' ]
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
