# LUNCHPAD

Lunchpad is a interface for the [Novation Launchpad Mini](https://www.thomann.de/de/novation_launchpad_mini_mk2.htm).

<p>
  <img src="https://www.thomann.de/thumb/thumb220x170/pics/prod/366212.jpg" width="250" />
</p>

Lunchpad runs in the browser and on node.js.

## installation

````
npm install lunchpad
````

### dependencies

If you are running this module on node.js, you'll need the additional midi dependency:

````
npm install midi
````

## invocation

### node / browser

````javascript
const launchpad = require('lunchpad')
const Color = launchpad.Color

launchpad.initialize().then(interface =>  {
    //set the color of the coordinate 0/0 (bottom left) to the color Amber
    interface.setSquare(0, 0, Color.getColor(3, 3))

    //register an event handler that will trigger whenever one of the square buttons is pressed
    interface.on('input', (x, y) => console.log(x, y))
}, error => console.log(error))
````