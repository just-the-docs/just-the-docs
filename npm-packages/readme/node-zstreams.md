# zstreams

![Travis CI Status](https://travis-ci.org/crispy1989/node-zstreams.svg?branch=master)

A utility library to make node streams easier to work with, also including some utility streams.

Table of Contents
=================

* [Why](#why)
* [Basic Usage](#basic-usage)
* [Requiring Object](#requiring-object)
* [Converting Native Streams](#converting-native-streams)
* [Treat Arrays as Streams](#treat-arrays-as-streams)
* [Easy Transforms](#easy-transforms)
* [Through Methods](#through-methods)
* [Promises and Callbacks](#promises-and-callbacks)
* [HTTP Requests](#http-requests)
* [Stream Destruction and Cleanup](#stream-destruction-and-cleanup)
* [Error Handling](#error-handling)
* [Event Streams](#event-streams)
* [Other Useful Functions](#other-useful-functoins)
* [Simplified Constructors](#simplified-constructors)
* [Utility Streams](#utility-streams)
	* [ArrayReabableStream](#arrayreadablestream)
	* [ArrayWritableStreams](#arraywritablestream)
	* [BatchStream](#batchstream)
	* [BlackholeStream](#blackholestream)
	* [CompoundDuplex](#compoundstream)
	* [ConsoleLogStream](#consolelogstream)
	* [EventReadableStream](#eventreadable)
	* [EventWritableStream](#eventwritable)
	* [EventTransformStream](#eventtransform)
	* [FileBufferStream](#filebufferstream)
	* [FilterStream](#filterstream)
	* [SkipStream](#skipstream)
	* [LimitStream](#limitstream)
	* [FunctionStream](#functionstream)
	* [IntersperseStream](#interspersestream)
	* [PluckStream](#pluckstream)
	* [RequestStream](#requeststream)
	* [SplitStream](#splitstream)
	* [StringReadableStream](#stringreadablestream)
	* [StringWritableStream](#stringwritablestream)
	* [ThroughStream](#throughstream)
* [Classic Streams](#classic-streams)
	* [ClassicReadable](#classicreadable)
	* [ClassicWritable](#classicwritable)
	* [ClassicDuplex](#classicduplex)

Why
===

Streams are a great tool in Node.JS, but the native streams framework leaves a lot to be desired.  Even basic tasks
like error handling on a chain of piped streams become complex and difficult to get right.  ZStreams aims to make
Node streams easy to work with.

Features include:

- Compatibility with Node.JS streams (zstreams streams inherit from the native streams).
- Easy error handling; errors in pipe chains are automatically passed downstream.  Unhandled errors
result in automatic stream destruction.
- Easy wrapper around native streams (streams1, streams2, and streams3) to convert to a consistent
zstreams interface.
- Easy integration into code flow; convert a stream's result into a callback, or promise.
- Convenience methods for common tasks instead of requiring subclassing a transform stream.
- A large toolkit of commonly used streams to avoid reimplementing the same thing repeatedly.
- And more!

Basic Usage
===========

Requiring Object
----------------

````javascript
var zstreams = require('zstreams');
var Writable = zstreams.Writable,
	Readable = zstreams.Readable,
	Duplex = zstreams.Duplex,
	Transform = zstreams.Transform,
	PassThrough = zstreams.PassThrough;
````

The base zstreams function like, and inherit from, the native Node.JS streams.  They mostly behave like their
parents, with error handling and convenience streams.

Converting Native Streams
-------------------------

````javascript
var fs = require('fs');
var readStream = zstreams(fs.createReadStream('./file.txt'));
// Also equivalent to:
var readStream = zstreams.fromFile('./file.txt');
````

Note that if you use `Readable.pipe()` on a zstream, it will automatically convert the destination to a zstream, so you
only need to explicitly convert the first stream in a chain.

Treat Arrays as Streams
-----------------------

````javascript
var array = [1, 2, 3, 4, 5];
new zstreams.ArrayReadableStream(array).pipe(new zstreams.ConsoleLogStream());
zstreams.fromArray(array).pipe(new zstreams.ConsoleLogStream());
new zstreams.ArrayReadableStream(array).pipe(something).pipe(somethingelse).toArray(function(error, resultArray) {

});
````

The `toArray()` method takes a callback that is called once, either on first error in the stream chain or with the result array.

Easy Transforms
---------------

````javascript
zstreams(fs.createReadStream('./test.txt')).throughSync(function(chunk) {
	return chunk.toString('utf8').toUpperCase();
}).pipe(fs.createWriteStream('./uppercase.txt'));
// Instead of .pipe(...) you can also do .intoFile('./uppercase.txt')
````

Through Methods
---------------

A set of `through` methods are available on readables to easily transform data.  They create a Transform stream, use the supplied
function to transform the data, pipe to the Transform stream, and return the Transform stream.  The created Transform implicitly has
its writableObjectMode set to the source stream's readableObjectMode, and the Transform's readableObjectMode depends on the variant
of call used.

````javascript
// Data to Data, Synchronous
readable.throughSync(function(chunk, encoding) {
		//...
		return resultData;
});

// Object to Object, Synchronous
readable.throughSync(function(object) {
	//...
	return resultObject;
});

// Data to Object, Synchronous
readable.throughObjSync(function(chunk, encoding) {
	//...
	return resultObject;
});

// Object to Data, Synchronous
readable.throughDataSync(function(object) {
		//...
		return resultData;
});

// Data to Data, Asynchronous
readable.through(function(chunk, encoding, cb) {
		//...
		cb(null, resultData);
});

// Object to Object, Asynchronous
readable.through(function(object, cb) {
	//...
	cb(null, resultObject);
});

// With a promise
readable.through(function(object) {
	return new Promise(...);
});

// Automatic synchronous return
readable.through(function(object) {
	return resultObject;
});

// Data to Object, Asynchronous
readable.throughObj(function(chunk, encoding, cb) {
	//...
	cb(null, resultObject);
});

// Object to Data, Asynchronous
readable.throughDataSync(function(object, cb) {
		//...
		cb(null, resultData);
});
````

The synchronous variants can also throw exceptions, which are converted to stream errors.

Promises and Callbacks
----------------------

Get the results of a stream chain as a callback or promise.

```js
myWritableStream.intoCallback(function(error) {
});

myWritableStream.intoPromise().then(function() {
}, function(error) {
});

myReadableObjectStream.intoArray(function(error, array) {
});

myReadableObjectStream.intoArray().then(function(array) {
}, function(error) {
});

myReadableDataStream.intoString(function(error, string) {
});

myReadableDataStream.intoString().then(function(string) {
}, function(error) {
});

myReadableDataStream.intoFile('filename', function(error) {
});

myReadableDataStream.intoFine('filename').then(function() {
}, function(error) {
});
```

HTTP Requests
-------------

If you install the optional dependency `request` via `npm install request`, you can use the zstreams request extensions.  These
extensions provide the following benefits:
* An actual streams2 interface
* Treating certain HTTP codes as errors
* Automatically reading in the response body on error instead of streaming it as if it were a legitimate response
* All the other benefits of a zstreams stream

A zstreams `RequestStream` is a Duplex stream and can be piped from or to (in the case of sending a body to the server).

````javascript
zstreams.request('http://www.google.com').intoFile('/tmp/output.html', function(error) {
	// If any status code other than 200 was returned, the error will be thrown.  Additionally, the
	// entire response body for the error response will be available as error.responseBody .
});

// Or pass your request directly into zstreams to automatically convert
zstreams(request('http://www.google.com')).intoFile('/tmp/output.html', function(error) {
	// ...
});

// You can also override the default options
zstreams.request({
	url: 'http://www.google.com',
	allowedStatusCodes: [200],	// treat 200 as the only valid response code
	readErrorResponse: false	// disable reading the whole response body on error
}).intoFile('/tmp/output.html', function(error) {
	// ...
});
````

Stream Destruction and Cleanup
------------------------------

When zstreams wants a stream to stop in its tracks and abort, it will call the `_abortStream()` method.  Implement this to
do any cleanup necessary to stop current operations, such as closing file handles and whatnot.

Error Handling
--------------

When an `error` event is emitted from any zstreams, the stream will emit a `chainerror` event on itself as well as all
streams connected to it via pipes.  This allows for error handling in one spot, like:

````javascript
zstreams(fs.createReadStream('./test.txt')).throughSync(function(chunk) {
	return chunk.toString('utf8').toUpperCase();
}).pipe(fs.createWriteStream('./uppercase.txt')).on('chainerror', function(error) {
	// Handle error
});
````

If you manually assign an `error` event handler to a stream in the chain, errors on that stream will *not* cause `chainerror`
events to be emitted, and will bypass zstreams' error handling.  Additionally, if a `chainerror` event is fired, and there are
no handlers registered for it in the entire stream chain, zstreams will emulate the Node.JS default `error` event behavior
and exit.

By default, after the `chainerror` event is fired, the `abortChain()` method is called, which unpipes everything in the chain,
repipes all Readables to blackhole streams, and calls `_abortStream()` on each stream.  If you want to recover from an error, you
must call `this.ignoreError()` inside of the `chainerror` handler.  This will suppress that error behavior.

If you are making use of conditionally ignored errors, you may also want to make use of the 'unignorederror' event.  This event
is emitted on every stream in a chain immediately before the chain is destructed on unignored error.

The following options are also available for error handling:

````javascript
// Equivalent to stream.once('chainerror', ...), except that the event handler is not unregistered after the handler
// is called the first time (it just becomes a no-op).  This prevents the application from crashing if there is more
// than one stream error.
stream.firstError(function(error) {
	...
});

// This similar function is only available on Writable streams.  The given callback is called either on error or when the
// Writable emits `finish`.  In either case, it is guaranteed to be only called once.
writable.intoCallback(function(error) {

});
````

Event Streams
-------------

zstreams contains a few streams that operate on events pass through the stream.  Internally, events are just converted into
objects and passed through an object stream.  These event streams are useful because they present an EventEmitter and crisphooks
interface.

If you need to access the stream as a plain object stream, you can use the event objects passed along.  They follow this format:
````javascript
{
	"type": "Event Type",
	"args": ["Argument 1", "Argument 2"]
}
````

Here's a basic example:
````javascript
var emitter = new EventEmitter();

// Construct an EventReadable stream that listens for events testEvent1 and testEvent2 on emitter
// and translates them into stream objects
new EventReadable(emitter, [ 'testEvent1', 'testEvent2' ])
	// Pipe that through an event transform that emits some other events in response to the first events
	.pipe(new EventTransform()
		.on('testEvent1', function(val) {
			this.pushEvent('testEvent3', val + 1);
		})
		.on('testEvent2', function(val) {
			this.pushEvent('testEvent4', val + 1);
		})
	// Pipe that into an event writable to do something with the events
	).pipe(new EventWritable()
		.on('testEvent3', function(val) {
			// Do something with testEvent3
		})
		.on('testEvent4', function(val) {
			// Do something with testEvent4
		})
	).intoCallback(function(error) {
		// Stream finished
	});

	emitter.emit('testEvent1', 1);
	emitter.emit('testEvent2', 2);
	emitter.emit('end');

});
````

Other Useful Functions
----------------------

````javascript
// List streams piping to this stream
writable.getUpstreamStreams();

// Check whether or not this stream accepts object
writable.isWritableObjectMode();

// Similar to .firstError() but called on the first 'finish' event
writable.firstFinish(function() { ... });

// .tee() is like .pipe(), except that .tee() returns the first stream (in this case, 'readable') rather than the
// stream being piped to
readable.tee(writable).pipe(otherwritable);

readable.getDownstreamStreams();

readable.isReadableObjectMode();

// Causes the chainerror behavior to be enacted with the given error
stream.triggerChainError(error);

// Causes the whole chain to be aborted according to the behavior described in error handling above
stream.abortChain();

// Causes this stream's _abortStream() method to be called
stream.abortStream();

// Returns true if the stream can be read from
stream.isReadable();

// Returns true if the stream can be written to
stream.isWritable();
````

Simplified Constructors
-----------------------

Zstreams supports iojs simplified stream constructors as seen [here](https://iojs.org/api/stream.html#stream_simplified_constructor_api).

````javascript
var writeStream = new Writable({
	objectMode: true,
	write: function(chunk, encoding, cb) {
		cb();
	},
	flush: function(cb) {
		cb();
	}
});

var duplexStream = new Duplex({
	write: function(chunk, encoding, cb) {
		cb();
	},
	read: function() {

	},
	flush: function(cb) {
		cb();
	}
});
````

Utility Streams
---------------

zstreams also provides several utility streams on the zstreams object which may come in handy.

ArrayReadableStream
-------------------

This is a readable object stream which will stream the object in an array.  It is the stream used by `zstreams.fromArray()`.

````javascript
var arrayReadableStream = new zstreams.ArrayReadableStream([1, 2, 3, 4]);
arrayReadableStream.pipe(...);
````

ArrayWritableStream
-------------------

This is a writable object stream which will store all objects it receives into an array.

````javascript
var arrayReadableStream = new zstreams.ArrayReadableStream([1, 2, 3, 4]);
var arrayWritableStream = new zstreams.ArrayWritableStream();
arrayReadableStream.pipe(arrayWritableStream).intoCallback(function() {
	var array = arrayWritableStream.getArray();
});
````

BatchStream
-----------

This stream receives a stream of objects and generates a stream of arrays of batches of these objects.  Its
constructor takes a parameter of the size of each batch.

````javascript
zstreams
	.fromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
	.pipe(new zstreams.BatchStream(3))
	.intoArray(function(error, array) {
		// array is: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
	});
````

BlackholeStream
---------------

Anything piped into this stream is discarded.

CompoundDuplexStream
--------------------

This stream allows you to construct a stream from a set of component streams piped together, acting as a single stream.
The readableObjectMode and writableObjectMode of the CompoundDuplex stream are automatically determined.

````javascript
function NewlineSeparatedJSONParser() {
	zstreams.CompoundDuplex.call(this,
		new SplitStream(/\r?\n/)
		.throughSync(function(chunk) {
			return JSON.parse(chunk);
		})
		.filterSync(function(obj) {
			return obj !== null;
		})
	);
}
util.inherits(NewlineSeparatedJSONParser, zstreams.CompoundDuplex);

zstream.fromFile('newlineJsonStream.txt').pipe(new NewlineSeparatedJSONParser()).intoArray(function(error, array) {
	// ...
});
````

ConsoleLogStream
----------------

Anything piped to this Writable will be logged out using console.log().  Takes the same parameters as Writable,
notably the `objectMode` option should be set if it's logging objects.

````javascript
zstreams(fs.createReadStream('in.txt')).tee(new zstreams.ConsoleLogStream()).pipe(fs.createWriteStream('out.txt'));
````

EventReadable
-------------

Given an EventEmitter, creates objects for each event.

EventWritable
-------------

Given a stream of event objects, emits events/crisphooks for each event object.

EventTransform
--------------

Transforms input events and outputs more events.

FileBufferStream
----------------

Acts as a passthrough stream that buffers all incoming data to disk.  This is useful to prevent
a slow stream consumer from causing a fast data provider (such as an http request) to time out.

FilterStream
------------

The asynchronous streaming equivalent of `Array.prototype.filter()`.

````javascript
zstreams.fromArray([1, 2, 3]).pipe(new zstreams.FilterStream(function(obj, cb) {
	cb(null, obj >= 2);
})).intoArray(function(error, array) {
	// array is [2, 3]
});
````

SkipStream
----------

Skip over objects/bytes from a Readable stream

```javascript
zstreams.fromArray([1, 2, 3, 4])
	.pipe(new zstreams.SkipStream(2, { objectMode: true })
	.intoArray(function(error, array) {
		// array is [3, 4]
	});
```

LimitStream
-----------

Limit objects/bytes from a Readable stream

```javascript
zstreams.fromArray([1, 2, 3, 4])
	.pipe(new zstreams.LimitStream(2, { objectMode: true })
	.intoArray(function(error, array) {
		// array is [1, 2]
	});
```

FunctionStream
--------------

Takes a function with a callback and pushes its output on read.
ObjectMode will always be true.

```
FunctionStream(function(cb) {
	var ret = null;
	if(times++ < 400) {
		ret = 'a';
	}
	cb(null, ret);
}).intoArray(function(error, array) {
	// array has length 400
});
```

IntersperseStream
-----------------

Intersperses a seperator between chunks in the stream

```
var readStream = new Readable({ objectMode: false });
	readStream._read = function() {
		this.push('a');
		this.push('b');
		this.push('c');
		this.push('d');
		this.push(null);
	};
	var is = new IntersperseStream(' ');
	readStream.pipe(is).intoString(function(error, string) {
		// string is now equal to 'a b c d'
	});
```

PluckStream
-----------

Plucks a property from an incoming object. If the property doesn't exist, the object will be skipped.
Returns an array.
ObjectMode will always be true.

```
var readStream = new Readable({ objectMode: true });
readStream._first = true;
readStream._read = function() {
	this.push({ a: 'a', value: 'b' });
	this.push({});
	this.push({ a: 'b' });
	this.push({ a: 'c', value: 'another_val' });
	this.push({ a: 'd' });
	this.push(null);
};
var ps = new PluckStream('a');
readStream.pipe(ps).intoArray(function(error, array) {
	// array will look something like this: ['a', 'b', 'c', 'd'] order not guaranteed
});
```

RequestStream
-------------

This stream exists for the sole purpose of wrapping the commonly used npm module
'request' to make it act like a real duplex stream.  The "stream" it returns is
not a real streams2 stream, and does not work with the zstreams conversion methods.

This class will emit errors from the request stream and will also emit the 'response'
event proxied from the request stream.  Additionally, it will emit errors if an error
response code is received (see options.allowedStatusCodes) .  Error emitted because
of a disallowed status code will, by default, read in the entire response body before
emitting the error, and will assign error.responseBody to be the response body.

```
new RequestStream(stream, options);
```

SplitStream
-----------

Splits the incoming data stream based on a delimiter.
writableObjectMode will always be false and readableObjectMode will always be true.

```
var readStream = new Readable({ objectMode: false });
readStream._read = function() {
	this.push('qqqqqq qqqqqq qqqqqq qqqqqq qqqq');
	this.push('qq qqqqqq qqqqqq qqqqqq');
	this.push(null);
};
var ss = new SplitStream(' ');
readStream.pipe(ss).intoArray(function(error, array) {
	// each element in the array will equal 'qqqqqq'
});
```

StringReadableStream
--------------------

A readable string that outputs data from a string given to the constructor.

```
var srs = new StringReadableStream('abcd');
srs.intoString(function(err, str) {
	// str is equal to 'abcd'
});
```

StringWritableStream
--------------------

Collects a buffer of objects being passed in to turn into a string.

```
var readStream = new Readable({ objectMode: false });
readStream._read = function() {
	this.push('a');
	this.push('b');
	this.push('c');
	this.push('d');
	this.push(null);
};
var sws = new StringWritableStream({ objectMode: false });
readStream.pipe(sws).intoCallback(function(error) {
	var str = sws.getString();
	// str will equal 'abcd'
});
```

ThroughStream
-------------

A ThroughStream is an easy way to transform data.

```
var readStream = new Readable({ objectMode: false });
readStream._read = function() {
	this.push('a');
	this.push('b');
	this.push('c');
	this.push('d');
	this.push(null);
};
readStream.pipe(new ThroughStream(function(chunk, enc, cb) {
		transformFunc.call(this, chunk, cb);
	}, {
		writableObjectMode: this.isReadableObjectMode(),
		readableObjectMode: (objectMode !== undefined) ? objectMode : this.isReadableObjectMode()
	}));
```
Classic Streams
===============

ClassicReadable
---------------

Wrap a classic "readable" (Streams1) stream

```javascript
new zstreams.ClassicReadable(readable, { objectMode: true }).intoArray(function(error, array) {
	// Do something with the array
});
```

ClassicWritable
---------------

Wrap a classic "writable" (Streams1) stream

```javascript
zstreams.fromArrray([1, 2, 3, 4]).pipe(new ClassicWritable(writable, { objectMode: true })).intoCallback(function(error) {
	// Do something
});
```

ClassicDuplex
-------------

Wrap a classic "duplex" (Streams1) stream

```javascript
zstreams.fromArray([1, 2, 3, 4]).pipe(new ClassicDuplex(duplex, { objectMode: true })).intoArray(function(error, array) {
	// array is [1, 2, 3, 4]
});
```
