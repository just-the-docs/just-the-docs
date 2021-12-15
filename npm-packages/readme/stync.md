stync
=====

Ever have this happen? You've got a bunch of asynchronous code that includes calls to `console.log` (or `process.stdout.write`); and it gets all jumbled because your callbacks fire in non-deterministic order.

This is just a little library to make things a bit more orderly.

Usage
-----

```javascript
var async = require('async'),
    http  = require('http'),
    stync = require('stync');

var urls = [
  "http://www.google.com",
  "http://www.yahoo.com",
  "http://www.amazon.com",
  "http://www.stackoverflow.com",
  "http://www.reddit.com",
  "http://www.github.com",
  "invalid URL"
];

async.each(urls, function(url) {
  // stync.begin indicates you're starting a new line in your output;
  // it returns a message object that you can use to continue writing
  // to the same line. Subsequent messages are queued up so that they will not
  // print until this message is finished.
  var message = stync.begin('Fetching "' + url + '"...');

  var request = http.get(url, function(response) {
    // message.write adds more text to the current line, without progressing to
    // the next message in the queue.
    message.write(' received response (' + response.statusCode + ')...');

    var bytesReceived = 0;

    response.on('data', function(data) {
      bytesReceived += data.length;
    });

    response.on('end', function(data) {
      // message.end terminates the current line. Any subsequent lines (that you
      // started w/ stync.begin) will now be written, when ready, in the order
      // in which they were enqueued.
      message.end(' read ' + bytesReceived + ' bytes');
    });
  });

  request.on('error', function(err) {
    message.end(' ' + err);
  });
});

```

In the above example, all URLs are requested in parallel. Suppose a response is received from the last URL first. Everything will still display properly because each `message` does not write itself to `process.stdout` until its predecessor has called `end`. In effect, messages "wait their turn" so that line-by-line the console output makes sense:

    Fetching "http://www.google.com"... received response (200)... read 44887 bytes
    Fetching "http://www.yahoo.com"... received response (200)... read 92645 bytes
    Fetching "http://www.amazon.com"... received response (200)... read 170218 bytes
    Fetching "http://www.stackoverflow.com"... received response (301)... read 148 bytes
    Fetching "http://www.reddit.com"... received response (200)... read 111658 bytes
    Fetching "http://www.github.com"... received response (301)... read 0 bytes
    Fetching "invalid URL"... Error: connect ECONNREFUSED
