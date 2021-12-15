# 🦄  getlyrics [![Build Status][travis-image]][travis-url]
[![Version][npm-version-image]][npm-version-url] [![License][npm-license-image]][npm-license-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![Deps][npm-deps-image]][npm-deps-url] [![DevDeps][npm-devdeps-image]][npm-devdeps-url]

# notes
> technically legal. uses MusixMatch behind the scenes.

# cli
```sh
npm -g install getlyrics
getlyrics -s 'oops i did it again britney spears' | less
```

```sh
Yeah yeah yeah yeah yeah yeah
...

Yeah yeah yeah yeah yeah yeah
I think I did it again
I made you believe we're more than just friends
...
```

# node module
> can be used as a node module too!

```js
import { getlyrics } from 'getlyrics'
getlyrics.getThoseMotherEffingLyrics('chet faker - gold').then(console.log)
```

```js
// convenience!
getlyrics.for('chet faker - gold')
getlyrics.to('chet faker - gold')
getlyrics.of('chet faker - gold')
getlyrics.search('chet faker - gold')
getlyrics.query('chet faker - gold')
```

[npm-version-url]: https://www.npmjs.com/package/getlyrics
[npm-version-image]: https://img.shields.io/npm/v/getlyrics.svg
[npm-license-url]: https://github.com/moimikey/getlyrics/blob/master/LICENSE
[npm-license-image]: https://img.shields.io/npm/l/getlyrics.svg
[npm-downloads-url]: https://www.npmjs.com/package/getlyrics
[npm-downloads-image]: https://img.shields.io/npm/dm/getlyrics.svg
[npm-deps-url]: https://david-dm.org/moimikey/getlyrics
[npm-deps-image]: https://img.shields.io/david/moimikey/getlyrics.svg
[npm-devdeps-url]: https://david-dm.org/moimikey/getlyrics
[npm-devdeps-image]: https://img.shields.io/david/dev/moimikey/getlyrics.svg
[travis-url]: https://travis-ci.org/moimikey/getlyrics
[travis-image]: https://travis-ci.org/moimikey/getlyrics.svg?branch=master
