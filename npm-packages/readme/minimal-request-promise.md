# Minimal Promise version of HTTPS request

[![Build Status](https://travis-ci.org/gojko/minimal-request-promise.svg?branch=master)](https://travis-ci.org/gojko/minimal-request-promise)

This is a wrapper for the standard HTTPS Node Request object, that provides an A+ Promise interface to request execution and automates the process of assembling the response body as a string. It can handle posting body contents, and automatically rejects the promise if the response code is not between 200 and 399.

The intent of this library is to wrap requests into a promise interface with minimal overhead, with no dependencies, and just expose the standard Node.js arguments.
It's not trying to be a fully-featured replacement for complex workflows, streaming etc. For more complex libraries that can provide all kind of workflows like that, see [request-promise](https://github.com/request/request-promise) and [got](https://github.com/sindresorhus/got).

## Installation

Install using NPM:

```bash
npm install minimal-request-promise
```

[![NPM](https://nodei.co/npm/minimal-request-promise.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/minimal-request-promise/)

## Usage

You can use the standard Node [HTTPS Request Options](https://nodejs.org/api/https.html#https_https_request_options_callback), with the following additional options:

* `body`: `string`, the content to include in the request body when posting
* `resolveErrors`: `boolean`, if true, HTTP error response codes will result in a resolved promise (instead of rejected). Only network errors will result in a rejected promise. If false (default), network errors and successful HTTP requests with an error response code will cause the promise to be rejected.
* `timeout`: `number`, Integer containing the number of milliseconds to wait for a
server to send response headers (and start the response body) before aborting
the request. Note that if the underlying TCP connection cannot be established,
the OS-wide TCP connection timeout will overrule the `timeout` option ([the
default in Linux can be anywhere from 20-120 seconds][linux-timeout]).

If you want to execute a FORM POST, remember to add the [`Content-Length` header](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.13) as well. This library intentionally does not automatically add that, to keep the interface in line with standard Node.JS requests.

## Example

```javascript

var requestPromise = require('minimal-request-promise'),
  options = {
    method: 'POST',
    hostname: 'graph.facebook.com',
    path: '/v2.6/me/messages?access_token=' + fbAccessToken,
    port: 443,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipient: {
        id: recipient
      },
      message: message
    })
  };

requestPromise(options).then(
  function (response) {
    console.log('got response', response.body, response.headers);
  },
  function (response) {
    console.log('got error', response.body, response.headers, response.statusCode, response.statusMessage);
  }
);

```

## GET, POST, PUT and DELETE method shortcuts

In addition to using the standard Node.js request parameters, you can also generate basic parameters from URLS for GET and POST using the helper methods. The helper methods are `.get`, `.post`, `.put` and `.delete` and they expect the following arguments:

* `url`: `string`, a URL to GET, POST, PUT or DELETE to
* `options`: _(optional)_ `object`, key-value map of additional options, described in the [Usage](#usage) section
* `Promise`: _(optional)_ `Function`, an alternate Promise implementation. See [Using with a different Promise library](#using-with-a-different-promise-library).

Example:

```javascript
var requestPromise = require('minimal-request-promise'),
  options = {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipient: {
        id: recipient
      },
      message: message
    })
  };

requestPromise.post('https://graph.facebook.com/v2.6/me/messages?access_token=' + fbAccessToken, options).then(
  function (response) {
    console.log('got response', response.body, response.headers);
  },
  function (response) {
    console.log('got error', response.body, response.headers, response.statusCode, response.statusMessage);
  }
);
```

## Using with a different Promise library

By default, this library uses the built-in `Promise` from Node.js. If you'd like to use a different A+ Promise library, just pass it in as the second argument. For example:

```javascript
var bluebird = require('bluebird'),
  requestPromise = require('minimal-request-promise'),
  options = {
   // some options here ...
  };
requestPromise(options, bluebird).then(report);
```

## License

MIT
