![ConboJS](https://raw.githubusercontent.com/mesmotronic/conbo/master/img/conbo.png)

ConboJS is the best JavaScript MVx framework you've never heard of.

It is a lightweight application framework that enables developers a take a structured, decoupled, event-driven approach to application development, in a way that should be familiar to anyone with experience of languages like ActionScript/Flex, C#/XAML or Java.

Featuring dependency injection, event bus, data binding and command pattern, supported by an easy to use event model and optional ES2015/TypeScript decorators, ConboJS provides everything you need to start building responsive single page applications (SPA), widgets and media players.

It can be used stand-alone, or as a fantastic way to add models, commands and services to projects using third party view frameworks like [React](https://github.com/mesmotronic/conbo-example-react), [Phaser](https://github.com/mesmotronic/conbo-example-phaser), [D3](https://www.d3js.org/) and [three.js](https://www.threejs.org), or server-side applications using Node.js.

ConboJS requires no special IDEs, compilers or transpilers, it just makes JavaScript nicer. So at less than 20KB minified and gzipped, what's not to like?

Browser support
---------------

ConboJS supports all modern browsers, including Firefox, Chrome (desktop and Android), Safari (desktop and iOS) and Edge... and Internet Explorer 11 (for now).

Class based
-----------

There's no messing around with prototypes in ConboJS, all of your classes simply extend from another, for example:

**ES2015 / TypeScript**

```javascript
import { Class } from 'conbo';

class MyClass extends Class
{
	initialize()
	{
		console.log('Welcome to my class!');
	}
}
```

**ES5**

```javascript
var MyClass = conbo.Class.extend
({
	initialize: function()
	{
		console.log('Welcome to my class!');
	}
});
```

Supports ES2015, TypeScript, AMD and CommonJS modules
-----------------------------------------------------

If you're using ES2015, TypeScript, AMD or CommonJS modules, it's easy to enable all of your Application and View classes to take advantage of ConboJS features like auto instantiation and data binding:

```javascript
// ES2015 & TypeScript Decorator

import { Application, Viewable } from 'conbo';

@Viewable()
export class FooApp extends Application { ... }
```

```javascript
// ES2015 & TypeScript

import * as conbo from 'conbo';
import FooApp from './FooApp';
import BarView from './BarView';

conbo().import({ FooApp, BarView });
```

```javascript
// AMD

define(['conbo', 'FooApp', 'BarView'], function(conbo, FooApp, BarView) 
{
	conbo().import({ FooApp, BarView });
};
```

```javascript
// CommonJS

var conbo = require('conbo');
var FooApp = require('./FooApp');
var BarView = require('./BarView');

conbo().import({ FooApp, BarView });
```

Dependency injection
--------------------

Once mapped in your application's `Context`, dependency injection occurs automatically under most circumstances, all you need to do is declare the properties and ConboJS takes care of the rest:

```javascript
class MyContext extends Context
{
	initialize()
	{
		this.mapSingleton('myModel', MyModel);
		this.mapSingleton('myService', MyService);
	}
}

class MyApp extends Application
{
	declarations()
	{
		this.contextClass = MyContext;
	}
}

// ES2015
class MyView extends View
{
	declarations()
	{
		this.myModel = undefined;
		this.myService = undefined;
	}
}

// TypeScript
class MyView extends View
{
	@Inject public myModel:MyModel;
	@Inject public myService:MyService;
}
```

However, there may be occassions when you want to inject properties into a non-ConboJS class (for example if you're not using ConboJS views) or access singletons outside of the normal flow of your application:

```javascript
// Inject a non-ConboJS class
class MyClass
{
	constructor(context)
	{
		this.myModel = undefined;
		this.myService = undefined;

		context.inject(this);
	}
}

// Arbitrary access
const { myModel, myService } = context.inject({}, 'myModel', 'myService');
```


Pseudo-interfaces
-----------------

With ConboJS, it's easy to test whether an object conforms to an interface.

Developers can perform a strict comparison against an interface by creating an object that specifies the class of each property, or `undefined` for any:

```javascript
var IPerson = { name: String, age: Number };
var person = { name: "Foo", age: 69 };

conbo.is(person, IPerson); // true
```

Alternatively, to enable developers to add and test for functionality that is not included in the prototype chain, interfaces in ConboJS can contain default functionality, which will be used if the class has not implemented the interface in full, and then perform a shallow comparison (property names only), for example:

```javascript
var ILogger = { logSomething: function() { conbo.log('Something!'); } };
var logger = Object.assign(new MyOtherClass(), ILogger);

conbo.is(logger, ILogger, false); // true

logger.logSomething(); // Outputs: "Something!"
```

In this example, a shallow comparison is used, verifying that the expected properties are present, but ignoring their values. Pre-populating a method with `conbo.notImplemented` will ensure that it throws an error when called but not implemented in a class instance.


Decoupling & data binding
-------------------------

One of ConboJS's core aims is to enable developers to create highly decoupled, testable code.

To this end, the framework's ever expanding data binding features enable you to separate your HTML from your JavaScript, removing the need for direct references between the them using `cb-*` and custom, developer defined, attributes to automatically bind properties and events in the DOM to your View classes.

In addition, any existing HTML attribute can be bound to a property or function simply by prefixing it with `cb-`, for example `cb-title="myTitle"` or `cb-onclick="myClickHandler"`.

For example:

**In your View class**

```javascript
import { View } from 'conbo';

class MyView extends View
{
	declarations()
	{
		this.myButtonLabel = 'Click me!';
	}
	
	myClickHandler(event)
	{
		alert('You clicked a button!');
	}
}
```

**In your HTML**

```html
<div cb-view="MyView">
	<button cb-onclick="myClickHandler" cb-text="myButtonLabel"></button>
</div>
```

If you prefer, this could also be written using a custom tag (your `Application`, `View` or `Glimpse` class name in kebab-case) and curly brackets:

```html
<my-view>
	<button cb-onclick="myClickHandler">{{myButtonLabel}}</button>
</my-view>
```

Consistent, scoped events
-------------------------

With ConboJS you don't have to remember how many arguments each event handler should have or the order they're supposed to be in, because there's a single, consistent DOM-like event model that offers predictable results.

All events fired by the framework are `ConboEvent` event objects, and you can easily create events of your own by using or extending the `Event` class, for example:

```javascript
import { Event } from 'conbo';

foo.addEventListener('myEvent', this.myFunction);
foo.dispatchEvent(new Event('myEvent'));
```

Decorators
----------

ConboJS provides a number of class (ES2015 and TypeScript) and property (TypeScript only) decorators to resolve transpilation issues, simplify, enhance or simply provide syntactical sugar while developing applications:

```javascript
import { Application, Bindable, Inject, Viewable } from 'conbo';

// The Viewable decorator enables ConboJS to automatically instantiate views
@Viewable('MyApp')
class MyApp extends Application
{
	// Mark a property as injectable so you don't have to set it to undefined in declarations (TypeScript only)
	@Inject
	public myService:MyService;
	
	// Mark a property as bindable so you don't have to set it in declarations (TypeScript only)
	@Bindable
	public myValue:string = 'Hello, World!';
}
```

Modular namespace declarations
------------------------------

For developers still using ES5 syntax, ConboJS brings the familiar concepts of packages and imports to JavaScript in the form of modular namespaces, optimised to work as an alternative to the commonly used minification pattern, for example:

```javascript
// Utils.js
conbo('com.example.utils', console, function(console)
{
	var utils = this;
	
	utils.doSomething = function(value)
	{
		console.log(value);
	};
});

// Constants.js
conbo('com.example.constants', function()
{
	var constants = this;

	constants.BEST_FRAMEWORK = 'ConboJS';
	constants.SMILE = ':-)';
});

// Main.js
conbo('com.example.app', window, document, navigator, function(window, document, navigator, undefined)
{
	// Import data from other namespaces
	var constants = conbo('com.example.constants');
	var utils = conbo('com.example.utils');
	
	utils.doSomething(constants.BEST_FRAMEWORK+' makes me '+constants.SMILE);
});
```

Naming conventions
------------------

The naming conventions used by ConboJS should be familiar to anyone who uses JavaScript or ActionScript on a regular basis:

* `ClassNames` are camel case with an initial capital letter
* `IInterfaceNames` are camel case with an initial capital letter, prefixed with a capital I
* `publicPropertyAndMethodNames` are camel case, starting with a lower case letter
* `_privatePropertyAndMethodNames` are user defined properties and methods used within the current class only, prefixed with an underscore
* `__internalPropertyAndMethodNames` are prefixed with a double underscore to indicate that they are for internal use by the framework only
* `CONSTANT_VALUES` are all upper case, with words separated using an underscore
* `@Decorators` are camel case with an initial capital letter, following the naming convention used for similar metadata and annotations in other languages

Wherever possible, file names should match their contents, for example `ClassName.js`, `methodName.js` or `IInterfaceName.ts`.

Builds
------

**conbo.js** (<20KB minified+gzipped): Includes everything you need to start building your next JavaScript application, including HttpService, RemoteHash and RemoteList classes for working with web services, and History and Router classes for browser integration.

Builds are created using Grunt, which requires Node.js; all required modules can be installed by running `npm install` from the command line in the project folder.

You can create a new build from the CLI using `grunt`. Use `grunt watch`, or run `watch.cmd` (Windows) or `./watch.sh` (Mac, Linux) to auto-build as you edit.

License
-------

ConboJS is released under MIT license.

**GitHub** https://github.com/mesmotronic/conbo

**Docs** https://conbo.mesmotronic.com/

Make a donation
---------------

If you find this project useful, why not buy us a coffee (or as many as you think it's worth)?

[![Make a donation](https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif)](http://bit.ly/2GHiK2T)
