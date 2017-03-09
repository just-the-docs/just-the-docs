var through = require('through2')
var split = require('split2')
var EOL = require('os').EOL

module.exports = parse
module.exports.serialize = serialize
module.exports.parse = parse

function parse(opts) {
  opts = opts || {}
  opts.strict = opts.strict !== false

  function strict(row) {
    if (row) return JSON.parse(row)
  }

  function nonStrict(row) {
    try {
      if (row) return JSON.parse(row)
    } catch(e) {
      // ignore
    }
  }

  return opts.strict ? split(strict) : split(nonStrict)
}

function serialize() {
  return through.obj(function(obj, enc, cb) {
    cb(null, JSON.stringify(obj) + EOL)
  })
}
