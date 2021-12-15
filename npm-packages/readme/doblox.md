![Doblox Logo](https://github.com/ha6000/doblox/raw/master/.github/img/Doblox.png "Doblox")
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fha6000%2Fdoblox.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fha6000%2Fdoblox?ref=badge_shield)
# Doblox
> Open Source module to handle integration between Discord and Roblox
***

## New Release v4
Removed noblox API endpoints and added option choose what provider you want, rover or bloxlink

## Installation

```
npm i doblox
```

## Example
```js

const doblox = new Doblox(null, client, {
	provider: 'bloxlink'
});

const user = await doblox.getRobloxUser('670588428970098708');
```

## Documentation
[Wiki](https://github.com/ha6000/doblox/wiki/Docs), [Typings](https://github.com/ha6000/doblox/blob/master/src/index.d.ts)

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fha6000%2Fdoblox.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fha6000%2Fdoblox?ref=badge_large)