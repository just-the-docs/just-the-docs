# bricklink-api

[![Node.js CI](https://github.com/ryansh100/bricklink-api/actions/workflows/node.js.yml/badge.svg)](https://github.com/ryansh100/bricklink-api/actions/workflows/node.js.yml)

Node package for connecting to Bricklink's API.

```
npm install --save bricklink-api
```

## Basic Usage

Initialize a client with your OAuth credentials as supplied at the following:

[https://www.bricklink.com/v2/api/register_consumer.page](https://www.bricklink.com/v2/api/register_consumer.page)

You are required to have a Bricklink account and register your IP address from
which your application will be using the API. You can also use 0.0.0.0 to match
any IP address (such as a cloud solution); however, you would need to keep the keys and secrets secure.

```javascript
var api = require('bricklink-api');
var Client = api.Client,
    ItemType = api.ItemType;

var bricklink = new Client({
    "consumer_key": "<ConsumerKey>",
    "consumer_secret": "<ConsumerSecret>",
    "token": "<TokenValue>",
    "token_secret": "<TokenSecret>"
  });

bricklink.getCatalogItem(ItemType.Part, '3001')
  .then(function(part){
    console.log(part);
  });

\\ Alternate Usage:

var CatalogItem = api.CatalogItem;
var req = CatalogItem.get(ItemType.Part, '3001');
bricklink.send(req)
  .then(function(part){
    console.log(part);
  });
```

## ES6 Support

Read basic usage.

```javascript
import {Client, ItemType, CatalogItem} from 'bricklink-api';

const bricklink = new Client({
    "consumer_key": "<ConsumerKey>",
    "consumer_secret": "<ConsumerSecret>",
    "token": "<TokenValue>",
    "token_secret": "<TokenSecret>"
  });

bricklink.getCatalogItem(ItemType.Part, '3001')
  .then(part => console.log(part));

\\ Alternate Usage:

let req = CatalogItem.get(ItemType.Part, '3001');
bricklink.send(req)
  .then(part => console.log(part));
```

## Documentation

Full API documentation is available at:

[https://ryansh100.github.io/bricklink-api](https://ryansh100.github.io/bricklink-api)

## Change Log

- 2017/04/03: Fix bugs with require of dictionaries. Update to make more intuitive imports. Add support for color and category lookup.
- 2021/05/01: Updating the compiling engine, updating the way tests are run
