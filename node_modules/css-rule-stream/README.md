css-rule-stream [![Build Status](https://travis-ci.org/anandthakker/css-rule-stream.svg?branch=master)](https://travis-ci.org/anandthakker/css-rule-stream)
===============

transform stream to cut css into rule-sized chunks, which come in the form:
```javacsript
{
  content: "your css"
}
```

Example:
```javascript
var rules = require('css-rule-stream'),
    ldjson = require('ldjson-stream');

fs.readFileSync(__dirnam + '/main.css')
  .pipe(rules)
  .pipe(ldjson.serialize())
  .pipe(process.stdout);
```

**main.css**
```
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

**output**
```json
{"content":"div {\n  background: red;\n}"}
{"content":".cls {\n  color: green;\n}"}
{"content":"#id {\n  font-size: 10px;\n}"}
{"content":"@media screen and (min-width: 1000px) {\n  a {\n    text-decoration: underline;\n  }\n}"}
{"content":"a:hover {\n  font-weight: bold;  \n}"}
{"content":"section \n\n\n{\n  margin: 0;\n  /* comment wthin a rule */\n  padding: 5px;\n}"}
{"content":"body > * {\n  \n}"}
```
