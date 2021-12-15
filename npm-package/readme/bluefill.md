# bluefill [![Build Status](https://travis-ci.org/mixer/bluefill.svg?branch=master)](https://travis-ci.org/mixer/bluefill)

Bluefill is a polyfill designed for browsers and TypeScript to add promise utility methods such as those found in [Bluebird](http://bluebirdjs.com). We do not aim for total compatibility with Bluebird or take pains to ensure extremely high performance, rather we optimize for a small browser package based solely on the Promise implementation found in the browser.

The total package size of bluefill is under 500 bytes. We supply the following methods:

 - [`.catch`](http://bluebirdjs.com/docs/api/catch.html) with the ability to filter by Error classes or subclasses, or function predicates.
 - [`.finally`](http://bluebirdjs.com/docs/api/finally.html)
 - [`.map`](http://bluebirdjs.com/docs/api/promise.map.html) (both as a static call and a chainable promise method)
 - [`.tap`](http://bluebirdjs.com/docs/api/tap.html)
 - [`.return`](http://bluebirdjs.com/docs/api/return.html)
 - [`.throw`](http://bluebirdjs.com/docs/api/throw.html)
 - [`.timeout`](http://bluebirdjs.com/docs/api/timeout.html)

