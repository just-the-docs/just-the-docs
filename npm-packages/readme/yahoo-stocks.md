# yahoo-stocks

[![Travis](https://img.shields.io/travis/vutran/yahoo-stocks/develop.svg?maxAge=2592000&style=flat-square)](https://travis-ci.org/vutran/yahoo-stocks) [![Coveralls branch](https://img.shields.io/coveralls/vutran/yahoo-stocks/develop.svg?maxAge=2592000&style=flat-square)](https://coveralls.io/github/vutran/yahoo-stocks) [![license](https://img.shields.io/github/license/vutran/yahoo-stocks.svg?maxAge=2592000&style=flat-square)](LICENSE)

> Fetch stock data from Yahoo! Finance

## Install

```
$ npm install --save yahoo-stocks
```

## Usage

```
import { lookup, history } from 'yahoo-stocks';

lookup('AAPL').then(response => {
    console.log(response);
});

history('AAPL').then(response => {
    console.log(response);
});
```

## API

### lookup(symbol)

Returns a `Promise` that resolves the data for the symbol.

#### symbol

Type: `String`

The stock symbol.

### history(symbol, [options])

Returns a `Promise` that resolves the price history for the symbol.

#### symbol

Type: `String`

The stock symbol.

#### options

Type: `Object`

A dictionary of customizable options

*   `interval` - Set the interval for the price changes, e.g. `1m`, `1d`, `5d`, `1mo`, `1y`.
*   `range` - Set the range of dates to include in the output, value values are: `1d`, `5d`, `1mo`, `3mo`, `6mo`, `1y`, `2y`, `5y`, `10y`, `ytd`, `max`

## License

MIT © [Vu Tran](https://github.com/vutran/)
