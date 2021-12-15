# 🌡 Converture 🌡

[![Travis Build](https://img.shields.io/travis/zsoltime/converture.svg?style=flat-square)](https://travis-ci.org/zsoltime/converture)

Converture is a temperature converter, including functions to convert from/to Celsius, Fahrenheit and Kelvin. The returned value is rounded to two decimal places.

## Install

```bash
npm install converture
```

## Usage

```javascript
// Using CommonJS
const convert = require('converture').default;

// OR
// Using ES6 modules
import convert from 'converture';

convert.kelvin(50).toCelsius();
// => -223.15
convert.kelvin(50).toFahrenheit();
// => -369.67
convert.celsius(20).toKelvin();
// => 293.15
convert.celsius(20).toFahrenheit();
// => 68
convert.fahrenheit(44).toKelvin();
// => 279.82
convert.fahrenheit(44).toCelsius();
// => 6.67

// You could also import a single function
import { kelvin } from 'converture';

kelvin(50).toFahrenheit();
// => -369.67
```

## License

MIT © Zsolt Meszaros
