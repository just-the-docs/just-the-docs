# tripcode

JavaScript implementation of 4chan's tripcode algorithm.

## Example

``` javascript
var tripcode = require('tripcode');

tripcode('f}EAmbA%');
// => '/izs/14Iuw'
```

There's even a `tripcode` command if you install globally!

``` bash
$ tripcode github is cool
#github => !lLf/rxkwgg
#is => !4CEimo5sKs
#cool => !QkO1sgFXdY
```

You can also pipe in a newline-delimited file:

``` bash
$ cat > codes.txt
github
is
cool

$ tripcode < codes.txt
#github => !lLf/rxkwgg
#is => !4CEimo5sKs
#cool => !QkO1sgFXdY
```

Or pipe out the tripcodes to `grep` or something to find specific tripcodes!

``` bash
$ tripcode < /usr/share/dict/words | grep -E '(/AhWyw3toI)'
#incognito => !/AhWyw3toI
```

## Installation

``` bash
$ npm install tripcode
```

Unless you want the `tripcode` command, in which case you gotta install
globally:

``` bash
$ npm install -g tripcode
```

## API

``` javascript
var tripcode = require('tripcode');
```

### tripcode(password)

Returns the tripcode generated from _String_ `password`.
