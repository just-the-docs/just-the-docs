[![npm][download-badge]][npm]
[![David][dep-badge]][dep-link]
[![Coverage Status][coverage-badge]][coverage-link]
[![Build Status][build-badge]][build-link]

[![NPM][large-badge]][stats-link]

# snekfetch <sup>[![Version Badge][version-badge]][npm]</sup>

Snekfetch is a fast, efficient, and user-friendly library for making HTTP requests.

It also supports native ALPN negotiation in node for efficient http/2 requests!

The API was inspired by superagent, however it is much smaller and faster.
In fact, in browser, it is a mere 4.0kb.

Documentation is available at https://snekfetch.js.org/

## Some examples

```javascript
const request = require('snekfetch');

request.post('https://httpbin.org/post')
  .send({ usingGoodRequestLibrary: true })
  .then(r => console.log(r.body)); // r.body is object from json response

request.get('https://s.gc.gy/o-SNAKES.jpg')
  .then(r => fs.writeFile('download.jpg', r.body)); // r.body is buffer

request.get('https://s.gc.gy/o-SNAKES.jpg')
  .pipe(fs.createWriteStream('download.jpg')); // pipes
```

Available for browser as UMD from [unpkg][unpkg-link]
```html
<script src="https://unpkg.com/snekfetch"></script>
```

[npm]: https://npmjs.org/package/snekfetch
[large-badge]: https://nodei.co/npm/snekfetch.png?downloads=true&downloadRank=true&stars=true
[stats-link]: https://nodei.co/npm/snekfetch/
[version-badge]: https://versionbadge.now.sh/npm/snekfetch.svg
[download-badge]: https://img.shields.io/npm/dt/snekfetch.svg?maxAge=3600
[build-badge]: https://api.travis-ci.com/devsnek/snekfetch.svg?branch=master
[build-link]: https://travis-ci.com/devsnek/snekfetch
[dep-badge]: https://david-dm.org/devsnek/snekfetch.svg
[dep-link]: https://david-dm.org/devsnek/snekfetch
[coverage-badge]: https://coveralls.io/repos/github/devsnek/snekfetch/badge.svg?branch=master
[coverage-link]: https://coveralls.io/github/devsnek/snekfetch?branch=master
[unpkg-link]: https://unpkg.com/
