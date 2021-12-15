# getHostMeta - Fetch and parse .well-known/host-meta

[![Version](http://img.shields.io/npm/v/hostmeta.svg)](https://npmjs.org/package/hostmeta)
[![Downloads](http://img.shields.io/npm/dm/hostmeta.svg)](https://npmjs.org/package/hostmeta)
[![Build Status](http://img.shields.io/travis/otalk/hostmeta.js.svg)](https://travis-ci.org/otalk/hostmeta.js)
[![Dependency Status](http://img.shields.io/david/otalk/hostmeta.js.svg)](https://david-dm.org/otalk/hostmeta.js)

[![Browser Support](https://ci.testling.com/otalk/hostmeta.js.png)](https://ci.testling.com/otalk/hostmeta.js)

## What is this?

A browser module for looking up metadata about a host, using the `/.well-known/host-meta[.json]` files, which is useful for discovering associated services for a host, such as an OpenID endpoint or where to connect for an XMPP BOSH/WebSocket session.

## Installing

```
$ npm install hostmeta
```

## Building bundled/minified version (for AMD, etc)

```sh
$ make build
```

The bundled and minified files will be in the generated `build` directory.

## How to use it

```js
var getHostMeta = require('hostmeta');

getHostMeta('example.com', function (err, data) {
    if (err) {
        console.log("Couldn't retrieve host-meta data");
    }
    console.log(data);
    // Where data might look like:
    // {
    //   "links": [
    //     {
    //       "rel": "urn:xmpp:alt-connections:websocket",
    //       "href': "wss://example.com:5281/xmpp-websocket"
    //     },
    //     {
    //       "rel": "author",
    //       "href': "http://example.com/joe"
    //     }
    //   ]
    // }
});
```

## License

MIT

## Created By

If you like this, follow: [@lancestout](http://twitter.com/lancestout) on twitter.
