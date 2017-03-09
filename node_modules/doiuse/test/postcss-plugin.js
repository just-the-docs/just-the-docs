var fs = require('fs')
var test = require('tape')
var postcss = require('postcss')
var doiuse = require('../')
var atImport = require('postcss-import')
var hasKeys = require('./has-keys')

test('leaves css alone by default', function (t) {
  var css, out
  css = fs.readFileSync(require.resolve('./cases/gradient.css')).toString()
  out = postcss(doiuse({
    browsers: [
      'ie >= 7',
      'safari >= 6',
      'opera >= 10.1'
    ]
  })).process(css).css
  t.equal(out, css)
  t.end()
})

test('calls back for unsupported feature usages', function (t) {
  var count, css
  css = fs.readFileSync(require.resolve('./cases/gradient.css'))
  count = 0
  postcss(doiuse({
    browsers: ['ie 8'],
    onFeatureUsage: function (usageInfo) {
      count++
      hasKeys(t, usageInfo, ['feature', 'featureData', 'usage', 'message'])
      hasKeys(t, usageInfo.featureData, ['title', 'missing', 'missingData', 'caniuseData'])
    }
  }))
    .process(css).then(function () {
      t.equal(count, 4)
      t.end()
    })
})

test('ignores specified features and calls back for the others', function (t) {
  var count, css
  css = fs.readFileSync(require.resolve('./cases/gradient.css'))
  count = 0
  postcss(doiuse({
    browsers: ['ie 8'],
    ignore: [
      'css-gradients'
    ],
    onFeatureUsage: function (usageInfo) {
      count++
      hasKeys(t, usageInfo, ['feature', 'featureData', 'usage', 'message'])
      hasKeys(t, usageInfo.featureData, ['title', 'missing', 'missingData', 'caniuseData'])
    }
  }))
    .process(css).then(function () {
      t.equal(count, 2)
      t.end()
    })
})

test('ignores specified files and calls back for others', function (t) {
  var run, ignoreCss, processCss, pcss
  ignoreCss = fs.readFileSync(require.resolve('./cases/ignore-file.css'))
  processCss = fs.readFileSync(require.resolve('./cases/gradient.css'))
  run = false

  pcss = function () {
    return postcss(doiuse({
      browsers: ['ie 6'],
      ignoreFiles: ['**/ignore-file.css'],
      onFeatureUsage: function (usageInfo) {
        run = true
      }
    }))
  }

  pcss().process(ignoreCss, {from: './cases/ignore-file.css'})
        .then(function () {
          t.false(run, 'should be false')
        })
        .then(function () {
          return pcss().process(processCss, {from: './cases/gradient.css'})
        })
        .then(function () {
          t.true(run, 'should be true')
          t.end()
        })
})

test('ignores rules from some imported files, and not others', function (t) {
  var count, css, cssPath
  cssPath = require.resolve('./cases/ignore-import.css')
  css = fs.readFileSync(cssPath)
  count = 0

  postcss([atImport(),
           doiuse({
             browsers: ['ie 6'],
             ignoreFiles: ['**/ignore-file.css'],
             onFeatureUsage: function (usageInfo) {
               count++
             }
           })])
          .process(css, {from: cssPath})
          .then(function () {
            t.equal(count, 2)
            t.end()
          })
})

test('ignores rules specified in comments', function (t) {
  var count, ignoreCss, ignoreCssPath, processCss, processCssPath
  ignoreCssPath = require.resolve('./cases/ignore-comment.css')
  ignoreCss = fs.readFileSync(ignoreCssPath)

  processCssPath = require.resolve('./cases/ignore-file.css')
  processCss = fs.readFileSync(processCssPath)

  count = 0

  var processor = postcss([atImport(),
           doiuse({
             browsers: ['ie 6'],
             onFeatureUsage: function (usageInfo) {
               count++
             }
           })])

  processor.process(ignoreCss, {from: ignoreCssPath})
    .then(function () {
      t.equal(count, 2)
    }).then(function () {
      processor.process(processCss, {from: processCssPath})
        .then(function () {
          t.equal(count, 3, 'inline css disabing rules must apply only to current file')
          t.end()
        })
    })
})
