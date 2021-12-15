# commandy 
[![Build Status](https://travis-ci.org/trustedtomato/commandy.svg?branch=master)](https://travis-ci.org/trustedtomato/commandy)
[![dependencies Status](https://david-dm.org/trustedtomato/commandy/status.svg)](https://david-dm.org/trustedtomato/commandy)
[![devDependencies Status](https://david-dm.org/trustedtomato/commandy/dev-status.svg)](https://david-dm.org/trustedtomato/commandy?type=dev)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![npm Downloads](https://img.shields.io/npm/dm/commandy.svg)](https://www.npmjs.com/package/commandy)

If you want to create a command line app which is hard to make with minimist, but don't want the syntactic sugar overdose which commander.js gives, this package is for you.

## Demo
```javascript
const {Program} = require('../');

const checkoutProgram = new Program();

const orderProgram = new Program([
	['p', 'pepperoni'],
	['c', 'cheese'],
	['h', 'ham']
])

const pizzaProgram = new Program({
	checkout: checkoutProgram,
	order: orderProgram
});

const margaretaCheckout = pizzaProgram.parse(['checkout','margareta']);
console.log(margaretaCheckout.program === checkoutProgram);
// => true
console.log(margaretaCheckout.args)
// => [ 'margareta' ]

const order = pizzaProgram.parse(['order','-ch','hawaii','-c','--pepperoni=little'])
console.log(order.args);
// => [ 'hawaii' ]
console.log(order.options.cheese);
// => [ true, true ]
console.log(order.options.ham);
// => [ true ]
console.log(order.options.pepperoni);
// => [ 'little' ]
```

## Installation
```npm install commandy --save```