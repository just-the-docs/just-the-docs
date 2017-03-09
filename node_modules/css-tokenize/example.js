
var tokenize = require('./'),
  through = require('through2'),
  fs = require('fs');
  
var input = process.argv[2] ? fs.createReadStream(process.argv[2]) : process.stdin;

input.pipe(tokenize())
  .pipe(through.obj(function(token, enc, next) {
    token[1] = token[1].toString(); // it's a buffer slice
    console.log('TOKEN', token);
    next();
  }))
