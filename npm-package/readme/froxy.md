# froxy - Flexible Proxy and vhost

A simple, flexible proxy and vhost library for Node.js.

Easily create HTTP request handlers for proxying to arbitrary hosts.

Features:
* Fast, efficient proxy using request and response pipes.
* Create proxy request handler with a simple config.
* Create vhost dispatch handler with a simple config.
* [Express](http://expressjs.com)-compatible
* Created handler is reusable in multiple servers or Express routes.
* Support setting of origin host, port, protocol
* Support custom connection timeout setting
* Relative URL translation via simple prefix substitution, Regex substitution, or custom JS function
* Loopback proxying when both host and port are omitted


## Installation

```sh
$ npm install froxy
``` 

## Usage

The following snippets are taken from full demo code at [https://github.com/leonardw/froxy-proxy-example](https://github.com/leonardw/froxy-proxy-example)

Simple HTTP proxy
```js
var froxy = require('froxy'),
	http = require("http");

http.createServer(froxy.proxy({
	host: 'en.wikipedia.org',
	debug: true
})).listen(8000);
```

Using Express (v4), implementing a multi-origin proxy depending on incoming URL
```js
var express = require('express'),
    froxy = require('froxy'),
    http = require('http');

var app = express();
app.set('port', 8000);

// Github URLs proxy to github.com/leonardw/
app.route('/github/*').get(froxy.proxy({
    host: 'github.com',
    translate: ['/github/', '/leonardw/']
}));

// All other URLs proxy to Wikipedia
app.route('/*').get(froxy.proxy({
    host: 'en.wikipedia.org'
}));

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port', app.get('port'));
});
```


## API

#### .proxy(config)
Creates and returns an HTTP handler that proxies requests to an origin server described by a `config` containing the following properties:
* `host` (optional) : The origin host to proxy to. If omitted, it's the same as the request host.
* `port` (optional) : The origin port to proxy to. When both `host` and `port` are omitted, this acts as a loopback proxy, connecting back on to itself through the same request host and port; if a `host` is provided, this defaults to unset, and hence respect the HTTP implicit defaults, i.e. port 80 for HTTP and 443 for HTTPS.
* `protocol` (optional, `'http'|'https'`) : The protocol to use. If omitted, it's the same as the request protocol.
* `translate` (optional) : A translation rule for the relative path of URL. This may be a two-element array of the form `[prefixPath, tranlatePrefixPath]`
or `[regexPattern, translateTemplate]`, or a custom function with signature `function(url, urlSpec, request)` that returns a translated string URL.
Defaults to no translation, i.e., same as request URL.
* `timeout` (optional) : A timeout, in milliseconds, to wait for response from origin host. Default 5 minutes.
* `access` (optional, `'plain'|'secure'|'any'`) : Limit incoming request access to `plain` or `secure` protocol only. Defaults to `any`.
A redirect (302) to HTTPS response is sent if this is set to `secure` but incoming protocol is HTTP.
* `debug` (optional, `true|false`) : Set to `true` to log useful debug information to console. Defaults to `false`.


Where `translate` is provided as a `function(url, urlSpec, request)`, the calling parameters are
* `url` : The incoming relative request URL string.
* `urlSpec` : The request URL specification of the form `{ host:, port:, protocol:, secure:, url: }`.
* `request` : The request object as provided by Node.

#### .vhost(config)
#### .vhost().reset(config)
#### .vhost().dispatcher
*vhost documentation coming soon...*

##License

(The MIT License)

Copyright (c) 2014 Leonard Wu <leonard.wu92@alumni.ic.ac.uk>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
