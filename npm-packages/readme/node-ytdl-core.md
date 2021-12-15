# node-ytdl-core
[![Dependency Status](https://david-dm.org/fent/node-ytdl-core.svg)](https://david-dm.org/fent/node-ytdl-core)
[![codecov](https://codecov.io/gh/fent/node-ytdl-core/branch/master/graph/badge.svg)](https://codecov.io/gh/fent/node-ytdl-core)
[![Discord](https://img.shields.io/discord/484464227067887645.svg)](https://discord.gg/V3vSCs7)

Yet another youtube downloading module. Written with only Javascript and a node-friendly streaming interface.

# Support
You can contact us for support on our [chat server](https://discord.gg/V3vSCs7)

# Usage

```js
const fs = require('fs');
const ytdl = require('ytdl-core');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

ytdl('http://www.youtube.com/watch?v=A02s8omM_hI')
  .pipe(fs.createWriteStream('video.flv'));
```


# API
### ytdl(url, [options])

Attempts to download a video from the given url. Returns a [readable stream](https://nodejs.org/api/stream.html#stream_class_stream_readable). `options` can have the following keys

* `quality` - Video quality to download. Can be an [itag value](http://en.wikipedia.org/wiki/YouTube#Quality_and_formats), a list of itag values, or `highest`/`lowest`/`highestaudio`/`lowestaudio`/`highestvideo`/`lowestvideo`. `highestaudio`/`lowestaudio`/`highestvideo`/`lowestvideo` all prefer audio/video only respectively. Defaults to `highest`, which prefers formats with both video and audio.

  A typical video's formats will be sorted in the follwing way using `quality: 'highest'`
  ```
  itag container quality codecs                 bitrate  audio bitrate
  18   mp4       360p    avc1.42001E, mp4a.40.2 696.66KB 96KB
  137  mp4       1080p   avc1.640028            4.53MB
  248  webm      1080p   vp9                    2.52MB
  136  mp4       720p    avc1.4d4016            2.2MB
  247  webm      720p    vp9                    1.44MB
  135  mp4       480p    avc1.4d4014            1.1MB
  134  mp4       360p    avc1.4d401e            593.26KB
  140  mp4               mp4a.40.2                       128KB
  ```
  format 18 at 360p will be chosen first since it's the highest quality format with both video and audio.
* `filter` - Used to filter the list of formats to choose from. Can be `audioandvideo` to filter formats that contain both video and audio, `video` to filter for formats that contain video, or `videoonly` for formats that contain video and no additional audio track. Can also be `audio` or `audioonly`. You can give a filtering function that gets called with each format available. This function is given the `format` object as its first argument, and should return true if the format is preferable.
  ```js
  // Example with custom function.
  ytdl(url, { filter: format => format.container === 'mp4' })
  ```
* `format` - Primarily used to download specific video or audio streams. This can be a specific `format` object returned from `getInfo`.
  * Supplying this option will ignore the `filter` and `quality` options since the format is explicitly provided.
* `range` - A byte range in the form `{start: INT, end: INT}` that specifies part of the file to download, ie {start: 10355705, end: 12452856}.
  * This downloads a portion of the file, and not a separately spliced video.
* `begin` - What time in the video to begin. Supports formats `00:00:00.000`, `0ms, 0s, 0m, 0h`, or number of milliseconds. Example: `1:30`, `05:10.123`, `10m30s`.
  * For live videos, this also accepts a unix timestamp or Date, and defaults to `Date.now()`.
  * This option is not very reliable, see [#129](https://github.com/fent/node-ytdl-core/issues/129), [#219](https://github.com/fent/node-ytdl-core/issues/219).
* `liveBuffer` - How much time buffer to use for live videos in milliseconds. Default is `20000`.
* `requestOptions` - Anything to merge into the request options which [miniget](https://github.com/fent/node-miniget) is called with, such as `headers`.
* `highWaterMark` - How much of the video download to buffer into memory. See [node's docs](https://nodejs.org/api/stream.html#stream_constructor_new_stream_writable_options) for more.
* `lang` - The 2 character symbol of a language. Default is `en`.

#### Event: info
* [`ytdl.videoInfo`](example/info.json) - Info.
* [`ytdl.videoFormat`](typings/index.d.ts#L22) - Video Format.

Emitted when the a video's `info` hash is fetched, along with the chosen format metadata to download. `format.url` might be different if `start` was given.

#### Event: response
* [`http.ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse) - Response.

Emitted when the video response has been found and has started downloading or after any successful reconnects. Can be used to get the size of the download.

#### Event: progress
* `number` - Chunk byte length.
* `number` - Total bytes or segments downloaded.
* `number` - Total bytes or segments.

Emitted whenever a new chunk is received. Passes values describing the download progress.

### Stream#destroy()

Call to abort and stop downloading a video.

### ytdl.getBasicInfo(url, [options], [callback(err, info)])

Use this if you only want to get metainfo from a video. If `callback` isn't given, returns a promise.

### ytdl.getInfo(url, [options], [callback(err, info)])

Gets metainfo from a video. Includes additional formats, and ready to download deciphered URL. This is what the `ytdl()` function uses internally. If `callback` isn't given, returns a promise.

### ytdl.downloadFromInfo(info, options)

Once you have received metadata from a video with the `ytdl.getInfo` function, you may pass that information along with other options to this function.

### ytdl.chooseFormat(formats, options)

Can be used if you'd like to choose a format yourself with the [options above](#ytdlurl-options).

```js
// Example of choosing a video format.
ytdl.getInfo(videoID, (err, info) => {
  if (err) throw err;
  let format = ytdl.chooseFormat(info.formats, { quality: '134' });
  if (format) {
    console.log('Format found!');
  }
});
```

### ytdl.filterFormats(formats, filter)

If you'd like to work with only some formats, you can use the [`filter` option above](#ytdlurl-options).

```js
// Example of filtering the formats to audio only.
ytdl.getInfo(videoID, (err, info) => {
  if (err) throw err;
  let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
  console.log('Formats with only audio: ' + audioFormats.length);
});
```

### ytdl.validateID(id)

Returns true if the given string satisfies YouTube's ID format.

### ytdl.validateURL(url)

Returns true if able to parse out a valid video ID.

### ytdl.getURLVideoID(url)

Returns a video ID from a YouTube URL.

### ytdl.getVideoID(str)

Same as the above `ytdl.getURLVideoID()`, but can be called with the video ID directly, in which case it returns it. This is what ytdl uses internally.

## Limitations

ytdl cannot download videos that fall into the following
* Regionally restricted (requires a [proxy](example/proxy.js))
* Private
* Rentals

YouTube intentionally rate limits downloads, particularly audio only formats, likely to prevent bandwidth abuse. The download rate is still faster than a media player can play the video, even on 2x. See [#294](https://github.com/fent/node-ytdl-core/issues/294).

Generated download links are valid for 6 hours, for the same IP address.

## Handling Separate Streams

Typically 1080p or better video does not have audio encoded with it. The audio must be downloaded separately and merged via an appropriate encoding library. `ffmpeg` is the most widely used tool, with many [Node.js modules available](https://www.npmjs.com/search?q=ffmpeg). Use the `format` objects returned from `ytdl.getInfo` to download specific streams to combine to fit your needs. Look at [example/ffmpeg.js](example/ffmpeg.js) for an example on doing this.

## What if it stops working?

Youtube updates their website all the time, it's not that rare for this to stop working. If it doesn't work for you and you're using the latest version, feel free to open up an issue. Make sure to check if there isn't one already with the same error.

If you'd like to help fix the issue, look at the type of error first. The most common one is

    Could not extract signature deciphering actions

Run the tests at `test/irl-test.js` just to make sure that this is actually an issue with ytdl-core.

    mocha test/irl-test.js

These tests are not mocked, and they actually try to start downloading a few videos. If these fail, then it's time to debug.

For getting started with that, you can look at the `extractActions()` function in [`/lib/sig.js`](https://github.com/fent/node-ytdl-core/blob/master/lib/sig.js).


# Install

```bash
npm install ytdl-core@latest
```

Or for Yarn users:
```bash
yarn add ytdl-core@latest
```

If you're using a bot or app that uses ytdl-core, it may be dependent on an older version. Make sure you're installing the latest version of ytdl-core to keep up with the latest fixes.

# Related Projects

- [ytdl](https://github.com/fent/node-ytdl) - A cli wrapper of this.
- [pully](https://github.com/JimmyBoh/pully) - Another cli wrapper of this aimed at high quality formats.
- [ytsr](https://github.com/TimeForANinja/node-ytsr) - YouTube video search results.
- [ytpl](https://github.com/TimeForANinja/node-ytpl) - YouTube playlist and channel resolver.


# Tests
Tests are written with [mocha](https://mochajs.org)

```bash
npm test
```
