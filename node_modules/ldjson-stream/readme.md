# ldjson-stream

#### streaming line delimited json parser + serializer

[![NPM](https://nodei.co/npm/ldjson-stream.png)](https://nodei.co/npm/ldjson-stream/)

## usage

```
var ldj = require('ldjson-stream')
```

#### ldj.parse()

returns a transform stream that accepts newline delimited json and emits objects

example newline delimited json:

`data.txt`:

```
{"foo": "bar"}
{"hello": "world"}
```

If you want to discard non-valid JSON messages, you can call `ldj.parse({strict: false})`

usage:

```js
fs.createReadStream('data.txt')
  .pipe(ldj.parse())
  .on('data', function(obj) {
    // obj is a javascript object
  })
```

#### ldj.serialize()

returns a transform stream that accepts json objects and emits newline delimited json

example usage:

```js
var serialize = ldj.serialize()
serialize.on('data', function(line) {
  // line is a line of stringified JSON with a newline delimiter at the end
})
serialize.write({"foo": "bar"})
serialize.end()
```

### license

BSD
