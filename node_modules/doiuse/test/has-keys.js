module.exports = hasKeys
function hasKeys (t, object, keys) {
  var objectKeys = Object.keys(object).sort()
  var expectedKeys = [].concat(keys).sort()
  return t.deepEqual(objectKeys, expectedKeys)
}
