## tensify [![Build Status](https://travis-ci.org/boo1ean/tensify.png?branch=master)](https://travis-ci.org/boo1ean/tensify)

Get different tense of verb

## Installation

	npm install tensify

## Usage

```javascript
var tensify = require('tensify');

// 'did'
tensify('do').past;

// 'done'
tensify('do').past_participle;

// 'did'
tensify('done').past;

// 'made'
tensify('make').past;

// 'committed'
tensify('commit').past;

// 'mimicked'
tensify('mimic').past;

// And so on..
```

Actually it could fail sometimes... :D

## License

MIT
