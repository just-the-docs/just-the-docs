isomorphic-fetch [![Build Status](https://travis-ci.org/matthew-andrews/isomorphic-fetch.svg?branch=master)](https://travis-ci.org/matthew-andrews/isomorphic-fetch)
================

Fetch for node and Browserify.  Built on top of [GitHub's WHATWG Fetch polyfill](https://github.com/github/fetch).

## Warnings

- This adds `fetch` as a global so that its API is consistent between client and server.

For [ease-of-maintenance and backward-compatibility reasons][why polyfill], this library will always be a polyfill. As a "safe" alternative, which does not modify the global, consider [fetch-ponyfill][].

[why polyfill]: https://github.com/matthew-andrews/isomorphic-fetch/issues/31#issuecomment-149668361
[fetch-ponyfill]: https://github.com/qubyte/fetch-ponyfill

## Why Use Isomorphic Fetch

The Fetch API is currently [not implemented consistently](http://caniuse.com/#search=fetch) across browsers. This module will enable you to use `fetch` in your Node code in a cross-browser compliant fashion. The Fetch API is part of the Web platform API defined by the standards bodies WHATWG and W3C.

## Installation

### NPM

```sh
npm install --save isomorphic-fetch
```

### Bower

```sh
bower install --save isomorphic-fetch
```

## Usage

```js
require('isomorphic-fetch');

fetch('//offline-news-api.herokuapp.com/stories')
	.then(function(response) {
		if (response.status >= 400) {
			throw new Error("Bad response from server");
		}
		return response.json();
	})
	.then(function(stories) {
		console.log(stories);
	});
```

## License

All open source code released by FT Labs is licenced under the MIT licence.  Based on [the fine work by](https://github.com/github/fetch/pull/31) **[jxck](https://github.com/Jxck)**.

## Alternatives

- [cross-fetch](https://github.com/lquixada/cross-fetch#why-not-isomorphic-fetch)
- Using [node-fetch](https://github.com/node-fetch/node-fetch) and the [Fetch polyfill](https://github.com/github/fetch) directly (or from [polyfill.io](https://polyfill.io), or relying on [the browser's implementation of the Fetch API](https://caniuse.com/fetch)).
