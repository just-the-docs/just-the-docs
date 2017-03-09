#!/usr/bin/env node

var tokenize = require('css-tokenize'),
  duplexer = require('duplexer2'),
  ldjson = require('ldjson-stream'),
  match = require('./lib/match');

module.exports = ruleStream;

function ruleStream() {
  var tokens = tokenize(), rules = match();
  tokens.pipe(rules);
  return duplexer(tokens, rules);
}

if(require.main === module) {
  process.stdin.pipe(ruleStream())
  .pipe(ldjson.serialize())
  .pipe(process.stdout);
}
