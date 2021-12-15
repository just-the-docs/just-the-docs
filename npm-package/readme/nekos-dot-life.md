[![npm](https://img.shields.io/npm/v/nekos.life.svg)](https://www.npmjs.com/package/nekos.life)
[![npm](https://img.shields.io/npm/dt/nekos.life.svg?maxAge=3600)](https://www.npmjs.com/package/nekos.life)
[![install size](https://packagephobia.now.sh/badge?p=nekos.life)](https://packagephobia.now.sh/result?p=nekos.life)

 
[![NPM](https://nodei.co/npm/nekos.life.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nekos.life/)


# Nekos.life

## Installation
```
npm i -s nekos.life
```
Official wrapper for nekos.life! Very small install size with no external dependencies.

### SFW

| Function | Description |
| -------- | ----------- |
| `smug` | Gets a URL of a smug image/gif |
| `baka` | Gets a URL of a baka image/gif |
| `tickle` | Gets a URL of a tickle image/gif |
| `slap` | Gets a URL of a slap image/gif |
| `poke` | Gets a URL of a poke image/gif |
| `pat`  | Get a URL of a pat image/gif |
| `neko` | Get a URL of a neko image |
| `nekoGif` | Get a URL of a neko gif |
| `meow` | Get a URL of a cat image/gif |
| `lizard` | Get a URL of a lizard image |
| `kiss` | Get a URL of a kiss image/gif |
| `hug`  | Get a URL of a hug image/gif |
| `foxGirl` | Get a URL of a fox girl image/gif |
| `feed` | Get a URL of a feeding image/gif |
| `cuddle` | Get a URL of a cuddle image/gif |
| `kemonomimi` | Get a URL of a kemonomimi image/gif |
| `holo` | Get a URL of a Holo image/gif |
| `woof` | Get a URL of a dog image/gif |
| `wallpaper` | Get a URL of a wallpaper |
| `goose` | Get a URL of a goose image |
| `gecg` | Get a URL of a gecg (genetically engineered catgirl) image |
| `avatar` | Get a URL of an avatar image |
| `waifu` | Get a URL of a waifu image |
| `why` | Get `text` of a question |
| `catText`| Get `text` of a cat emoji |
| `OwOify` | Get OwOified `text` of a string |
| `8Ball` | Sends the text and replies with a `text` as a response to the magic 8Ball and an image as well.|
| `fact` | Gets the text and replies with a `text` that is a random fact |
| `spoiler` | Creates an individual spoiler per letter for Discord |

### NSFW

| Function | Description |
| -------- | ----------- |
| `randomHentaiGif` | Get a URL of hentai gif |
| `pussy` | Get a NSFW URL of a pussy image/gif |
| `nekoGif`| Get a NSFW URL of a neko gif |
| `neko` | Get a NSFW URL of a neko image |
| `lesbian` | Get a NSFW URL of a lesbian image/gif |
| `kuni` | Get a NSFW URL of a kuni image/gif |
| `cumsluts` | Get a NSFW URL of a cumslut image/gif |
| `classic` | Gets a NSFW URL of the classic endpoint image/gif |
| `boobs` | Gets a NSFW URL of boobs image/gif |
| `bJ` | Gets a NSFW URL of bj image/gif |
| `anal` | Gets a NSFW URL of anal image/gif |
| `avatar` | Gets a NSFW URL of an avatar image/gif |
| `yuri` | Gets a NSFW URL of yuri image/gif |
| `trap` | Gets a NSFW URL of trap image/gif |
| `tits` | Gets a NSFW URL of an/a image/gif containing tits |
| `girlSoloGif` | Gets a NSFW URL of a solo girl gif |
| `girlSolo` | Gets a NSFW URL of a solo girl image |
| `pussyWankGif` | Gets a NSFW URL of a gif of pussy masterbation |
| `pussyArt` | Gets a NSFW URL of an/a image/gif of pussy art |
| `kemonomimi` | Gets a NSFW URL of an/a image/gif containing kemonomimi|
| `kitsune` | Gets a NSFW URL of an/a image/gif of kitsune |
| `keta` | Gets a NSFW URL of an/a image/gif of keta |
| `holo` | Gets a NSFW URL of an/a image/gif of Holo |
| `holoEro` | Gets a NSFW URL of an/a image/gif Holo ero |
| `hentai` | Gets a NSFW URL of an/a image/gif of hentai |
| `futanari` | Gets a NSFW URL of an/a image/gif of futa |
| `femdom` | Gets a NSFW URL of an/a image/gif of femdom |
| `feetGif` | Gets a NSFW URL of a gif of feet |
| `eroFeet` | Gets a NSFW URL of an/a image/gif of ero feet |
| `feet` | Gets a NSFW URL of an image of feet |
| `ero` | Gets a NSFW URL of an/a image/gif ero |
| `eroKitsune` | Gets a NSFW URL of an/a image/gif ero kitsune |
| `eroKemonomimi` | Gets a NSFW URL of an/a image/gif ero kemonomimi |
| `eroNeko` | Gets a NSFW URL of an/a image/gif ero neko |
| `eroYuri` | Gets a NSFW URL of an/a image/gif ero yuri |
| `cumArts` | Gets a NSFW URL of an/a image/gif of cum arts |
| `blowJob` | Gets a NSFW URL of an/a image/gif blowjob |
| `spank` | Gets a NSFW URL of an/a image/gif spank |
| `gasm` | Gets a NSFW URL of a gasm image |

All of the endpoints but the ones marked with `text`, except Chat/8Ball/Fact in the description will return JSON: `{ url: <theURL>}`.

`sfw.catText` will return JSON: `{cat: <catemoji>}`  
`sfw.why` will return JSON `{why: <whytext>}`  
`sfw.OwOify` will return JSON `{owo: <owoified string>}` 

`sfw.fact` will return JSON `{fact: <fact string>}`  
`sfw.8Ball` will return JSON `{response: <8Ball response string>, url: <URL to a matching 8Ball image>}`  

As of now, `OwOify` and `8Ball` are the only ones with query parameters. It requires an object containing the parameter, and the key should be the value. In this case, the key is `text` and the value is whatever you want OwOified.  There is an example in this README.
`{text: 'Some text you want weebified.}` 

## Typings

I added a typings file and will be working to improve it. This allows editors like VSC to use intellisense/autocomplete to suggest functions and help out with parameters and to see what you'll be receiving as a result of function calls.


## Examples

Await/Async example
```js
const client = require('nekos.life');
const neko = new client();

async function test() {
  console.log(await neko.sfw.hug());
}

test();
```
returns: 
```js
{ url: 'https://cdn.nekos.life/hug/hug10050.gif' }
```

Promise example
```js
const client = require('nekos.life');
const neko = new client();

neko.sfw.catText().then((catText) => console.log(catText));
```
returns
```js
{ cat: '((≡^⚲͜^≡))' }
```

`OwOify` example
```js
const client = require('nekos.life');
const neko = new client();

async function work() {
  let owo = await neko.sfw.OwOify({text: 'This lib is really awesome!'});
  console.log(owo);
}

work();
```
returns
```js
{ owo: 'This wib is weawwy awesome >w< ' }
```

NSFW example
```js
const client = require('nekos.life');
const neko = new client();

neko.nsfw.neko().then(neko => {console.log(neko);});
```
returns
```js
{ url: 'https://cdn.nekos.life/lewd/lewd_neko750.jpeg' }
```

## Advanced examples
Here I'll show you how to import either `sfw` or `nsfw` if you would like to do so. That allows you to only use one or the other So if you only need `sfw`, you can just import that without anything `nsfw`!

Importing only `sfw`
```js
const client = require('nekos.life');
const {sfw} = new client();

sfw.neko().then(neko => console.log(neko));
```
returns
```js
{ url: 'https://cdn.nekos.life/neko/neko_083.jpg' }
```

Importing only `nsfw`
```js
const client = require('nekos.life');
const {nsfw} = new client();

nsfw.neko().then(neko => console.log(neko));
```
returns
```js
{ url: 'https://cdn.nekos.life/lewd/lewd_neko_058.jpeg' }
```
