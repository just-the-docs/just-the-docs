# phemex-api client for nodejs
This is an unofficial Phemex rest client for NodeJS.

## Install Guide
`yarn add phemex-api`

## Phemex Requirements
First step is to generate API credentials make sure you're logged in then you have to enable two factor.
- [Livenet](https://phemex.com/web/account/api/list)
- [Testnet](https://testnet.phemex.com/web/account/api/list)

## Usage 
```js
const { PhemexClient } = require("phemex-client");

const ApiKey = "8edcdf78-e41f-49ce-8a3f-***********";
const apiSecret = "mADsvO3AKv2W6Tf32HLb1aOR6VGLyV5EavGcigjVn5oxMTUwOWFjYy03OGJjLTRh**************";

const client = new PhemexClient(ApiKey, apiSecret);

client.QueryRecentTrades({symbol: "BTCUSD"})
  .then(result => console.log(result))
  .catch(err => console.error(error));
```

This is the [Official Phemex Documentation](https://github.com/phemex/phemex-api-docs/blob/master/Public-API-en.md#publicapi) for all the 
information on endpoints and what params they require/have.

## Todo
- Finish adding endpoints.
- Add Web socket support.
