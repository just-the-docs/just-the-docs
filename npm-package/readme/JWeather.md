# JWeather
![JWeather.js version](https://img.shields.io/badge/Version-v1.0-brightgreen.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![PayPal Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.me/IvanSotelo/10)

A jQuery plugin used to display the current weather of any city using Yahoo-Weather. Visit www.deskode.com

## Getting started

As you can see in the example files, you will need to include:

- [jQuery library](http://jquery.com/). (1.6.0 minimum)

- The JavaScript file `jweather.js` (or its minified version `jweather.min.js`)

- The css file `jweather.css`

### Install using bower or npm
**Optionally**, you can install jweather.js with bower or npm if you prefer:

Terminal:
```shell
// With bower
bower install JWeather

// With npm
npm install jweather
```

### Including files:
```html
<!-- include jweather.css and copy the font folder to one folder above your /css folder -->
<link rel="stylesheet" type="text/css" href="jweather.css" />
<!-- include a copy of jquery (if you haven't already) -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>   
<!-- include jweather -->
<script type="text/javascript" src="jweather.js"></script>
```

### Required HTML structure
Have a target for where you want it shown
```html
<div id="example">
</div>
```

### Initialization
All you need to do is call JWeather.js inside a `$(document).ready` function:

```javascript
$(document).ready(function() {
    var example = $("#example").jweather({
	  location: "Nuevo Casas Grandes, CH", //city and region *required
	});
});
```
### Configuration Options
JWeather provides some options that allow customization of the plugin's functionality. The default options are overridden by passing an object into the jweather function.

| Option           | Values                             | Default                   | Description               |
| ---------------- | ---------------------------------- | ------------------------- | ------------------------- |
| `location`       | `City, State`                      | `Nuevo Casas Grandes, CH` | city and region *required |
| `view`           | `simple`,`today`,`forecast`,`full` | `full`                    | there are plenty of display options that will let you customize the widget for your particular application |
| `forecast`       | `0-5`                              | `5`                       | how many days you want forecast |
| `render`         | `true` or `false`                  | `true`                    | if you want plugin to generate markup |
| `units`          | `metric` or `imperial`             | `metric`                  | force metric units |
| `language`       | `español`,`italiano`,`français`,`deutsch`,`english`| `english` | change the language |

Example usage:

```javascript
$(document).ready(function() {
  var example = $("#example").jweather({
  location: "Nuevo Casas Grandes, CH", //city and region *required
  view : "today", //default: full (partial, full, simple, today or forecast)
  forecast: 4, //default: 5 (0 -5) how many days you want forecast
  render: true, //default: true (true/false) if you want plugin to generate markup
  units : "metric",
  language : "español",
  });
});
```

## Views Configuration

### Full

```javascript
$(document).ready(function() {
  var example1 = $("#example-1").jweather({
	   location: "Waterloo, ON",
  });
});
```

### Simple

```javascript
$(document).ready(function() {
  var example2 = $("#example-2").jweather({
  	location: "Toronto, ON",
  	view : "simple"
  });
});
```
### Today

```javascript
$(document).ready(function() {
  var example3 = $("#example-3").jweather({
  	location: "Toronto, ON",
  	view : "today"
  });
});
```

### Forecast

```javascript
$(document).ready(function() {
  var example4 = $("#example-4").jweather({
    location: "New York, NY",
    forecast: 3,
  	view : "forecast",
  	units : "imperial", //force imperial units
  });
});
```

### Render False

```javascript
$(document).ready(function() {
//for custom output call with render: false
var custom_example = $("#example-6").jweather({
	location: "London, UK",
	render : false //the plugin will not generate any markup
});

//then manually call 'fetchWeather' which returns a jquery promise
//when complete, result contains the weather data
custom_example.jweather('fetchWeather')
  .then(function(data){
    console.log(data);
    //you can then do whatever you want with the data
    //such as generate your own custom markup
    $("<h2/>", {"class" : "wi wi"+data.today.code})
      .text(" " + data.city)
      .appendTo(custom_example);
    $("<p/>").html(data.today.temp.now + "°C, " + data.today.desc )
      .appendTo(custom_example);
});

/* //Data object from fetchWeather looks like this:
{
  location : String, //as returned back from api
  today : {
  	temp : {
  		//temperatures are in units requested from api
  		now : Number, ex. 18
  		min : Number, ex. 24
  		max : Number ex. 12
  	},
  	desc : String, ex. "Partly Cloudy"
  	code : Number, ex. "801" used by css font, see css.
  	wind : {
  		speed : 4, //either km/h or mph
  		deg : Number, //direction in degrees from North
  	},
  	pressure : Number, //barometric pressure
  	humidity : Number, //% humidity
  	sunrise : Time,
  	sunset : Time,
  	day :  String,  

  },
  forecast : [
  //array
  	{
  		Day: String,
  		code:Number,
  		desc: String,
  		temp : {min:number, max:number}
  		}
  	]
}
*/
});
```

## Reporting issues
1. Please, look for your issue before asking using the github issues search.
2. Make sure you use the latest JWeather version. No support is provided for older versions.
3. Use the [the Github Issues forum](https://github.com/IvanSotelo/JWeather/issues) to create issues.

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/IvanSotelo/JWeather/releases).

## Donations
Donations would be more than welcome :)

[![Donate](https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif)](https://www.paypal.me/IvanSotelo/10)


## License

**The credit comments in the JavaScript and CSS files should be kept intact** (even after combination or minification )

(The MIT License)

Copyright (c) 2017 Ivan Sotelo

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
