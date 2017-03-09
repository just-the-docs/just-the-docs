var through = require('through2')
var duplexer = require('duplexer2')
var rules = require('css-rule-stream')
var sourcemap = require('source-map')

var postcss = require('postcss')
var doiuse = require('./')

module.exports = stream

/**
 * @param {Object} options (browsers, ignore, etc.)
 * @param {string} [filename]  Filename for outputting source code locations.
 */
function stream (options, filename) {
  var inp = rules()
  filename = filename || '<streaming css input>'

  var processor

  var out = through.obj(write)
  var duplex = duplexer(inp, out)

  try {
    processor = postcss([doiuse({
      browsers: options.browsers,
      ignore: options.ignore,
      onFeatureUsage: pushUsage
    })])

    inp.pipe(out)
  } catch (e) {
    setImmediate(function () { duplex.emit('error', e) })
  }

  return duplex

  function write (rule, enc, next) {
    try {
      var mapper = new sourcemap.SourceMapGenerator()

      var lines = rule.content.split('\n')
      var oline = rule.line
      var ocol = rule.column
      for (var line = 0; line < lines.length; line++) {
        mapper.addMapping({
          generated: { line: line + 1, column: 1 },
          original: { line: oline, column: ocol },
          source: filename
        })
        mapper.addMapping({
          generated: { line: line + 1, column: lines[line].length },
          original: { line: oline, column: ocol + lines[line].length },
          source: filename
        })
        oline++
        ocol = 1
      }

      processor.process(rule.content, { map: { prev: mapper.toString() } })
        .then(function (result) { next() })
        .catch(handleError)
    } catch (e) {
      handleError(e)
    }

    function handleError (error) {
      if (options.skipErrors) {
        duplex.emit('warning', error)
        next()
      } else {
        next(error)
      }
    }
  }

  function pushUsage (usage) {
    out.push(usage)
  }
}
