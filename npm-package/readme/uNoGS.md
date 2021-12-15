# uNoGS

[![npm package](https://nodei.co/npm/unogs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/unogs/)

uNoGS (unofficial Netflix online Global Search) allows anyone to easily search the global Netflix catalog.

## Install

```js
$ npm install unogs
```

## Get Token

* https://market.mashape.com/unogs/unogs

## Usage

Basic
```js
"use strict";

let uNoGS = require("unogs"),
    unogs = new uNoGS("token");

unogs.listCountries(function(err, docs){
    console.log(docs);
});
```

List of all Netflix Countries includes various Counts
```js
unogs.listCountries(function(err, docs){
    console.log(docs);
});
```

Get New Releases per Country
```js
unogs.newReleasePerCountry("BR", 10, 1, function(err, docs){
    console.log(docs);
});
```

This call allows you to add advanced search filter which allow you to pull specific information.
```js
unogs.search("Iron Man", 1, function(err, docs){
    console.log(docs);
});
```

Get list of different variable sized images for this title
```js
unogs.images(70080038, function(err, docs){
    console.log(docs);
});
```

Load all Season and Episode details for a Netflix Series
```js
unogs.loadEpisodeDetails(70205012, function(err, docs){
    console.log(docs);
});
```

Pulls the IMDB info for a specific netflix id
```js
unogs.loadIMDBInfo(70205012, function(err, docs){
    console.log(docs);
});
```

Load Title Details: Country Information, Audio, Subtitle, and season/episode counts
```js
unogs.loadTitleDetails(70205012, function(err, docs){
    console.log(docs);
});
```
