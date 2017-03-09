var fs = require('fs')
var path = require('path')
var test = require('tape')
var postcss = require('postcss')
var Detector = require('../lib/detect-feature-use')

/*
 * Parse the feature-key: count lines in the leading comment of
 * each test case fixture.
 */
var parseTestCase = function (cssString) {
  var meta = /\s*\/\*(\s*only)?\s*expect:\s*([a-zA-Z0-9\-:\s\n]*)/
  var matches = cssString.match(meta)
  if (!matches) { return }

  var features = {}
  matches[2].split('\n')
    .filter(function (s) {
      return s.trim().length > 0
    })
    .forEach(function (s) {
      var line = s.replace(/\s*/, '').split(':')
      var feat = line[0]
      var count = +line[1]
      features[feat] = count
    })

  if (Object.keys(features).length > 0) {
    return {
      only: !!matches[1],
      expected: features
    }
  } else {
    return false
  }
}

/**
 * make a spy callback.
 *
 * spy functions save results from calls on `spyFn.results`.
 */
var spy = function () {
  var results = []
  var fn = function (param) {
    var feature = param.feature
    var usage = param.usage
    var obj = {
      feature: feature,
      location: usage.source.start,
      selector: usage.selector,
      property: usage.property,
      value: usage.value
    }

    if (results[feature]) {
      results[feature]
    } else {
      results[feature] = []
    }

    return results[feature].push(obj)
  }
  fn.results = results
  return fn
}

var runTest = function (tc, cssString, expected, only) {
  var features = Object.keys(expected).sort()
  var testFn = only ? test.only.bind(test) : test

  testFn('detecting CSS features (' + tc.replace('.css', '') + ')', function (t) {
    var detector = new Detector(features)
    var cb = spy()
    detector.process(postcss.parse(cssString), cb)

    var res = Object.keys(cb.results).sort()
    for (var feature in expected) {
      if (expected[feature] === 0) {
        t.notOk(cb.results[feature])
      } else {
        t.deepEqual(res, features)
        t.equal(cb.results[feature].length, expected[feature], 'count of ' + feature)
      }
    }

    t.end()
  })
}

var caseFiles = fs.readdirSync(path.join(__dirname, '/cases'))
  .filter(function (tc) { return /\.css$/.test(tc) })

var cases = []
for (var i = 0; i < caseFiles.length; ++i) {
  var tc = caseFiles[i]

  var cssString = fs.readFileSync(path.join(__dirname, 'cases', tc)).toString()
  var parsed = parseTestCase(cssString)
  if (parsed) {
    var testCase = {
      name: tc,
      expected: parsed.expected,
      cssString: cssString
    }
    cases.push(testCase)
  }
}

cases.forEach(function (testCase) {
  runTest(testCase.name, testCase.cssString, testCase.expected, cases.length === 1)
})
