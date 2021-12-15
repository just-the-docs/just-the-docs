# vinyl-buffer [![Flattr this!](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=hughskennedy&url=http://github.com/hughsk/vinyl-buffer&title=vinyl-buffer&description=hughsk/vinyl-buffer%20on%20GitHub&language=en_GB&tags=flattr,github,javascript&category=software)[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Convert streaming [vinyl](http://github.com/wearefractal/vinyl) files to use
buffers.

An alternative to [gulp-streamify](http://github.com/nfroidure/gulp-streamify)
that you can pipe to, instead of being required to wrap your streams.

``` javascript
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')
var size = require('gulp-size')
var gulp = require('gulp')

gulp.task('build', function() {
  var bundler = browserify('./index.js')

  return bundler.bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest('dist/'))
})
```

## Usage ##

[![vinyl-buffer](https://nodei.co/npm/vinyl-buffer.png?mini=true)](https://nodei.co/npm/vinyl-buffer)

### `vinylBuffer()` ###

Creates a transform stream that takes vinyl files as input, and outputs
modified vinyl files as output. If `file.isStream()`, `file.contents` will
be converted to a `Buffer` before being emitted again – otherwise, the file
will be emitted immediately.

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/vinyl-buffer/blob/master/LICENSE.md) for details.
