# grunt-contrib-imagemin [![Build Status: Linux](https://travis-ci.org/gruntjs/grunt-contrib-imagemin.svg?branch=master)](https://travis-ci.org/gruntjs/grunt-contrib-imagemin) [![Build Status: Windows](https://ci.appveyor.com/api/projects/status/7w491e6edsuanreu/branch/master?svg=true)](https://ci.appveyor.com/project/gruntjs/grunt-contrib-imagemin/branch/master)

> Minify images using [imagemin](https://github.com/imagemin/imagemin)


## Install

```sh
npm install --save-dev grunt-contrib-imagemin
```


## Usage

```js
const mozjpeg = require('imagemin-mozjpeg');

grunt.initConfig({
    imagemin: {
        static: {
            options: {
                optimizationLevel: 3,
                svgoPlugins: [{removeViewBox: false}],
                use: [mozjpeg()] // Example plugin usage
            },
            files: {
                'dist/img.png': 'src/img.png',
                'dist/img.jpg': 'src/img.jpg',
                'dist/img.gif': 'src/img.gif'
            }
        },
        dynamic: {
            files: [{
                expand: true,
                cwd: 'src/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'dist/'
            }]
        }
    }
});

grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.registerTask('default', ['imagemin']);
```


## Options

### optimizationLevel *(png)*

* Type: `number`
* Default: `3`

Select optimization level between `0` and `7`.

> The optimization level 0 enables a set of optimization operations that require minimal effort. There will be no changes to image attributes like bit depth or color type, and no recompression of existing IDAT datastreams. The optimization level 1 enables a single IDAT compression trial. The trial chosen is what OptiPNG thinks it’s probably the most effective. The optimization levels 2 and higher enable multiple IDAT compression trials; the higher the level, the more trials.

Level and trials:

1. 1 trial
2. 8 trials
3. 16 trials
4. 24 trials
5. 48 trials
6. 120 trials
7. 240 trials

### progressive *(jpg)*

* Type: `boolean`
* Default: `true`

Lossless conversion to progressive.

### interlaced *(gif)*

* Type: `boolean`
* Default: `true`

Interlace gif for progressive rendering.

### svgoPlugins *(svg)*

Type: `Array`

Customize which SVGO plugins to use. [More here](https://github.com/sindresorhus/grunt-svgmin#available-optionsplugins).

### use

* Type: `Array`
* Default: `[imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()]`

[Plugins](https://www.npmjs.com/browse/keyword/imageminplugin) to use with imagemin. It comes bundled with the following **lossless** optimizers:

- [gifsicle](https://github.com/imagemin/imagemin-gifsicle) — *Compress GIF images*
- [jpegtran](https://github.com/imagemin/imagemin-jpegtran) — *Compress JPEG images*
- [optipng](https://github.com/imagemin/imagemin-optipng) — *Compress PNG images*
- [svgo](https://github.com/imagemin/imagemin-svgo) — *Compress SVG images*

These are bundled for convenience and most users will not need anything else.

### concurrency

* Type: `number`
* Default: `os.cpus().length`

Control the maximum number of image optimizations that may be performed in parallel.

## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
