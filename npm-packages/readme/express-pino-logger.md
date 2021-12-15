# express-pino-logger
[![npm version](https://img.shields.io/npm/v/express-pino-logger)](https://www.npmjs.com/package/express-pino-logger)
[![Build Status](https://img.shields.io/github/workflow/status/pinojs/express-pino-logger/CI)](https://github.com/pinojs/express-pino-logger/actions)
[![Known Vulnerabilities](https://snyk.io/test/github/pinojs/express-pino-logger/badge.svg)](https://snyk.io/test/github/pinojs/express-pino-logger)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)

An [express](http://npm.im/express) middleware to log with
[pino](https://github.com/pinojs/pino). Incidentally, it also works
without express.

To our knowledge, `express-pino-logger` is the [fastest express](#benchmarks) logger in town.

* [Installation](#install)
* [Usage](#usage)
* [Benchmarks](#benchmarks)
* [API](#api)
* [Team](#team)
* [Acknowledgements](#acknowledgements)
* [License](#license)

**Notice**: This is a "meta-package" that only exists for search purposes and internally just exports [`pino-http`](https://github.com/pinojs/pino-http) under a different name without any additional changes or features (see [#41](https://github.com/pinojs/express-pino-logger/issues/41)).

## Benchmarks

Benchmarks log each request/response pair while returning
`'hello world'`, using
[autocannon](https://github.com/mcollina/autocannon) with 100
connections and 10 pipelined requests (`autocannon -c 100 -p 10 http://localhost:3000`).

* `express-bunyan-logger`: 2702 req/sec
* `express-winston`: 5953 req/sec
* `morgan`: 8570 req/sec
* `express-pino-logger`: 9807 req/sec
* `express-pino-logger` (extreme): 10407 req/sec
* `express-pino-logger` (without express): 22240.73 req/seq
* `express-pino-logger` (without express and extreme): 25536 req/sec

All benchmarks where taken on a Macbook Pro 2013 (2.6GHZ i7, 16GB of RAM). 

Whilst we're comparing `express-pino-logger` against [morgan](http://npm.im/morgan), this isn't really a fair contest. 

Morgan doesn't support logging arbitrary data, nor does it output JSON. Further Morgan [uses a form of `eval`](https://github.com/expressjs/morgan/blob/5da5ff1f5446e3f3ff29d29a2d6582712612bf89/index.js#L383) to achieve high speed logging. Whilst probably safe, using `eval` at all tends to cause concern, particular when it comes to server-side JavaScript.

The fact that `express-pino-logger` achieves higher throughput with JSON logging **and** arbitrary data, without using `eval`, serves to emphasise the high-speed capabilities of `express-pino-logger`. 

With `express-pino-logger` you can have features, safety **and** speed. 

## Install

```
npm i express-pino-logger --save
```

## Example

```js
'use strict'

var app = require('express')()
var pino = require('express-pino-logger')

app.use(pino)

app.get('/', function (req, res) {
  // each request has its own id
  // so you can track the log of each request
  // by using `req.log`
  // the ids are cycled every 2^31 - 2
  req.log.info('something else')
  res.send('hello world')
})

app.listen(3000)
```

```
$ node example.js | pino-pretty
[2016-03-31T16:53:21.079Z] INFO (46316 on MBP-di-Matteo): something else
    req: {
      "id": 1,
      "method": "GET",
      "url": "/",
      "headers": {
        "host": "localhost:3000",
        "user-agent": "curl/7.43.0",
        "accept": "*/*"
      },
      "remoteAddress": "::1",
      "remotePort": 64386
    }
[2016-03-31T16:53:21.087Z] INFO (46316 on MBP-di-Matteo): request completed
    res: {
      "statusCode": 200,
      "header": "HTTP/1.1 200 OK\r\nX-Powered-By: Express\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: 11\r\nETag: W/\"b-XrY7u+Ae7tCTyyK7j1rNww\"\r\nDate: Thu, 31 Mar 2016 16:53:21 GMT\r\nConnection: keep-alive\r\n\r\n"
    }
    responseTime: 10
    req: {
      "id": 1,
      "method": "GET",
      "url": "/",
      "headers": {
        "host": "localhost:3000",
        "user-agent": "curl/7.43.0",
        "accept": "*/*"
      },
      "remoteAddress": "::1",
      "remotePort": 64386
    }
```


## Custom serializers

The `req` object for logging is constructed by [pino-std-serializers](https://github.com/pinojs/pino-std-serializers) and custom properties added to the `req` in previous middleware are not automatically included.

The original `req` is  accessible in the custom serializer under `req.raw`.

```js
'use strict'

var app = require('express')()
var ExpressPinoLogger = require('express-pino-logger')()

var pino = ExpressPinoLogger({
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      user: req.raw.user,
    }),
  },
})

// middleware that augments the req - must be added before the pino middleware
app.use((req, res, next) => {
  req.user = 'testing';
  next();
})

app.use(pino)

...

```


## API

`express-pino-logger` has the same options of
[pino](http://npm.im/pino), look at them there.
`express-pino-logger` attaches some listeners to the request, so that
it will log when the request is completed.

You can also reuse an instance of `pino` by passing it in the
constructor with:

```
'use strict'

const pino = require('pino')()
const expressPino = require('express-pino-logger')({
  logger: pino
})
```

## License

MIT
