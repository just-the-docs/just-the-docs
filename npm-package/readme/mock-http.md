# mock-http

[![NPM version](https://badge.fury.io/js/mock-http.svg)](https://npmjs.com/package/mock-http)
[![Build Status](https://secure.travis-ci.org/commenthol/mock-http.svg?branch=master)](https://travis-ci.org/commenthol/mock-http)

> Mock http request response

This module provides a mock to the server side request and response classes without the need of creating a socket.
The full API as documented on <http://nodejs.org/api/http.html> is supported.

All methods can be used to mock a client requests on the server as well as server responses such allowing to unit-test e.g. connect middleware.


## Table of Contents

<!-- !toc (minlevel=2 omit="Table of Contents") -->

* [Request](#request)
* [Response](#response)
* [Usage](#usage)
* [Documentation](#documentation)
* [Contribution and License Agreement](#contribution-and-license-agreement)
* [License](#license)

<!-- toc! -->

## Request

Mock implementation of Class [http.IncomingMessage](http://nodejs.org/api/http.html#http_http_incomingmessage)

It behaves like the class, apart from really handling a socket. I.e. it implements the Readable Stream Class as well.
All methods can be used to mock a client request on the server such allowing to unit-test e.g. connect middleware


## Response

Mock implementation of Class [http.ServerResponse](http://nodejs.org/api/http.html#http_class_http_serverresponse)

It behaves like the class, apart from really handling a socket. I.e. it implements the Writable Stream Class as well.
All methods can be used to mock a server response such allowing to unit-test e.g. connect middleware

States are stored in the internal object `Response._internal` and can be queried from your unit-tests

```js
_internal: {
  headers: {},             // {Object}  Response headers
  trailers: {},            // {Object}  Trailing Response headers
  buffer: Buffer.from(''), // {Buffer}  Internal buffer represents response body
  timedout: false,         // {Boolean} If true than `Response.setTimeout` was called.
  ended: false,            // {Boolean} If true than `Response.end` was called.
}
```

## Usage

This is a unit-test using mocha which illustrates the usage. The example can be found in [./test/index.mocha.js](./test/index.mocha.js)

```js
describe('example', function(){
    // a middleware function under test
    var middleware = function(req, res, next) {
        var regex = /^(?:\/test)(\/.*|$)/;
        req.params = '';

        req.on('data', function(data){
            req.params += data; // a simple body parser
        });
        req.on('end', function(){
            if (regex.test(req.url)) {
                req.url = req.url.replace(regex, '$1') || '/';
                res.writeHead(200, { 'Cache-Control': 'max-age=300'});
                res.write('this is a test');
                res.end();
            }
            else {
                next && next();
            }
        });
    };
    it('shall respond with a 200', function(done){
        var req = new mock.Request({
                    url: '/test',
                    method: 'POST',
                    buffer: Buffer.from('name=mock&version=first')
                });
        var res = new mock.Response({
                onEnd: function() {
                    // the test ends here
                    assert.equal(req.url, '/');
                    assert.equal(req.params, 'name=mock&version=first');
                    assert.equal(res.statusCode, 200);
                    assert.equal(res.headersSent, true);
                    assert.equal(res.getHeader('Cache-Control'), 'max-age=300');
                    assert.equal(res.hasEnded(), true);
                    done();
                }
            });
        middleware(req, res, function(){
            assert.equal('test never', 'reaches here');
        });
    });
    it('shall call next middleware', function(done){
        var req = new mock.Request({
                    url: '/other',
                    method: 'POST',
                    buffer: Buffer.from('name=mock&version=first')
                });
        var res = new mock.Response({
                onEnd: function() {
                    assert.equal('test never', 'reaches here');
                }
            });
        middleware(req, res, function(){
            // the test ends here
            assert.equal(req.url, '/other');
            assert.equal(res.headersSent, false);
            assert.equal(res.hasEnded(), false);
            done();
        });
    });
});
```

## Documentation

Documentation can be found in [./doc](./doc/index.html).


## Contribution and License Agreement

If you contribute code to this project, you are implicitly allowing your code
to be distributed under the MIT license. You are also implicitly verifying that
all code is your original work.

* `npm test` - runs the tests
* `npm run lint` - runs jshint for linting
* `npm run doc` - generates the docs in ./doc - requires `npm i -g jsdoc`

## License

Copyright (c) 2014-present Commenthol. (MIT License)

See [LICENSE][] for more info.

[LICENSE]: ./LICENSE
