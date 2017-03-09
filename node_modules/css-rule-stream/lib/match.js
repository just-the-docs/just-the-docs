
var through = require('through2');


var newline = '\n'.charCodeAt(0);

// object mode transform stream takes tokenized css and yields complete,
// parseable rules or at-rules as strings.
module.exports = function match() {
  var current = null; // buffer for the current incoming rule.
  var depth = 0;      // track depth to handle rules nested in at-rules.
  var line = 1, column = 1; // track this and pass it downstream for source mapping.
  function write(token, enc, next) {
    var type = token[0], buf = token[1];
    
    if(('rule_start' === type || 'atrule_start' === type))
      depth++;
    if(depth > 0 && !current)
      current = {location: [line, column], buffers:[]};
    if('rule_end' === type || 'atrule_end' === type)
      depth--;
    
    if(current) {
      current.buffers.push(buf);
      if(depth === 0) pushRule.call(this);
    }
    
    updatePosition(buf);
    next();
  }
  
  function end(next) {
    if(current) pushRule.call(this);
    this.push(null);
    next();
  }
  
  function pushRule() {
    this.push({
      line: current.location[0],
      column: current.location[1],
      content: Buffer.concat(current.buffers).toString()
    });
    current = null;
  }
  
  function updatePosition(buf) {
    for(var i = 0; i < buf.length; i++) {
      if(buf[i] === newline) {
        line ++;
        column = 1;
      }
      else {
        column++;
      }
    }
  }
  
  return through.obj(write, end);
}
