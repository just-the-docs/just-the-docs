subplay
=======

## Motivation

I needed a simple parser/player of .srt files.

### Installing with NPM

```bash
npm install -S subplay
```

### Installing with Bower

```bash
bower install -S subplay
```

## Usage

```javascript
var subplay = require('subplay');

// get hold of an srt as a string
var srt = fs.readFileSync('./mysubs.srt', 'utf-8');

// the second argument is a renderer funtion which
// will be called for every update that is to be
// made to the subtitles.
var update = subplay(srt, function(text) {
    // text is either an (html formatted) text
    // or '' when clearing
    // example of updating a div using jQuery
    $('#mysubholder').html(text);
});

// pass the current time to the update function which
// takes current time in seconds with fractions.
$('video').on('timeupdate', function(ev) {
    // this is 20.5 sec for 20 seconds and a bit into the video
    update(ev.target.currentTime);
});
```

## API

`update = subplay(srt, renderer, opts)` where `srt` is the srt to be played as a
string and `renderer` is a function that will be called every time
there is an update to be made. returns an `update` function which is used
to control where the srt is playing.

`opts.millis` whether the time passed to the update-function are in
millis. otherwise assumed to be seconds. defaults to `false`

`update(time)` start/update the time position of the srt player. the
time passed is in millis or seconds depending on `opts.millis`. a
negative value stops the player. this method can be called as many
times as needed. it will reset/resync the player to whatever position
is passed as argument.

License
-------

The MIT License (MIT)

Copyright © 2015 Martin Algesten

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
