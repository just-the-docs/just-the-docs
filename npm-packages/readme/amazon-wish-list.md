# Amazon Wish List
[![npm version](https://badge.fury.io/js/amazon-wish-list.svg)](https://badge.fury.io/js/amazon-wish-list) ![Amount of Downloads per month](https://img.shields.io/npm/dm/amazon-wish-list.svg "Amount of Downloads") [![Build pass](https://travis-ci.org/stylesuxx/amazon-wish-list.svg?branch=master)](https://travis-ci.org/stylesuxx/amazon-wish-list?branch=master)  [![Dependencies](https://david-dm.org/stylesuxx/amazon-wish-list.svg)](https://david-dm.org/stylesuxx/amazon-wish-list) [![devDependencies Status](https://david-dm.org/stylesuxx/amazon-wish-list/dev-status.svg)](https://david-dm.org/stylesuxx/amazon-wish-list?type=dev) ![Node Version](https://img.shields.io/node/v/amazon-wish-list.svg "Node Version")

> A JavaScript scraper to look up public amazon wish lists by customer or wish list id.

## Installation
    npm install amazon-wish-list --save

## Usage
``` JavaScript
var AmazonWishList = require('amazon-wish-list');
var awl = new AmazonWishList();

awl.getById('NDDVVVWMJ6AN').then(function(list) {
  console.log(list);
});
```

## Available methods
The *AmazonWishList* class provides the following methods:

* getById(listId, filter = 'unpurchased', sort = 'date')
* getByCid(cid, filter = 'unpurchased', sort = 'date')

Valid *filter* values are:
* unpurchased
* purchased
* all

Valid *sort* values are:
* date
* price
* price-desc
* title
* priority

## Tested and working amazon TLD's
* de
* co.uk
* com

If you use a TLD not mentioned here, please post your findings to the issue section.

## Testing
Since this is a scraper and relys on the amazon page not changing, an extensive test suite is provided and may be invoked by running:

    npm run test
