var test = require('tape')
var ldj = require('./')
var os = require('os')

test('.parse', function(t) {
  var parser = ldj.parse()
  parser.on('data', function(obj) {
    t.equal(obj.hello, 'world')
    t.end()
  })

  parser.write('{"hello": "world"}\n')
})

test('.parse twice', function(t) {
  var parser = ldj.parse()
  parser.once('data', function(obj) {
    t.equal(obj.hello, 'world')
    parser.once('data', function(obj) {
      t.equal(obj.hola, 'mundo')
      t.end()
    })
  })

  parser.write('{"hello": "world"}\n{"hola": "mundo"}\n')
})

test('.serialize', function(t) {
  var serializer = ldj.serialize()
  serializer.on('data', function(data) {
    t.equal(data, '{"hello":"world"}' + os.EOL)
    t.end()
  })
  serializer.write({hello: 'world'})
})
