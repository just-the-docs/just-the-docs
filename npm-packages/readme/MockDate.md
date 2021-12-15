MockDate
========

A JavaScript Mock Date object that can be used to change when "now" is.

[![Build Status](https://travis-ci.org/boblauer/MockDate.png)](https://travis-ci.org/boblauer/MockDate)

## Installation ##
`npm install mockdate --save-dev`

## Environment Support ##
MockDate has been tested in Node, IE9+, Chrome, Firefox, and Opera.

## Usage ##
```javascript
import MockDate from 'mockdate'
```

## API ##
```javascript;
MockDate.set(date)
```

#### __date__

__date__: __`Object`__

The `Date` to be returned when no parameters are passed to `new Date()`.  Supports any object that has a `.valueOf` method that returns a value that can be passed to `new Date()`.

__date__: __`String`__

The string representation of the date which is passed to the `new Date()` constructor. This creates the `Date` to be returned when no parameters are passed to `new Date()`.

__date__: __`Number`__

The millisecond representation of the `Date` to be returned when no parameters are passed to `new Date()`.

```javascript
MockDate.reset();
```

Will restore the original `Date` object back to the native implementation.

## Example ##
```javascript
MockDate.set('2000-11-22');

new Date().toString() // "Tue Nov 21 2000 18:00:00 GMT-0600 (CST)"

MockDate.set('1/30/2000');

new Date().toString() // "Sun Jan 30 2000 00:00:00 GMT-0600 (CST)"

MockDate.set(new Date('2/20/2000'));

new Date().toString() // "Sun Feb 20 2000 00:00:00 GMT-0600 (CST)"

MockDate.set(moment('3/30/2000').toDate()); // using momentjs

new Date().toString() // "Thu Mar 30 2000 00:00:00 GMT-0600 (CST)"

MockDate.reset();

new Date().toString() // "Mon Mar 17 2014 18:08:44 GMT-0500 (CDT)"
```

## Test ##
```javascript
npm test
```
