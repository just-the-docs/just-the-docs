# joi-phone-number

Phone number validation rule for Joi

[![Build Status](https://travis-ci.org/Salesflare/joi-phone-number.svg?branch=master)](https://travis-ci.org/Salesflare/joi-phone-number)
[![Greenkeeper badge](https://badges.greenkeeper.io/Salesflare/joi-phone-number.svg)](https://greenkeeper.io/)

## What

Allows you to do `Joi.string().phoneNumber()`.

Uses [https://github.com/ruimarinho/google-libphonenumber](https://github.com/ruimarinho/google-libphonenumber) for validation.

Which is a compiled version of the Google library [https://github.com/googlei18n/libphonenumber](https://github.com/googlei18n/libphonenumber).

## How

```js
const myCustomJoi = Joi.extend(require('joi-phone-number'));

myCustomJoi.string().phoneNumber().validate('+32494567324');

// The phone number can be transformed to a custom format
// Note that this follows Joi's `convert` option
myCustomJoi.string().phoneNumber({ defaultCountry: 'BE', format: 'e164' }).validate('494322456'); // '+32494322456'
myCustomJoi.string().phoneNumber({ defaultCountry: 'BE', format: 'international' }).validate('494322456'); // '+32 494 32 24 56'
myCustomJoi.string().phoneNumber({ defaultCountry: 'BE', format: 'national' }).validate('494322456'); // '0494 32 24 56'
myCustomJoi.string().phoneNumber({ defaultCountry: 'BE', format: 'rfc3966' }).validate('494322456'); // 'tel:+32-494-32-24-56'
myCustomJoi.string().phoneNumber({ defaultCountry: 'US', strict: true }).validate('7777777777'); // validation error
myCustomJoi.string().phoneNumber({ defaultCountry: 'US'}).validate('7777777777'); // 7777777777
```
