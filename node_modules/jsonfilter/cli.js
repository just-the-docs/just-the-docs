#!/usr/bin/env node

var fs = require('fs')
var minimist = require('minimist')
var args = minimist(process.argv.slice(2))
var jsonfilter = require('./')
var firstArg = args._[0]
process.stdin.pipe(jsonfilter(firstArg, args)).on('data', function(o) {
  process.stdout.write(o)
}).on('end', function() {
  console.log('') // trailing newline
})
