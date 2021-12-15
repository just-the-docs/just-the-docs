# ffmpeg-extract-frames

> Extracts frames from a video using [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg).

[![NPM](https://img.shields.io/npm/v/ffmpeg-extract-frames.svg)](https://www.npmjs.com/package/ffmpeg-extract-frames) [![Build Status](https://travis-ci.com/transitive-bullshit/ffmpeg-extract-frames.svg?branch=master)](https://travis-ci.com/transitive-bullshit/ffmpeg-extract-frames) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ffmpeg-extract-frames
# or
yarn add ffmpeg-extract-frames
```

## Usage

```js
const extractFrames = require('ffmpeg-extract-frames')

// extract 3 frames at 1s, 2s, and 3.5s respectively
await extractFrames({
  input: 'media/1.mp4',
  output: './screenshot-%i.jpg',
  offsets: [
    1000,
    2000,
    3500
  ]
})

// generated screenshots:
// ./screenshot-1.jpg
// ./screenshot-2.jpg
// ./screenshot-3.jpg
```

```js
// default behavior is to extract all frames
await extractFrames({
  input: 'media/1.mp4',
  output: './frame-%d.png'
})

// generated screenshots:
// ./frame-1.png
// ./frame-2.png
// ...
// ./frame-100.png
```

## API

### extractFrames(options)

Extracts one or more frames from a video file. Returns a `Promise` for when all frames have been written.

There are several options for specifying which frames to extract, namely `timestamps`, `offsets`, `fps`, and `numFrames`. The default behavior if you don't specify any of these options is to extract *all* frames from the input.

#### options

##### input

Type: `String`
**Required**

Path or URL to a video file.

##### output

Type: `String`
**Required**

Output file pattern.

Note that for `timestamps` or `offsets`, the pattern should include a `%i` or `%s` ([details](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#screenshotsoptions-dirname-generate-thumbnails)).

For any other call, you should use the `%d` format specifier. I know this is confusing, but it's how [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) works under the hood.

##### offsets

Type: `Array<Number>`

Array of seek offsets to take the screenshot from in milliseconds.

##### timestamps

Type: `Array<Number|String>`

Same as fluent-ffmpeg's [screenshots.timestamps](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#screenshotsoptions-dirname-generate-thumbnails).

##### fps

Type: `Number`

Frames per second to output.

##### numFrames

Type: `Number`

Output a specific number of frames. The input video's frames will be skipped such that only this number of frames are output.

##### log

Type: `Function`
Default: `noop`

Optional function to log the underlying ffmpeg command (like `console.log`).

##### ffmpegPath

Type: `String`

Specify a path for the ffmpeg binary.

## Related

- [ffmpeg-extract-frame](https://github.com/transitive-bullshit/ffmpeg-extract-frame) - Extracts a single frame from a video.
- [ffmpeg-generate-video-preview](https://github.com/transitive-bullshit/ffmpeg-generate-video-preview) - Generates an attractive image strip or GIF preview from a video.
- [gif-extract-frames](https://github.com/transitive-bullshit/gif-extract-frames) - Analogous module for extracting frames from GIF files.
- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) - A fluent API to [FFmpeg](http://ffmpeg.org/).
- [awesome-ffmpeg](https://github.com/transitive-bullshit/awesome-ffmpeg) - A curated list of awesome ffmpeg resources with a focus on JavaScript.

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)

Support my OSS work by <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px"></a>
