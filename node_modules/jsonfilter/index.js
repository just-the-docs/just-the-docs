var JSONStream = require('JSONStream')
var combiner = require('stream-combiner')
var through = require('through2')

module.exports = function(filter, opts) {
  if (!opts) opts = {}
  var pipeline = [
    JSONStream.parse(filter)
  ]
  
  if (opts.match) {
    pipeline.push(createFunctionStream(opts.match, function(output, object, next) {
      if (!!output) this.push(object)
      next()
    }))
  }
  
  pipeline.push(JSONStream.stringify('', '\n', ''))
  return combiner.apply(null, pipeline)
}

function createFunctionStream(func, customTransform) {
  var funcStr = 'var that = ' + func + ';\n return that;'
  var compiled = new Function(funcStr)
  
  function transform(obj, enc, next) {
    var out = compiled.call(obj, obj)
    if (customTransform) {
      customTransform.call(this, out, obj, next)
    } else {
      this.push(out)
      next()
    }
  }

  return through.obj(transform)
}