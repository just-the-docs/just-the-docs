var test = require('tape')
var missingSupport = require('../lib/missing-support')
var hasKeys = require('./has-keys')

test('provides list of selected browsers', function (t) {
  var data
  data = missingSupport(['ie >= 8'])
    .browsers.sort(function (a, b) {
      return Number(a[1]) - Number(b[1])
    })
  t.deepEqual(data, [
    [
      'ie',
      '8'
    ],
    [
      'ie',
      '9'
    ],
    [
      'ie',
      '10'
    ],
    [
      'ie',
      '11'
    ]
  ])

  t.end()
})

test('for browser request ie >= 7, safari >= 6, opera >= 10.1', function (t) {
  var data = missingSupport([
    'ie >= 7',
    'safari >= 6',
    'opera >= 10.1'
  ]).features

  var bgimgopts = data['background-img-opts']
  hasKeys(t, bgimgopts, ['missing', 'partial', 'title', 'missingData', 'partialData', 'caniuseData'])

  var missing = bgimgopts.missingData
  var partial = bgimgopts.partialData
  hasKeys(t, missing, ['ie'])
  hasKeys(t, missing.ie, ['7', '8'])
  hasKeys(t, partial, ['safari', 'opera'])
  hasKeys(t, partial.safari, ['6', '6.1'])
  hasKeys(t, partial.opera, ['10.0-10.1'])
  t.end()
})

test('partialData only yields features partially supported by selected browser', function (t) {
  var data, f, featureData, p
  data = missingSupport(['ie 8']).features
  var partial = []
  for (p in data) {
    if (data[p].partialData) {
      partial.push(data[p])
    }
  }
  for (f in partial) {
    featureData = partial[f]
    hasKeys(t, featureData.partialData, ['ie'])
  }
  t.end()
})

test('missingData only yields features not supported by selected browser', function (t) {
  var data, f, featureData, m
  data = missingSupport(['ie 8']).features
  var missing = []
  for (m in data) {
    if (data[m].missingData) {
      missing.push(data[m])
    }
  }
  for (f in missing) {
    featureData = missing[f]
    hasKeys(t, featureData.missingData, ['ie'])
  }
  t.end()
})
