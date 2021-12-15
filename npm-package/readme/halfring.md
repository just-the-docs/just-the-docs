![HalfRing Logo](./logo.png)

# HalfRing
Draw half ring with canvas which is quite true to the original.

* [效果预览](https://zwf193071.github.io/halfring)

# Installation
```
npm install halfring -g

```

# Usage
With a canvas like that:
```
<canvas id="canvas" width="800" height="800"></canvas>

```
You can draw a half ring with the code below:
```
  const HalfRing = require('halfring')
  const ring = new HalfRing({
    canvas: 'canvas', // The id of canvas
    percent: 90 // The percentage of the inner ring
  })
  ring.drawRing() // draw the moving ring

```

# License
MIT.









