# SourceScraper

[![Build Status](https://travis-ci.org/OpenByteDev/SourceScraper.svg?branch=master)](https://travis-ci.org/OpenByteDev/SourceScraper)
[![npm version](https://badge.fury.io/js/source-scraper.svg)](https://www.npmjs.com/package/source-scraper) 
[![Dependency Status](https://david-dm.org/OpenByteDev/SourceScraper/status.svg?path=packages%2Fsource-scraper)](https://david-dm.org/OpenByteDev/SourceScraper?path=packages%2Fsource-scraper)
[![DevDependency Status](https://david-dm.org/OpenByteDev/SourceScraper/dev-status.svg?path=packages%2Fsource-scraper)](https://david-dm.org/OpenByteDev/SourceScraper?type=dev&path=packages%2Fsource-scraper)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)
[![Doge](https://img.shields.io/badge/doge-wow-yellow.svg)]()
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Scrap the sources from your favorite video streaming sites.

<hr>

## Supported Sites

#### Source
 - <sub><img src="http://www.google.com/s2/favicons?domain=mp4upload.com" height="20" width="20"></sub> [MP4Upload](https://mp4upload.com)
 - <sub><img src="http://www.google.com/s2/favicons?domain=mystream.to" height="20" width="20"></sub> [MyStream](https://mystream.to)
 - <sub><img src="http://www.google.com/s2/favicons?domain=oload.win" height="20" width="20"></sub> [Openload](https://openload.co)
 - <sub><img src="http://www.google.com/s2/favicons?domain=rapidvideo.com" height="20" width="20"></sub> [Rapidvideo](https://rapidvideo.com)
 - <sub><img src="http://www.google.com/s2/favicons?domain=streamango.com" height="20" width="20"></sub> [Streamango](https://streamango.com)
 - <sub><img src="http://www.google.com/s2/favicons?domain=streamcloud.eu" height="20" width="20"></sub> [Streamcloud](https://streamcloud.eu)
 - <sub><img src="http://www.google.com/s2/favicons?domain=stream.moe" height="20" width="20"></sub> [StreamMoe](https://stream.moe)
 - <sub><img src="http://www.google.com/s2/favicons?domain=tiwi.kiwi" height="20" width="20"></sub> [Tiwikiwi](https://tiwi.kiwi)
 - <sub><img src="http://www.google.com/s2/favicons?domain=vev.io" height="20" width="20"></sub> [Vevio](https://vev.io)<sub><img src="https://i.imgur.com/Hm8dCCN.png" height="20"></sub>
 - <sub><img src="http://www.google.com/s2/favicons?domain=vidstreaming.io" height="20" width="20"></sub> [Vidstreaming](https://vidstreaming.io)
 - <sub><img src="http://www.google.com/s2/favicons?domain=vidzi.tv" height="20" width="20"></sub> [Vidzi](https://vidzi.tv) <sub><img src="https://i.imgur.com/Hm8dCCN.png" height="20"></sub>
  - <sub><img src="http://www.google.com/s2/favicons?domain=verystream.com" height="20" width="20"></sub> [Verystream](https://verystream.com)

#### Hoster
- <sub><img src="http://www.google.com/s2/favicons?domain=gogoanime.se" height="20" width="20"></sub> [Gogoanime](https://gogoanime.se)
- <sub><img src="http://www.google.com/s2/favicons?domain=kissanime.ru" height="20" width="20"></sub> [Kissanime](https://kissanime.ru)
- <sub><img src="http://www.google.com/s2/favicons?domain=masterani.me" height="20" width="20"></sub> [MasterAnime](https://masterani.me)<sub><img src="https://i.imgur.com/Hm8dCCN.png" height="20" title="Closed"></sub>
<hr>

## Getting Started
### Installation
```bash
$ npm i source-scraper
```
There is a package available for each site individually which you can find [here](./packages.md).

### Usage
```js
const { scrapers } = require('source-scraper');

(async () => {
    const url = 'some url';
    const scraper = scrapers.all.getFirstApplicable(url);
    const scrap = await scraper.scrap(url);
    if (scrap.success)
        console.log(scrap.data);
})();
```

### API
The API generated with [TypeDoc](http://typedoc.org/) can be found [here](https://openbytedev.github.io/SourceScraper/packages/source-scraper/docs).

