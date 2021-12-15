# Vodal [![Dependency Status](https://david-dm.org/chenjiahan/rodal.svg?style=flat-square)](https://david-dm.org/chenjiahan/vodal) [![NPM downloads](http://img.shields.io/npm/dm/rodal.svg?style=flat-square)](https://npmjs.org/package/vodal)
A vue modal with animations.
[Example](http://rodal.cn)

## Installation    

    npm i -S vodal
    
## Usage
``` xml
<vodal :show="show" animation="rotate" @hide="show = false">
    <div>A vue modal with animations.</div>
</vodal>
```

``` javascript
import Vue from 'vue';
import Vodal from 'vodal';

Vue.component(Vodal.name, Vodal);

export default {
  name: 'app',
    
  data() {
    return {
      show: false
    }
  }
}
```

``` sass
// include animation styles
@import "vodal/common.css";
@import "vodal/rotate.css";
```

## Props

Property|Type|Default|Description
---|---|---|---
width|number|400|width of dialog
height|number|240|height of dialog
measure|string|px|measure of width and height
show|bool|false|whether to show dialog
mask|bool|true|whether to show mask
closeButton|bool|true|whether to show close button
closeOnEsc|bool|false|whether close dialog when esc pressed
closeOnClickMask|bool|true|whether close dialog when mask clicked
animation|string|zoom|animation type
duration|number|300|animation duration
className|string|/|className for the container
customStyles|object|/|custom dialog styles
customMaskStyles|object|/|custom mask styles

## Event
Name|Description
---|---
hide|triggers when dialog will hide
clickMask|triggers when mask clicked

## Animation Types
* zoom
* fade
* flip
* door
* rotate
* slideUp
* slideDown
* slideLeft
* slideRight

## Other
[React version](https://github.com/chenjiahan/rodal)

