# videojs-flvjs

Video.js tech to use [flv.js](https://github.com/Bilibili/flv.js) for FLV playback using MSE instead of Flash.

Check out the flv.js docs for details on its capabilities, browser support etc. Note that you need [CORS headers](https://github.com/Bilibili/flv.js/blob/master/docs/cors.md) if your video is being hosted at a different origin.

[Example](https://mister-ben.github.io/videojs-flvjs/)

## Installation

```sh
npm install --save videojs-flvjs
```

## Usage

You need to include [flv.js](https://github.com/Bilibili/flv.js) itself.

```html
<!-- Video.js -->
<link href="//path/to/video-js.css" rel="stylesheet">
<script src="//path/to/video.min.js"></script>
<!-- flv.js -->
<script src="//path/to/flv.min.js"></script>
<!-- videojs-flvjs -->
<script src="//path/to/videojs-flvjs.min.js"></script>
<video id="videojs-flvjs-player" class="video-js vjs-default-skin" controls>
  <source src="movie.flv" type='video/x-flv'>
</video>
<script>
  // For v5 the tech must be added to the tech order.
  // For v6 this is not needed.
  videojs('videojs-flvjs-player', {
    techOrder: ['html5', 'flvjs'],
    flvjs: {
      mediaDataSource: {
        isLive: true,
        cors: true,
        withCredentials: false,
      },
      // config: {},
    },
  });
</script>
```

## License

Apache-2.0. Copyright (c) mister-ben

[videojs]: http://videojs.com/
