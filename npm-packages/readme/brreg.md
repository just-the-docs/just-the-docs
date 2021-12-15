[![Build Status](https://travis-ci.org/zrrrzzt/brreg.svg?branch=master)](https://travis-ci.org/zrrrzzt/brreg)
[![Coverage Status](https://coveralls.io/repos/zrrrzzt/brreg/badge.svg?branch=master&service=github)](https://coveralls.io/github/zrrrzzt/brreg?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# brreg

Node.js module for looking up data from the Norwegian Entity Registry.

It makes use of the 'brreg/enhetsregisteret' and 'brreg/underenheter' datasets from [hotell.difi.no API](https://hotell.difi.no/api).

Requires Node >= 14

## Installation

From npm

```
$ npm install brreg --save
```

## Usage

Pass an object with the required property and receive the result.

**query** String you want to query.

Optional you can specify format for the data returned.

**format** Format for the result. Can be csv, json, jsonp, xml or yaml. json is default.

### Example

```JavaScript
const brreg = require('brreg')
const options = {
  query:'Registerenheten i Brønnøysund'
}

brreg(options)
  .then(console.log)
  .catch(console.error)
```

Returns

```JavaScript
{
  "enhetsregisteret": {
    "data": {
      "entries": [
        {
          "tvangsavvikling": "N",
          "regnskap": "",
          "forradrpostnr": "8900",
          "ansatte_antall": "440",
          "postadresse": "Postboks 900",
          "nkode3": "",
          "ppoststed": "BRØNNØYSUND",
          "konkurs": "N",
          "stiftelsesdato": "",
          "sektorkode": "6100",
          "ansatte_dato": "15.04.2020",
          "organisasjonsform": "ORGL",
          "navn": "REGISTERENHETEN I BRØNNØYSUND",
          "regifriv": "N",
          "forradrkommnr": "1813",
          "regimva": "N",
          "tlf_mobil": "",
          "forradrland": "Norge",
          "ppostland": "Norge",
          "avvikling": "N",
          "regifr": "N",
          "hovedenhet": "912660680",
          "forretningsadr": "Havnegata 48",
          "url": "www.brreg.no",
          "forradrpoststed": "BRØNNØYSUND",
          "tlf": "75 00 75 09",
          "nkode1": "84.110",
          "nkode2": "",
          "forradrkommnavn": "BRØNNØY",
          "regdato": "09.08.1995",
          "orgnr": "974760673",
          "regiaa": "J",
          "ppostnr": "8910"
        }
      ],
      "page": 1,
      "pages": 1,
      "posts": 1
    },
    "error": false
  },
  "underenheter": {
    "data": {
      "entries": [],
      "page": 1,
      "pages": 0,
      "posts": 0
    },
    "error": false
  }
}
```

## Related

- [brreg-cli](https://github.com/zrrrzzt/brreg-cli) The CLI for this module

## License

[MIT](LICENSE)
