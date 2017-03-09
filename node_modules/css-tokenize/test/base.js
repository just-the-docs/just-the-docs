var fs = require('fs'),
  test = require('tape'),
  through = require('through2'),
  tokenize = require('../')


test('basic', function(t) {
  var tok = tokenize();

  var input = "html { font-size: 10px; }"
  var expected = [
    ['rule_start', 'html {'],
    ['rule', ' font-size: 10px; '],
    ['rule_end', '}']
  ]

  t.plan(expected.length);
  tok.pipe(through.obj(function(token, enc, next) {
    token[1] = token[1].toString();
    if (expected.length > 0) t.same(token, expected.shift())
    next();
  }))

  tok.end(input);
})

test('at-rule nesting', function(t) {
  var tok = tokenize();
  var expected = [
    [ 'atrule_start', '@media screen and (min-width: 1000px) {' ],
    [ 'atrule', '\n  ' ],
    [ 'rule_start', 'a {' ],
    [ 'rule', '\n    text-decoration: underline;\n  ' ],
    [ 'rule_end', '}' ],
    [ 'atrule', '\n' ],
    [ 'atrule_end', '}' ],
    [ 'root', '\n' ]  
  ]

  t.plan(expected.length);
  tok.pipe(through.obj(function(token, enc, next) {
    token[1] = token[1].toString();
    if (expected.length > 0) t.same(token, expected.shift())
    next();
  }))

  fs.createReadStream(__dirname + '/nested.css').pipe(tok);
})

test('gauntlet', function(t) {
  var tok = tokenize();

  var expected = [
    ['root', '\n'],
    ['rule_start', 'div {'],
    ['rule', '\n  background: red;\n'],
    ['rule_end', '}'],
    ['root', '\n\n'],
    ['rule_start', '.cls {'],
    ['rule', '\n  color: green;\n'],
    ['rule_end', '}'],
    ['root', '\n\n'],
    ['rule_start', '#id {'],
    ['rule', '\n  font-size: 10px;\n'],
    ['rule_end', '}'],
    ['comment', '\n\n/* comment */'],
    ['space', '\n\n'],
    ['atrule_start', '@media screen and (min-width: 1000px) {'],
    ['atrule', '\n  '],
    ['rule_start', 'a {'],
    ['rule', '\n    text-decoration: underline;\n  '],
    ['rule_end', '}'],
    ['atrule', '\n'],
    ['atrule_end', '}'],
    ['root', '\n\n'],
    ['rule_start', 'a:hover {'],
    ['rule', '\n  font-weight: bold;  \n'],
    ['rule_end', '}'],
    ['root', '\n\n'],
    ['rule_start', 'section \n\n\n{'],
    ['rule', '\n  margin: 0;\n  '],
    ['comment', '/* comment wthin a rule */'],
    ['rule', '\n  padding: 5px;\n'],
    ['rule_end', '}'],
    ['root', '\n\n\n'],
    ['rule_start', 'body > * {'],
    ['rule', '\n  \n'],
    ['rule_end', '}'],
    ['root', '\n']
  ]

  t.plan(expected.length);
  tok.pipe(through.obj(function(token, enc, next) {
    token[1] = token[1].toString();
    if (expected.length > 0) t.same(token, expected.shift())
    next();
  }));

  fs.createReadStream(__dirname + '/gauntlet.css').pipe(tok);
})
