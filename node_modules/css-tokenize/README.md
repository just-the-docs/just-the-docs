css-tokenize
============

Coarsely tokenize a stream of CSS, largely modeled after 
[substack/html-tokenize](/substack/html-tokenize).

```javascript
var tokenize = require('css-tokenize'),
through = require('through2');

process.stdin
.pipe(tokenize())
.pipe(through.obj(function(token, enc, next) {
  token[1] = token[1].toString(); // it's a buffer slice
  console.log('TOKEN', token);
  next();
}))
```

Input:
```css

div {
  background: red;
}

.cls {
  color: green;
}

#id {
  font-size: 10px;
}

/* comment */

@media screen and (min-width: 1000px) {
  a {
    text-decoration: underline;
  }
}

a:hover {
  font-weight: bold;  
}

section 


{
  margin: 0;
  /* comment wthin a rule */
  padding: 5px;
}


body > * {
  
}
```

Output:
```
TOKEN [ 'root', '\n' ]
TOKEN [ 'rule_start', 'div {' ]
TOKEN [ 'rule', '\n  background: red;\n' ]
TOKEN [ 'rule_end', '}' ]
TOKEN [ 'root', '\n\n' ]
TOKEN [ 'rule_start', '.cls {' ]
TOKEN [ 'rule', '\n  color: green;\n' ]
TOKEN [ 'rule_end', '}' ]
TOKEN [ 'root', '\n\n' ]
TOKEN [ 'rule_start', '#id {' ]
TOKEN [ 'rule', '\n  font-size: 10px;\n' ]
TOKEN [ 'rule_end', '}' ]
TOKEN [ 'comment', '\n\n/* comment */' ]
TOKEN [ 'space', '\n\n' ]
TOKEN [ 'atrule_start', '@media screen and (min-width: 1000px) {' ]
TOKEN [ 'atrule', '\n  ' ]
TOKEN [ 'rule_start', 'a {' ]
TOKEN [ 'rule', '\n    text-decoration: underline;\n  ' ]
TOKEN [ 'rule_end', '}' ]
TOKEN [ 'atrule', '\n' ]
TOKEN [ 'atrule_end', '}' ]
TOKEN [ 'root', '\n\n' ]
TOKEN [ 'rule_start', 'a:hover {' ]
TOKEN [ 'rule', '\n  font-weight: bold;  \n' ]
TOKEN [ 'rule_end', '}' ]
TOKEN [ 'root', '\n\n' ]
TOKEN [ 'rule_start', 'section \n\n\n{' ]
TOKEN [ 'rule', '\n  margin: 0;\n  ' ]
TOKEN [ 'comment', '/* comment wthin a rule */' ]
TOKEN [ 'rule', '\n  padding: 5px;\n' ]
TOKEN [ 'rule_end', '}' ]
TOKEN [ 'root', '\n\n\n' ]
TOKEN [ 'rule_start', 'body > * {' ]
TOKEN [ 'rule', '\n  \n' ]
TOKEN [ 'rule_end', '}' ]
TOKEN [ 'root', '\n' ]
```
