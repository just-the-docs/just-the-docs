# Color-diff
[![Build Status](https://travis-ci.org/markusn/color-diff.png)](https://travis-ci.org/markusn/color-diff)
[![Coverage Status](https://coveralls.io/repos/markusn/color-diff/badge.png?branch=master)](https://coveralls.io/r/markusn/color-diff?branch=master)

Implemets the CIEDE2000 color difference algorithm, conversion between RGB and LAB color and mapping all colors in palette X to the closest color in palette Y based on the CIEDE2000 difference.

## Installation

```bash
npm install color-diff --save
```

## Tests

Are located in the `test/` folder and are run by:

	npm test


## Usage

```js
var diff = require('color-diff');
```

### diff.closest(color, palette)

Returns the closest color.

```js
var color = { R: 255, G: 1, B: 30 };
// red, green, blue
var palette = [ {R: 255, G: 0, B: 0 }, {R: 0, G: 255, B: 0 }, {R: 0, G: 0, B: 255} ];

diff.closest(color, palette); // {R: 255, G: 0, B: 0 }, red
```

The result above is obvious, but `diff.closest` could deal with more complicated cases.

### diff.furthest(color, palette)

Returns the most different color.

```js
var color = { R: 255, G: 255, B: 255 };
// black, white
var palette = [ {R: 0, G: 0, B: 0 }, {R: 255, G: 255, B: 255 } ];

diff.furthest(color, palette); // {R: 0, G: 0, B: 0 }, black
```

The result above is obvious, but `diff.furthest` could deal with more complicated cases.


#### color
`Object`

`color` is an object containing 3 properties: 'R', 'G', 'B', such as:

```js
{ R: 255, G: 1, B: 0 }
```

#### palette

`Array.<Object>`

Color palette array which contains many `color`-like objects.


## Author
Markus Ekholm

## License
3-clause BSD. For details see `COPYING`.
