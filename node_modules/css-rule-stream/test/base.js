
var fs = require('fs'),
  test = require('tape'),
  through = require('through2'),
  rules = require('../');
  

test('works', function(t) {
  var expected = [
    {"line": 2, "column": 1, "content":"div {\n  background: red;\n}"},
    {"line": 4, "column": 2, "content":".cls {\n  color: green;\n}"},
    {"line": 8, "column": 1, "content":"#id {\n  font-size: 10px;\n}"},
    {"line": 14, "column": 1, "content":"@media screen and (min-width: 1000px) {\n  a {\n    text-decoration: underline;\n  }\n}"},
    {"line": 20, "column": 1, "content":"a:hover {\n  font-weight: bold;  \n}"},
    {"line": 24, "column": 1, "content":"section \n\n\n{\n  margin: 0;\n  /* comment wthin a rule */\n  padding: 5px;\n}"},
    {"line": 34, "column": 1, "content":"body > * {\n  \n}"}
  ]
  
  t.plan(expected.length + 1);
  
  var rs = rules();
  rs.pipe(through.obj(function(chunk, enc, next) {
    t.same(chunk, expected.shift());
    next();
  },
  function(next) {
    t.ok(true);
    next();
  }));
  
  fs.createReadStream(__dirname + '/gauntlet.css').pipe(rs);
  
})
