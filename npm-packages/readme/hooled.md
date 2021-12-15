# HooLED

Node.js Raspberry Pi library for the [APA102C](https://www.adafruit.com/product/2240) LED strip

## Requirements

- Raspberry Pi w/ 40 pin layout
- APA102C LED Strip ([mine](https://www.adafruit.com/product/2240))
- F to M Jumper Wires ([mine](https://www.adafruit.com/product/826))
- 5V 2A Power Supply ([mine](https://www.adafruit.com/product/276))
- F DC Power Adapter ([mine](https://www.adafruit.com/product/368))

I'm a wimp so no soldering required...

### Wiring

- Red Wire (5V+) -> Adapter +
- Yellow Wire (CI) -> BCM 11/SCLK (23)
- Green Wire (DI) -> BCM 10/MOSI (19)
- Black Wire (GND) -> Adapter -
- Black Wire (GND) -> Ground (25)

Pin numbers according to https://pinout.xyz/

Still confused? [Look at how I wired it up.](https://i.imgur.com/XvQiRxA.jpg)

## Installation

On your Pi, install Node.js and install HooLED in your directory.
```shell
$ npm i hooled
```

## Usage

**IMPORTANT: After using the set functions, you must run `strip.write()` to actually write to the LED strip.**

If you have trouble initializing the library, you may need to **run your code using `sudo`**.

### Initialize HooLED

```javascript
var Controller = require('hooled')
var strip = new Controller(numberOfPixels[, clockRate])
```

- numberOfPixels - The number of pixels on your LED strip.
- clockRate `optional` - The SPI clock (default of 128).

#### Example

```javascript
// Initialize a strip with 60 pixels.

var Controller = require('hooled')
var strip = new Controller(60)
```

### Set entire strip to RGB value

```javascript
strip.set(red, green, blue)
```

- red, green, blue - values [`0-255`]

#### Example

```javascript
// Set the entire strip to red.

strip.set(255, 0, 0)
strip.write()
```

### Set entire strip to hex value

```javascript
strip.setHex(hexString)
```

- hexString - color code [`#000000-#ffffff`] (`#` is optional)

#### Example

```javascript
// Set the entire strip to blue.

strip.setHex('#0000ff')
strip.write()
```

### Set a pixel to RGB value

```javascript
strip.setPixel(index, red, green, blue)
```

- index - Zero-based position of pixel on LED strip.
- red, green, blue - values [`0-255`]

#### Example

```javascript
// Set the first pixel to green.

strip.setPixel(0, 0, 255, 0)
strip.write()
```

### Set a pixel to hex value

```javascript
strip.setPixelHex(index, hexString)
```

- index - Zero-based position of pixel on LED strip.
- hexString - color code [`#000000-#ffffff`] (`#` is optional)

#### Example

```javascript
// Set the first pixel to yellow.

strip.setPixelHex(0, '#ffff00')
strip.write()
```

### Write to the LED strip

```javascript
strip.write()
```

### Clear LED strip

```javascript
strip.clear()
strip.write()
```

## Thanks

This library is a modified version of [Jonathan Page's](https://github.com/jonnypage) [hooloovoo library](https://github.com/jonnypage-d3/hooloovoo).

Special thanks to [James DeVito](https://github.com/jmzjmzjmz) for hooking me up with the shopping list.