# async-depth-first

Depth first traversal for recursive, asynchronous JavaScript functions.

[![Build Status](https://travis-ci.org/cshum/async-depth-first.svg?branch=master)](https://travis-ci.org/cshum/async-depth-first)

```bash
npm install async-depth-first
```

```js
var depthFirst = require('async-depth-first')

var q = depthFirst()
q.defer(function (cb) {
  console.log('1')
  q.defer(function (cb) {
    console.log('1.1')
    q.defer(function (cb) {
      console.log('1.1.1')
      cb()
    })
    cb()
  })
  q.defer(function (cb) {
    console.log('1.2')
    cb()
  })
  cb()
})
q.defer(function (cb) {
  console.log('2')
  cb()
})
q.done(function (err) {
  console.log('done')
})
```

Outputs

```js
1
1.1
1.1.1
1.2
2
done
```

## License

MIT
