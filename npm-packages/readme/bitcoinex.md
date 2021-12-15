# Bitcoinex [![Build Status](https://travis-ci.org/HuangJi/bitcoinex.svg?branch=master)](https://travis-ci.org/HuangJi/bitcoinex)

### An easy-to-use API library let developers get exchanges real time bitcoin price.

Now supporting several exchanges real time high, low, last prices as below, and expected to support other market informations in 0.3.x. Welcome to open issues or leave a comment.

- Coinbase
- Bitstamp
- Bitfinex
- OKCoin
- itBit

## Usage

### Install

```
npm install bitcoinex
```
### Example
```js
var bitcoinex = require('bitcoinex');

// exchangeName now only support 'coinbase', 'bitstamp', 'bitfinex', 'okcoin', 'itbit'
// currency now only support 'usd', 'eur', 'cny', 'twd'

// bitcoinex.getPriceWith(exchangeName, currency, callback)
bitcoinex.getPriceWith('bitstamp', 'usd', function(err, priceObject) {
    if (err) {
        console.error(err);
    }
    else {
        console.log(priceObject.last);
    }
    /* priceObject
    {
        exchangeName: 'bitstamp',
        currency: 'usd',
        high: 427.99,
        low: 415.82,
        last: 423
    }
    */
});
```

Or, you can just try example.js and see what would happen.

```
node example.js
```
#### v0.3.x is coming soon...