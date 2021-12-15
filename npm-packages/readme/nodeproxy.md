# nodeproxy
A port of the [jQuery](http://api.jquery.com/jQuery.proxy/) proxy functionality to NodeJS.

### Installation
The easiest way to install is through the Node Package Manager ([NPM](http://npmjs.org/)):

``` js
npm install nodeproxy
```

### Usage
``` js 
var nodeproxy = require('nodeproxy');

function ObjectOne(){
	function helloWorld(){
		console.log("Hello " + this.name);
	}
	return {
		helloWorld: helloWorld
	}
}

function ObjectTwo(){
	function init(){
		var contextObject = { name: 'iain' };
		var objectOne = new ObjectOne();
		nodeproxy(objectOne.helloWorld, contextObject)();
	}
	return {
		init: init
	}
}

var objectTwo = new ObjectTwo();
objectTwo.init();
//Console will display..
//Hello iain
```

