# Pattern matching in JavaScript

## Installation

```bash
npm install --save patjs
```

```bash
bower install --save pat
```

## Getting Started

```js
var pat = require("patjs");
```

```js
var pow = pat()
  .caseof(Number, 0, function() { return 1; })
  .caseof(Number, Number, function(x, y) { 
    return x * pow(x, y - 1 ); 
  });

expect(pow(3, 2)).to.eql(9);
```

## Dependencies

[Lo-Dash](http://lodash.com/)

([Underscore](http://underscorejs.org/) might work also, but I haven't tested it)

## Create a function which uses `pat`

### Syntax 1: Give function as a parameter to `pat`

```js
var one = function(n) { return n + " is one"; };
var notOne = function(n) { return n + " is not one"; };

var isOne = pat(notOne)
  .caseof(1, one);

expect(isOne(0)).to.eql("0 is not one");
expect(isOne(1)).to.eql("1 is one");
```

### Syntax 2: Otherwise

```js
var one = function(n) { return n + " is one"; };
var notOne = function(n) { return n + " is not one"; };

var isOne = pat()
  .caseof(1, one)
  .otherwise(notOne)

expect(isOne(0)).to.eql("0 is not one");
expect(isOne(1)).to.eql("1 is one");
```

### Match against primitive values

#### Numbers

```js
var one = function(n) { return n + " is one"; };
var notOne = function(n) { return n + " is not one"; };

var isOne = pat()
  .caseof(1, one)
  .otherwise(notOne)

expect(isOne(0)).to.eql("0 is not one");
expect(isOne(1)).to.eql("1 is one");
```

#### Strings

```js
var two = function(str) { return str + " is 2"; };
var notTwo = function(str) { return str + " is not 2"; };

var isTwo = pat()
  .caseof("two", two)
  .otherwise(notTwo)

expect(isTwo("one")).to.eql("one is not 2");
expect(isTwo("two")).to.eql("two is 2");
```

#### Booleans

```js
var theTrue = function(bool) { return bool + " is the truth"; };
var theFalse = function(bool) { return bool + " is not the truth"; };

var isTheTruth = pat()
  .caseof(true, theTrue)
  .otherwise(theFalse)

expect(isTheTruth(true)).to.eql("true is the truth");
expect(isTheTruth(false)).to.eql("false is not the truth");
```

### Match against arrays and objects

#### Arrays

```js
var arrayOneTwoThree = function(arr) { return "got array 1, 2, 3"; };
var somethingElse = function(x) { return "I don't regocnize " + x.join(", "); };

var isOneTwoThreeArray = pat()
  .caseof([1, 2, 3], arrayOneTwoThree)
  .otherwise(somethingElse);

expect(isOneTwoThreeArray([1, 1, 1])).to.eql("I don't regocnize 1, 1, 1");
expect(isOneTwoThreeArray([1, 2, 3])).to.eql("got array 1, 2, 3");
```

#### Nested arrays

```js
var matched = function(arr) { return "got points (1, 2), (3, 4)"; };
var somethingElse = function(x) { return "I don't regocnize " + x.join(", "); };

var isPoints2D = pat()
  .caseof([[1, 2], [3, 4]], matched)
  .otherwise(somethingElse);

expect(isPoints2D([[1, 1], [2, 2]])).to.eql("I don't regocnize 1,1, 2,2");
expect(isPoints2D([[1, 2], [3, 4]])).to.eql("got points (1, 2), (3, 4)");
```

#### Objects

```js
var fullName = function(person) { 
  return [person.firstName, person.lastName].join(" ");
};
var somethingElse = function(person) { 
  return ["I don't regocnize", person.firstName, person.lastName].join(" "); 
};

var printMikko = pat()
  .caseof({firstName: "Mikko", lastName: "Koski"}, fullName)
  .otherwise(somethingElse);

expect(printMikko({firstName: "John", lastName: "Doe"})).to.eql("I don't regocnize John Doe");
expect(printMikko({firstName: "Mikko", lastName: "Koski"})).to.eql("Mikko Koski");
```

### Matcher function

```js
var fullName = function(person) { 
  return [person.firstName, person.lastName].join(" ");
};
var somethingElse = function() { 
  return "Invalid person object";
};

function isPerson(obj) {
  var person = obj || {};
  return person.firstName && person.lastName;
}

var printAnyName = pat()
  .caseof(isPerson, fullName)
  .otherwise(somethingElse);

expect(printAnyName({firstName: "Mikko"})).to.eql("Invalid person object");
expect(printAnyName({firstName: "John", lastName: "Doe"})).to.eql("John Doe");
```

### Match against types

Use constructor functions `Number`, `String`, `Boolean`, `Array` and `Object` to match against function argument types

```js
var number = function(x) { return x + " is a number!" };
var somethingElse = function(x) { return x + " is not a number" };

var isNumber = pat()
  .caseof(Number, number)
  .otherwise(somethingElse);

expect(isNumber("hello")).to.eql("hello is not a number");
expect(isNumber(5)).to.eql("5 is a number!");
```

### Multiple arguments

The `caseof` function can take any number of arguments.

```js
var sum = function(a, b, c) { return a + b + c };
var somethingElse = function() { return "Invalid arguments" };

var sum3 = pat()
  .caseof(Number, Number, Number, sum)
  .otherwise(somethingElse);

expect(sum3(1, 2)).to.eql("Invalid arguments");
expect(sum3(1, 2, 3)).to.eql(6);
```

### Multiple cases

You can have any number of `caseof`s.

```js
var sumNumbers = function(a, b) { return a + b; };
var sumStrings = function(a, b) { return Number(a) + Number(b); };
var somethingElse = function() { return "Invalid arguments" };

var sum = pat()
  .caseof(Number, Number, sumNumbers)
  .caseof(String, String, sumStrings)
  .otherwise(somethingElse);

expect(sum(1, 2)).to.eql(3);
expect(sum("2", "3")).to.eql(5);
```

### Throws, if no match

```js
var sum2 = function(a, b) { return a + b; };

var sum = pat()
  .caseof(Number, Number, sum2);

expect(sum(3, 4)).to.eql(7);
expect(function() { sum(1); }).to.throwException();
```

### Any

`pat._` matches to anything.

```javascript
var print = function(a, _) { return "got number " + a + " and " + typeof _; };

var fn = pat()
  .caseof(Number, pat._, print)

expect(fn(3, 4)).to.eql("got number 3 and number");
expect(fn(1, true)).to.eql("got number 1 and boolean");
expect(function() { fn(2); }).to.throwException("throws");
```

### No arguments

```js
var noArguments = function() { return "Great! No arguments!"; };

var fn = pat()
  .caseof(noArguments)

expect(fn()).to.eql("Great! No arguments!");
expect(function() { fn(1); }).to.throwException("throws");
```

### Rest

`pat.rest()` matches to all the rest arguments and packs them to an array.

```js
var print = function(a, b, rest) { return "Got " + a + ", " + b + " and [" + rest.join(", ") + "]"; };

var fn = pat()
  .caseof(Number, Number, pat.rest(), print)

expect(fn(1, 2, 3, 4, "five")).to.eql("Got 1, 2 and [3, 4, five]");
expect(function() { fn(1); }).to.throwException("throws");
```

### Rest with type

`pat.rest()` can take type as an argument.

```js
var print = function(a, b, rest) { return "Got " + a + ", " + b + " and [" + rest.join(", ") + "]"; };

var fn = pat()
  .caseof(Number, Number, pat.rest(Number), print)

expect(fn(1, 2, 3, 4, 5)).to.eql("Got 1, 2 and [3, 4, 5]");
expect(function() { fn(1, 2, 3, 4, "five"); }).to.throwException();
```

### All at once

```javascript
var print = function(nums) { return "Sum " + nums.join(" + ") + " is even" };

function sumEven(args) {
  var sum = args.reduce(function(a, b) { return a + b; });
  return sum % 2 === 0;
}

var fn = pat().caseof(pat.all(sumEven), print)

expect(fn(1, 2, 3, 4)).to.eql("Sum 1 + 2 + 3 + 4 is even");
expect(function() { fn(1, 2, 3, 4, 5); }).to.throwException("throws");
```

### Matcher functions can modify the arguments

```js
var head = function(arr) {
  if(Array.isArray(arr)) {
    return pat.val(arr[0]);
  } else {
    return false;
  }
};

var print = function(x) { return "Head of an array is " + x};

var printFirst = pat()
  .caseof(head, print);

expect(printFirst([1, 2, 3, 4])).to.eql("Head of an array is 1");
```

### Nested patters

Use array syntax `[]` for nested patterns. With nested patterns you can match
against an array and take its head and rest of it (like `x :: xs`).

```js
var max = pat()
  .caseof([], function() { throw "maximum of an empty array" })
  .caseof([Number], function(x) { return x; })
  .caseof([Number, pat.rest()], function(x, xs) { 
    var maxXs = max(xs);
    return x > maxXs ? x : maxXs;
  });

expect(max([1, 6, 4, 5, 7, 91, 53, 73])).to.eql(91)
```

## Examples

See [examples/](examples/)

Before you run the examples, remember to install the dependencies with `npm install` or `bower install`.

## Project values (!!1)

Every project has to have some hard-core values, here's mine:

* Clean and easy api
* 100% test coverage
* Spread the joy of Functional Programming in JavaScript


## Contributing

1. Fork
1. Add a unit test
1. Add an example to README
1. Lint
1. Open a pull request

## Inspiration

* [Coursera - Programming Languages by Dan Grossman](https://www.coursera.org/course/proglang)
* [Standard ML](http://www.smlnj.org/)
* [wu.js](http://fitzgen.github.com/wu.js/)
* [match-js](https://github.com/jfd/match-js)

## License
Copyright (c) 2013 Mikko Koski  
Licensed under the MIT license.

