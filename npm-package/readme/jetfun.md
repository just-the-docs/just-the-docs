# jetfun
**Convert JSON expressions to functions**

This node.js package is used to convert a JavaScript object into a function. Although this package supports a wide variety of use-cases, it was originally intended to allow a browser to send a complex operation to a web server as a single JSON expression.

## jetfun(*expression*) &#8594; function
Below is a simple example of converting a greeting object into a function. Once converted, the object can be bound to, or called against, any Object exposing the desired methods.

``` javascript
var jetfun = require('jetfun');

function English() { }

// greet someone in English
English.prototype.greet = function(e) {
  if (e.sex === 'male') {
    console.log('Hello Mr. ' + e.greet);
  }
  else {
    console.log('Hello Mrs. ' + e.greet);
  }
};

function Spanish() { }

// greet someone in Spanish
Spanish.prototype.greet = function(e) {
  if (e.sex === 'male') {
    console.log('Hola Señor ' + e.greet);
  }
  else {
    console.log('Hola Señora ' + e.greet);
  }
};

// convert the JSON expression to a function
var greetChris = jetfun({
  greet: 'Chris',
  sex: 'male'
});

greetChris.call(new English());
// => Hello Mr. Chris

greetChris.call(new Spanish());
// => Hola Señor Chris
```

## handler(*expression*, *value*, [*callback*])
The handler function that is invoked must take the `expression` as the first argument. If the `length` property of the handler function is greater than two, then the `callback` must be called; otherwise, the function resolves to the return value of the handler function. The return value is assumed to be a promise if it has a `then` method.

Below is an example demonstrating each form of handler function and how they operate.

``` javascript
var jetfun = require('jetfun'),
    when = require('when');

function Calculator() { }

Calculator.prototype.clear = function() {
  return 0; // return a value
};

Calculator.prototype.add = function(e, value, callback) {
  callback(null, value + e.add); // callback with a value
};

Calculator.prototype.substract = function(e, value) {
  return when(value - e.substract); // return a promise
};

var fun = jetfun({
  do: [
    { clear: null },
    { add: 3 },
    { subtract: 1 }
  ]
});

fun.call(new Calculator(), function(err, value) {
  console.log(value); // => 2
});
```
