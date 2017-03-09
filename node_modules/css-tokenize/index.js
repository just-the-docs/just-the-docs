
/**
 * The approach here owes a LOT to https://github.com/substack/html-tokenize.
 */

var Transform = require('readable-stream').Transform;
var inherits = require('inherits');

inherits(Tokenize, Transform);
module.exports = Tokenize;

var codes = {
  fslash: '/'.charCodeAt(0),
  bslash: '\\'.charCodeAt(0),
  lparen: '('.charCodeAt(0),
  rparen: ')'.charCodeAt(0),
  lbrace: '{'.charCodeAt(0),
  rbrace: '}'.charCodeAt(0),
  lbrack: '['.charCodeAt(0),
  rbrack: ']'.charCodeAt(0),
  squote: '\''.charCodeAt(0),
  dquote: '"'.charCodeAt(0),
  at: '@'.charCodeAt(0),
  semi: ';'.charCodeAt(0),
  asterisk: '*'.charCodeAt(0)
}

var sequences = {
  comment_start: '/*',
  comment_end: '*/'
}


function charCodes(s) { return s.split('').map(function(c){return c.charCodeAt(0)}) }
var sets = {
  space: charCodes(' \t\n\r\f'),
  open_brackets: [codes.lparen, codes.lbrace, codes.lbrack],
  newline: charCodes('\n\r\f')
}

function Tokenize() {
  if (!(this instanceof Tokenize)) return new Tokenize;
  Transform.call(this);
  this._readableState.objectMode = true;
  this.state = [['root']];
  this._input = null; // buffer the input for read-ahead
  this._position = 0; // current position in this._input
  this.buffers = []; // collect data for current token
}


Tokenize.prototype._transform = function(buf, enc, next) {
  var input = this._input = this._input ? Buffer.concat([ this._input, buf ]) : buf;
  
  for(var i = this._position; i < input.length; i++) {
    var c = input[i];
    var state = this.state[this.state.length - 1][0],
      stateData = this.state[this.state.length - 1][1],
      end = null;
    
    // console.log(i, c, this.state);
    
    /* comments */
    if(i === input.length - 1
    && (('comment' === state && c === codes.asterisk)
        || c === codes.fslash)) {
      // need more data: save unprocessed input and bail out.
      this._input = this._input.slice(this._position);
      break;
    }
    else if('comment' !== state
    && c === codes.fslash && input[i+1] === codes.asterisk) {
      if('root' !== state) end = [].concat(state);
      i--; //backup to save the '/*' for the comment token.
      this.state.push(['comment'])
    }
    else if('comment' === state
    && c === codes.asterisk && input[i+1] === codes.fslash) {
      i++;
      end = this.state.pop();
    }
    /* strings */
    else if('string' === state
    && c === stateData) {
      this.state.pop();
    }
    else if('string' !== state
    && codes.squote === c || codes.dquote === c) {
      this.state.push(['string', c]);
    }
    /* brackets */
    // else if(codes.lparen === c) {
    //   this.state.push(['brackets', codes.rparen]);
    // }
    // else if(codes.lbrack === c) {
    //   this.state.push(['brackets', codes.rbrack]);
    // }
    // else if('brackets' === state
    // && c === stateData) {
    //   this.state.pop();
    // }
    /* rules */
    else if('rule_start' === state
    && c === codes.lbrace) {
      end = this.state.pop();
      this.state.push(['rule']);
    }
    else if('atrule_start' === state
    && c === codes.lbrace) {
      end = this.state.pop();
      this.state.push(['atrule']);
    }
    else if(('rule' === state || 'atrule' === state)
    && c === codes.rbrace) {
      end = this.state.pop();
      i--; // backup to save the ending curly brace for the rule_end token.
      this.state.push([ state + '_end' ]);
    }
    else if(('rule_end' === state || 'atrule_end' === state)
    && c === codes.rbrace) {
      end = this.state.pop();
    }
    else if('root' === state
    && c === codes.at) {
      end = ['space'];
      i--;
      this.state.push(['atrule_start'])
    }
    // rules can start from the root or nested within at-rules.
    else if(sets.space.indexOf(c) < 0)
    {
      if('root' === state) {
        end = ['root'];
        i--;
        this.state.push(['rule_start'])
      }
      else if('atrule' === state) {
        end = ['atrule'];
        i--;
        this.state.push(['rule_start']);
      }
    }
    
    if(end && i >= this._position) {
      var out;
      this.push(out = [end[0], input.slice(this._position, i+1)]);
      this._position = i+1;
      end = null;
    }
  }
  
  if(this._position < this._input.length) {
    this._input = this._input.slice(this._position);
    this._position = 0;
  }
  else {
    this._input = null;
    this._position = 0;
  }
  next();
}


Tokenize.prototype._flush = function (next) {
  if(this._input)
    this.push([this.state.pop()[0], this._input.slice(this._position)]);
  if(this.state.length !== 0) {
    console.warn("[css-tokenize] unfinished business", this.state);
  }
  this.push(null);
  next();
};
