# poe-ninja-api-manager
[![NPM version](https://img.shields.io/npm/v/poe-ninja-api-manager.svg)](https://www.npmjs.com/package/poe-ninja-api-manager)
[![NPM Downloads](https://img.shields.io/npm/dt/poe-ninja-api-manager.svg)](https://www.npmjs.com/package/poe-ninja-api-manager)
[![NPM License](https://img.shields.io/npm/l/poe-ninja-api-manager.svg)](https://www.npmjs.com/package/poe-ninja-api-manager)

## Contents

- [Changelog](https://github.com/klayveR/poe-ninja-api-manager/blob/master/CHANGELOG.md)
- [Getting Started](#getting-started)
- [NinjaAPI](#NinjaAPI)

## Getting Started
**Install with npm:**
```bash
$ npm install poe-ninja-api-manager
```

**Example usage:**
```javascript
var NinjaAPI = require("poe-ninja-api-manager");

var ninjaAPI = new NinjaAPI({
  league: "Standard"
});

// Update data, then save data, then get item data for Atziri"s Splendour, 5 link, Energy Shield variant
ninjaAPI.update()
.then((result) => {
  console.log("Updated data, here are the results of the requests:", result);
  return ninjaAPI.save();
})
.then((success) => {
  console.log("Saved data", success);
  return ninjaAPI.getItem("Atziri's Splendour", {links: 5, variant: "ES"});
})
.then((item) => {
  return console.log("An item matching the query was found", item);
})
.catch((err) => {
  console.log(err);
});
```
<a name="NinjaAPI"></a>

## NinjaAPI
**Kind**: global class  

* [NinjaAPI](#NinjaAPI)
    * [new NinjaAPI([options])](#new_NinjaAPI_new)
    * [.update([options])](#NinjaAPI+update) ⇒ <code>Promise</code>
    * [.getItem(name, [options])](#NinjaAPI+getItem) ⇒ <code>Promise</code>
    * [.getCurrencyDetails(name)](#NinjaAPI+getCurrencyDetails) ⇒ <code>object</code>
    * [.hasData([league])](#NinjaAPI+hasData) ⇒ <code>boolean</code>
    * [.getLeague()](#NinjaAPI+getLeague) ⇒ <code>string</code>
    * [.setLeague(league)](#NinjaAPI+setLeague)
    * [.load()](#NinjaAPI+load) ⇒ <code>Promise</code>
    * [.save()](#NinjaAPI+save) ⇒ <code>Promise</code>
    * [.isUpdating()](#NinjaAPI+isUpdating) ⇒ <code>boolean</code>

<a name="new_NinjaAPI_new"></a>

### new NinjaAPI([options])
Creates a new NinjaAPI object


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | An optional options object |
| [options.league] | <code>string</code> | <code>&quot;Standard&quot;</code> | League that should be used as default |
| [options.path] | <code>string</code> | <code>&quot;./&quot;</code> | Path where data should be saved |
| [options.dataFile] | <code>string</code> | <code>&quot;ninjaData.json&quot;</code> | File in which data should be saved |

<a name="NinjaAPI+update"></a>

### ninjaAPI.update([options]) ⇒ <code>Promise</code>
Updates data from poe.ninja for a specific league.

**Kind**: instance method of [<code>NinjaAPI</code>](#NinjaAPI)  
**Fulfil**: <code>Array</code> - An array of objects containing the requested data of each API  
**Reject**: <code>Error</code> - The `error.message` contains information about why the promise was rejected  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | An optional options object |
| [options.league] | <code>string</code> | <code>&quot;Standard&quot;</code> | League that should be updated |
| [options.delay] | <code>string</code> | <code>200</code> | Delay between API calls |

<a name="NinjaAPI+getItem"></a>

### ninjaAPI.getItem(name, [options]) ⇒ <code>Promise</code>
Returns data for an item from the currently loaded poe.ninja data object.
The returned item object is the same you'd receive from poe.ninja, but it has an additional property `apiType`.
The optional options do no apply for currency items, except for `options.league`.

**Kind**: instance method of [<code>NinjaAPI</code>](#NinjaAPI)  
**Fulfil**: <code>Array</code> - An array containing the matching item as an object. If you receive multiple objects, please open an issue.  
**Reject**: <code>Error</code> - The `error.message` contains information about why the promise was rejected  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>String</code> |  | Name of the item |
| [options] | <code>Object</code> |  | An optional options object |
| [options.league] | <code>string</code> | <code>&quot;Standard&quot;</code> | League that should be searched |
| [options.links] | <code>string</code> | <code>0</code> | Links the item should have |
| [options.variant] | <code>string</code> | <code>null</code> | Variant of the item. If no variant is specified, any variant of the item will be returned, but preferably the default (`null` variant) of the item |
| [options.fallbackVariant] | <code>string</code> | <code>null</code> | If a variant was specified but not found, try to find this instead. Useful for defaulting gems to the level 20 variant |
| [options.relic] | <code>string</code> | <code>false</code> | Set to `true` for the relic version of the item |
| [options.baseType] | <code>string</code> | <code>null</code> | Base type of the item. Is ignored if not specified |

<a name="NinjaAPI+getCurrencyDetails"></a>

### ninjaAPI.getCurrencyDetails(name) ⇒ <code>object</code>
Returns an object containing details about a currency item.
Returns an empty object if no data is available for the specified currency name.

**Kind**: instance method of [<code>NinjaAPI</code>](#NinjaAPI)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the currency |

<a name="NinjaAPI+hasData"></a>

### ninjaAPI.hasData([league]) ⇒ <code>boolean</code>
Returns `true` if any poe.ninja data is available.
This means that it has been loaded or updated before calling this method.

**Kind**: instance method of [<code>NinjaAPI</code>](#NinjaAPI)  

| Param | Type | Description |
| --- | --- | --- |
| [league] | <code>string</code> | By setting a league, `true` will be returned if there's data for this league |

<a name="NinjaAPI+getLeague"></a>

### ninjaAPI.getLeague() ⇒ <code>string</code>
Returns the league that is currently set as default.

**Kind**: instance method of [<code>NinjaAPI</code>](#NinjaAPI)  
<a name="NinjaAPI+setLeague"></a>

### ninjaAPI.setLeague(league)
Sets a league as default.

**Kind**: instance method of [<code>NinjaAPI</code>](#NinjaAPI)  

| Param | Type | Description |
| --- | --- | --- |
| league | <code>string</code> | League that should be set as default |

<a name="NinjaAPI+load"></a>

### ninjaAPI.load() ⇒ <code>Promise</code>
Loads previously saved data from file.

**Kind**: instance method of [<code>NinjaAPI</code>](#NinjaAPI)  
**Fulfil**: <code>boolean</code> - `true` if the data was loaded successfully  
**Reject**: <code>Error</code> - The `error.message` contains information about why the promise was rejected  
<a name="NinjaAPI+save"></a>

### ninjaAPI.save() ⇒ <code>Promise</code>
Saves the currently loaded or updated data to file.

**Kind**: instance method of [<code>NinjaAPI</code>](#NinjaAPI)  
**Fulfil**: <code>boolean</code> - `true` if the data was saved successfully  
**Reject**: <code>Error</code> - The `error.message` contains information about why the promise was rejected  
<a name="NinjaAPI+isUpdating"></a>

### ninjaAPI.isUpdating() ⇒ <code>boolean</code>
Returns `true` if data is currently being updated

**Kind**: instance method of [<code>NinjaAPI</code>](#NinjaAPI)  
