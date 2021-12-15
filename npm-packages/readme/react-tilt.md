# React.js - Tilt.js

![Travis CI](https://travis-ci.org/jonathandion/react-tilt.svg?branch=master)


![react-tilt demo gif](https://github.com/jonathandion/react-tilt/blob/master/demo.gif)

React version of [tilt.js](https://github.com/gijsroge/tilt.js)

### Demo
https://vx-demo.now.sh/gallery

## Install
- **yarn:** `yarn add react-tilt`
- **npm:** `npm install --save react-tilt`


## Usage
```js
import Tilt from 'react-tilt'

<Tilt className="Tilt" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
 <div className="Tilt-inner"> 👽 </div>
</Tilt>
```

## Options
```js
{
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,      // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,    // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}
```

## API

| Property        | Signature           | 
| ------------- |:-------------:|
| onMouseEnter     | () -> SyntheticEvent |
| onMouseMove      | () -> SyntheticEvent      |
| onMouseLeave | () -> SyntheticEvent     |
| options | Object    |


## Roadmap
- Tests
- Add Flare effect

## Alternatives
- **JQuery JS version:** https://github.com/gijsroge/tilt.js
- **Vanilla JS version:** https://github.com/micku7zu/vanilla-tilt.js

