# Simple tokenize text to word tokens

## Install package

```sh
npm install simple-text2word-tokens
```

## Usage

```js
import textToWordTokens from 'simple-text2word-tokens'
const text = 'text to be tokenized'

console.log(JSON.stringify(textToWordTokens(text), null, 2))
/**
 [
  {
    "value": "text",
    "index": 0,
    "offset": 4
  },
  {
    "value": "to",
    "index": 5,
    "offset": 2
  },
  {
    "value": "be",
    "index": 8,
    "offset": 2
  },
  {
    "value": "tokenized",
    "index": 11,
    "offset": 9
  }
 ]
*/
```

### Development

```sh
npm install # install dependencies

npm start # start webpack-dev-server

npm test # run tests

npm run bundle # create a new bundle
```
