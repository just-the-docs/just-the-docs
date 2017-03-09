'use strict';

exports.__esModule = true;

var _declaration = require('postcss/lib/declaration');

var _declaration2 = _interopRequireDefault(_declaration);

var _comment = require('postcss/lib/comment');

var _comment2 = _interopRequireDefault(_comment);

var _atRule = require('postcss/lib/at-rule');

var _atRule2 = _interopRequireDefault(_atRule);

var _rule = require('postcss/lib/rule');

var _rule2 = _interopRequireDefault(_rule);

var _root = require('postcss/lib/root');

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
    function Parser(input) {
        _classCallCheck(this, Parser);

        this.input = input;

        this.pos = 0;
        this.root = new _root2.default();
        this.current = this.root;
        this.spaces = '';

        this.prevIndent = undefined;
        this.step = undefined;

        this.root.source = { input: input, start: { line: 1, column: 1 } };
    }

    Parser.prototype.loop = function loop() {
        var part = void 0;
        while (this.pos < this.parts.length) {
            part = this.parts[this.pos];

            if (part.comment) {
                this.comment(part);
            } else if (part.atrule) {
                this.atrule(part);
            } else if (part.colon) {
                var next = this.nextNonComment(this.pos);

                if (next.end || next.atrule) {
                    this.decl(part);
                } else {
                    var moreIndent = next.indent.length > part.indent.length;
                    if (!moreIndent) {
                        this.decl(part);
                    } else if (moreIndent && next.colon) {
                        this.rule(part);
                    } else if (moreIndent && !next.colon) {
                        this.decl(part);
                    }
                }
            } else if (part.end) {
                this.root.raws.after = part.before;
            } else {
                this.rule(part);
            }

            this.pos += 1;
        }

        for (var i = this.tokens.length - 1; i >= 0; i--) {
            if (this.tokens[i].length > 3) {
                var last = this.tokens[i];
                this.root.source.end = {
                    line: last[4] || last[2],
                    column: last[5] || last[3]
                };
                break;
            }
        }
    };

    Parser.prototype.comment = function comment(part) {
        var token = part.tokens[0];
        var node = new _comment2.default();
        this.init(node, part);
        node.source.end = { line: token[4], column: token[5] };
        this.commentText(node, token);
    };

    Parser.prototype.atrule = function atrule(part) {
        var atword = part.tokens[0];
        var params = part.tokens.slice(1);

        var node = new _atRule2.default();
        node.name = atword[1].slice(1);
        this.init(node, part);

        if (node.name === '') this.unnamedAtrule(atword);

        while (!part.end && part.lastComma) {
            this.pos += 1;
            part = this.parts[this.pos];
            params.push(['space', part.before + part.indent]);
            params = params.concat(part.tokens);
        }

        node.raws.afterName = this.firstSpaces(params);
        this.keepTrailingSpace(node, params);
        this.checkSemicolon(params);
        this.checkCurly(params);
        this.raw(node, 'params', params, atword);
    };

    Parser.prototype.decl = function decl(part) {
        var node = new _declaration2.default();
        this.init(node, part);

        var between = '';
        var colon = 0;
        var value = [];
        var prop = '';
        for (var i = 0; i < part.tokens.length; i++) {
            var token = part.tokens[i];
            if (token[0] === ':') {
                between += token[1];
                colon = token;
                value = part.tokens.slice(i + 1);
                break;
            } else if (token[0] === 'comment' || token[0] === 'space') {
                between += token[1];
            } else if (between !== '') {
                this.badProp(token);
            } else {
                prop += token[1];
            }
        }

        if (prop === '') this.unnamedDecl(part.tokens[0]);
        node.prop = prop;

        var next = this.parts[this.pos + 1];

        while (!next.end && !next.atrule && !next.colon && next.indent.length > part.indent.length) {
            value.push(['space', next.before + next.indent]);
            value = value.concat(next.tokens);
            this.pos += 1;
            next = this.parts[this.pos + 1];
        }

        var last = value[value.length - 1];
        if (last && last[0] === 'comment') {
            value.pop();
            var comment = new _comment2.default();
            this.current.push(comment);
            comment.source = {
                input: this.input,
                start: { line: last[2], column: last[3] },
                end: { line: last[4], column: last[5] }
            };
            var prev = value[value.length - 1];
            if (prev && prev[0] === 'space') {
                value.pop();
                comment.raws.before = prev[1];
            }
            this.commentText(comment, last);
        }

        for (var _i = value.length - 1; _i > 0; _i--) {
            var t = value[_i][0];
            if (t === 'word' && value[_i][1] === '!important') {
                node.important = true;
                if (_i > 0 && value[_i - 1][0] === 'space') {
                    node.raws.important = value[_i - 1][1] + '!important';
                    value.splice(_i - 1, 2);
                } else {
                    node.raws.important = '!important';
                    value.splice(_i, 1);
                }
                break;
            } else if (t !== 'space' && t !== 'newline' && t !== 'comment') {
                break;
            }
        }

        node.raws.between = between + this.firstSpaces(value);
        this.checkSemicolon(value);
        this.raw(node, 'value', value, colon);
    };

    Parser.prototype.rule = function rule(part) {
        var node = new _rule2.default();
        this.init(node, part);

        var selector = part.tokens;
        var next = this.parts[this.pos + 1];

        while (!next.end && next.indent.length === part.indent.length) {
            selector.push(['space', next.before + next.indent]);
            selector = selector.concat(next.tokens);
            this.pos += 1;
            next = this.parts[this.pos + 1];
        }

        this.keepTrailingSpace(node, selector);
        this.checkCurly(selector);
        this.raw(node, 'selector', selector);
    };

    /* Helpers */

    Parser.prototype.indent = function indent(part) {
        var indent = part.indent.length;
        var isPrev = typeof this.prevIndent !== 'undefined';

        if (!isPrev && indent) this.indentedFirstLine(part);

        if (!this.step && indent) {
            this.step = indent;
            this.root.raws.indent = part.indent;
        }

        if (isPrev && this.prevIndent !== indent) {
            var diff = indent - this.prevIndent;
            if (diff > 0) {
                if (diff !== this.step) {
                    this.wrongIndent(this.prevIndent + this.step, indent, part);
                } else {
                    this.current = this.current.last;
                }
            } else if (diff % this.step !== 0) {
                var m = indent + diff % this.step;
                this.wrongIndent(m + ' or ' + (m + this.step), indent, part);
            } else {
                for (var i = 0; i < -diff / this.step; i++) {
                    this.current = this.current.parent;
                }
            }
        }

        this.prevIndent = indent;
    };

    Parser.prototype.init = function init(node, part) {
        this.indent(part);

        if (!this.current.nodes) this.current.nodes = [];
        this.current.push(node);

        node.raws.before = part.before + part.indent;
        node.source = {
            start: { line: part.tokens[0][2], column: part.tokens[0][3] },
            input: this.input
        };
    };

    Parser.prototype.checkCurly = function checkCurly(tokens) {
        for (var _iterator = tokens, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i2 >= _iterator.length) break;
                _ref = _iterator[_i2++];
            } else {
                _i2 = _iterator.next();
                if (_i2.done) break;
                _ref = _i2.value;
            }

            var token = _ref;

            if (token[0] === '{') {
                this.error('Unnecessary curly bracket', token[2], token[3]);
            }
        }
    };

    Parser.prototype.checkSemicolon = function checkSemicolon(tokens) {
        for (var _iterator2 = tokens, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i3 >= _iterator2.length) break;
                _ref2 = _iterator2[_i3++];
            } else {
                _i3 = _iterator2.next();
                if (_i3.done) break;
                _ref2 = _i3.value;
            }

            var token = _ref2;

            if (token[0] === ';') {
                this.error('Unnecessary semicolon', token[2], token[3]);
            }
        }
    };

    Parser.prototype.keepTrailingSpace = function keepTrailingSpace(node, tokens) {
        var lastSpace = tokens[tokens.length - 1];
        if (lastSpace && lastSpace[0] === 'space') {
            tokens.pop();
            node.raws.sssBetween = lastSpace[1];
        }
    };

    Parser.prototype.firstSpaces = function firstSpaces(tokens) {
        var result = '';
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i][0] === 'space' || tokens[i][0] === 'newline') {
                result += tokens.shift()[1];
                i -= 1;
            } else {
                break;
            }
        }
        return result;
    };

    Parser.prototype.raw = function raw(node, prop, tokens, altLast) {
        var token = void 0,
            type = void 0;
        var length = tokens.length;
        var value = '';
        var clean = true;
        for (var i = 0; i < length; i += 1) {
            token = tokens[i];
            type = token[0];
            if (type === 'comment' || type === 'space' && i === length - 1) {
                clean = false;
            } else {
                value += token[1];
            }
        }
        if (!clean) {
            var sss = tokens.reduce(function (all, i) {
                return all + i[1];
            }, '');
            var raw = tokens.reduce(function (all, i) {
                if (i[0] === 'comment' && i[6] === 'inline') {
                    return all + '/* ' + i[1].slice(2).trim() + ' */';
                } else {
                    return all + i[1];
                }
            }, '');
            node.raws[prop] = { value: value, raw: raw };
            if (sss !== raw) node.raws[prop].sss = sss;
        }
        node[prop] = value;

        var last = void 0;
        for (var _i4 = tokens.length - 1; _i4 >= 0; _i4--) {
            if (tokens[_i4].length > 2) {
                last = tokens[_i4];
                break;
            }
        }
        if (!last) last = altLast;

        node.source.end = {
            line: last[4] || last[2],
            column: last[5] || last[3]
        };
    };

    Parser.prototype.nextNonComment = function nextNonComment(pos) {
        var next = pos;
        var part = void 0;
        while (next < this.parts.length) {
            next += 1;
            part = this.parts[next];
            if (part.end || !part.comment) break;
        }
        return part;
    };

    Parser.prototype.commentText = function commentText(node, token) {
        var text = token[1];
        if (token[6] === 'inline') {
            node.raws.inline = true;
            text = text.slice(2);
        } else {
            text = text.slice(2, -2);
        }

        var match = text.match(/^(\s*)([^]*[^\s])(\s*)\n?$/);
        if (match) {
            node.text = match[2];
            node.raws.left = match[1];
            node.raws.inlineRight = match[3];
        } else {
            node.text = '';
            node.raws.left = '';
            node.raws.inlineRight = '';
        }
    };

    // Errors

    Parser.prototype.error = function error(msg, line, column) {
        throw this.input.error(msg, line, column);
    };

    Parser.prototype.unnamedAtrule = function unnamedAtrule(token) {
        this.error('At-rule without name', token[2], token[3]);
    };

    Parser.prototype.unnamedDecl = function unnamedDecl(token) {
        this.error('Declaration without name', token[2], token[3]);
    };

    Parser.prototype.indentedFirstLine = function indentedFirstLine(part) {
        this.error('First line should not have indent', part.number, 1);
    };

    Parser.prototype.wrongIndent = function wrongIndent(expected, real, part) {
        var msg = 'Expected ' + expected + ' indent, but get ' + real;
        this.error(msg, part.number, 1);
    };

    Parser.prototype.badProp = function badProp(token) {
        this.error('Unexpected separator in property', token[2], token[3]);
    };

    return Parser;
}();

exports.default = Parser;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlci5lczYiXSwibmFtZXMiOlsiUGFyc2VyIiwiaW5wdXQiLCJwb3MiLCJyb290IiwiY3VycmVudCIsInNwYWNlcyIsInByZXZJbmRlbnQiLCJ1bmRlZmluZWQiLCJzdGVwIiwic291cmNlIiwic3RhcnQiLCJsaW5lIiwiY29sdW1uIiwibG9vcCIsInBhcnQiLCJwYXJ0cyIsImxlbmd0aCIsImNvbW1lbnQiLCJhdHJ1bGUiLCJjb2xvbiIsIm5leHQiLCJuZXh0Tm9uQ29tbWVudCIsImVuZCIsImRlY2wiLCJtb3JlSW5kZW50IiwiaW5kZW50IiwicnVsZSIsInJhd3MiLCJhZnRlciIsImJlZm9yZSIsImkiLCJ0b2tlbnMiLCJsYXN0IiwidG9rZW4iLCJub2RlIiwiaW5pdCIsImNvbW1lbnRUZXh0IiwiYXR3b3JkIiwicGFyYW1zIiwic2xpY2UiLCJuYW1lIiwidW5uYW1lZEF0cnVsZSIsImxhc3RDb21tYSIsInB1c2giLCJjb25jYXQiLCJhZnRlck5hbWUiLCJmaXJzdFNwYWNlcyIsImtlZXBUcmFpbGluZ1NwYWNlIiwiY2hlY2tTZW1pY29sb24iLCJjaGVja0N1cmx5IiwicmF3IiwiYmV0d2VlbiIsInZhbHVlIiwicHJvcCIsImJhZFByb3AiLCJ1bm5hbWVkRGVjbCIsInBvcCIsInByZXYiLCJ0IiwiaW1wb3J0YW50Iiwic3BsaWNlIiwic2VsZWN0b3IiLCJpc1ByZXYiLCJpbmRlbnRlZEZpcnN0TGluZSIsImRpZmYiLCJ3cm9uZ0luZGVudCIsIm0iLCJwYXJlbnQiLCJub2RlcyIsImVycm9yIiwibGFzdFNwYWNlIiwic3NzQmV0d2VlbiIsInJlc3VsdCIsInNoaWZ0IiwiYWx0TGFzdCIsInR5cGUiLCJjbGVhbiIsInNzcyIsInJlZHVjZSIsImFsbCIsInRyaW0iLCJ0ZXh0IiwiaW5saW5lIiwibWF0Y2giLCJsZWZ0IiwiaW5saW5lUmlnaHQiLCJtc2ciLCJudW1iZXIiLCJleHBlY3RlZCIsInJlYWwiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQkEsTTtBQUVqQixvQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNmLGFBQUtBLEtBQUwsR0FBYUEsS0FBYjs7QUFFQSxhQUFLQyxHQUFMLEdBQWUsQ0FBZjtBQUNBLGFBQUtDLElBQUwsR0FBZSxvQkFBZjtBQUNBLGFBQUtDLE9BQUwsR0FBZSxLQUFLRCxJQUFwQjtBQUNBLGFBQUtFLE1BQUwsR0FBZSxFQUFmOztBQUVBLGFBQUtDLFVBQUwsR0FBa0JDLFNBQWxCO0FBQ0EsYUFBS0MsSUFBTCxHQUFrQkQsU0FBbEI7O0FBRUEsYUFBS0osSUFBTCxDQUFVTSxNQUFWLEdBQW1CLEVBQUVSLFlBQUYsRUFBU1MsT0FBTyxFQUFFQyxNQUFNLENBQVIsRUFBV0MsUUFBUSxDQUFuQixFQUFoQixFQUFuQjtBQUNIOztxQkFFREMsSSxtQkFBTztBQUNILFlBQUlDLGFBQUo7QUFDQSxlQUFRLEtBQUtaLEdBQUwsR0FBVyxLQUFLYSxLQUFMLENBQVdDLE1BQTlCLEVBQXVDO0FBQ25DRixtQkFBTyxLQUFLQyxLQUFMLENBQVcsS0FBS2IsR0FBaEIsQ0FBUDs7QUFFQSxnQkFBS1ksS0FBS0csT0FBVixFQUFvQjtBQUNoQixxQkFBS0EsT0FBTCxDQUFhSCxJQUFiO0FBQ0gsYUFGRCxNQUVPLElBQUtBLEtBQUtJLE1BQVYsRUFBbUI7QUFDdEIscUJBQUtBLE1BQUwsQ0FBWUosSUFBWjtBQUNILGFBRk0sTUFFQSxJQUFLQSxLQUFLSyxLQUFWLEVBQWtCO0FBQ3JCLG9CQUFJQyxPQUFPLEtBQUtDLGNBQUwsQ0FBb0IsS0FBS25CLEdBQXpCLENBQVg7O0FBRUEsb0JBQUtrQixLQUFLRSxHQUFMLElBQVlGLEtBQUtGLE1BQXRCLEVBQStCO0FBQzNCLHlCQUFLSyxJQUFMLENBQVVULElBQVY7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsd0JBQUlVLGFBQWFKLEtBQUtLLE1BQUwsQ0FBWVQsTUFBWixHQUFxQkYsS0FBS1csTUFBTCxDQUFZVCxNQUFsRDtBQUNBLHdCQUFLLENBQUNRLFVBQU4sRUFBbUI7QUFDZiw2QkFBS0QsSUFBTCxDQUFVVCxJQUFWO0FBQ0gscUJBRkQsTUFFTyxJQUFLVSxjQUFjSixLQUFLRCxLQUF4QixFQUFnQztBQUNuQyw2QkFBS08sSUFBTCxDQUFVWixJQUFWO0FBQ0gscUJBRk0sTUFFQSxJQUFLVSxjQUFjLENBQUNKLEtBQUtELEtBQXpCLEVBQWlDO0FBQ3BDLDZCQUFLSSxJQUFMLENBQVVULElBQVY7QUFDSDtBQUNKO0FBQ0osYUFmTSxNQWVBLElBQUtBLEtBQUtRLEdBQVYsRUFBZ0I7QUFDbkIscUJBQUtuQixJQUFMLENBQVV3QixJQUFWLENBQWVDLEtBQWYsR0FBdUJkLEtBQUtlLE1BQTVCO0FBQ0gsYUFGTSxNQUVBO0FBQ0gscUJBQUtILElBQUwsQ0FBVVosSUFBVjtBQUNIOztBQUVELGlCQUFLWixHQUFMLElBQVksQ0FBWjtBQUNIOztBQUVELGFBQU0sSUFBSTRCLElBQUksS0FBS0MsTUFBTCxDQUFZZixNQUFaLEdBQXFCLENBQW5DLEVBQXNDYyxLQUFLLENBQTNDLEVBQThDQSxHQUE5QyxFQUFvRDtBQUNoRCxnQkFBSyxLQUFLQyxNQUFMLENBQVlELENBQVosRUFBZWQsTUFBZixHQUF3QixDQUE3QixFQUFpQztBQUM3QixvQkFBSWdCLE9BQU8sS0FBS0QsTUFBTCxDQUFZRCxDQUFaLENBQVg7QUFDQSxxQkFBSzNCLElBQUwsQ0FBVU0sTUFBVixDQUFpQmEsR0FBakIsR0FBdUI7QUFDbkJYLDBCQUFRcUIsS0FBSyxDQUFMLEtBQVdBLEtBQUssQ0FBTCxDQURBO0FBRW5CcEIsNEJBQVFvQixLQUFLLENBQUwsS0FBV0EsS0FBSyxDQUFMO0FBRkEsaUJBQXZCO0FBSUE7QUFDSDtBQUNKO0FBQ0osSzs7cUJBRURmLE8sb0JBQVFILEksRUFBTTtBQUNWLFlBQUltQixRQUFRbkIsS0FBS2lCLE1BQUwsQ0FBWSxDQUFaLENBQVo7QUFDQSxZQUFJRyxPQUFRLHVCQUFaO0FBQ0EsYUFBS0MsSUFBTCxDQUFVRCxJQUFWLEVBQWdCcEIsSUFBaEI7QUFDQW9CLGFBQUt6QixNQUFMLENBQVlhLEdBQVosR0FBa0IsRUFBRVgsTUFBTXNCLE1BQU0sQ0FBTixDQUFSLEVBQWtCckIsUUFBUXFCLE1BQU0sQ0FBTixDQUExQixFQUFsQjtBQUNBLGFBQUtHLFdBQUwsQ0FBaUJGLElBQWpCLEVBQXVCRCxLQUF2QjtBQUNILEs7O3FCQUVEZixNLG1CQUFPSixJLEVBQU07QUFDVCxZQUFJdUIsU0FBU3ZCLEtBQUtpQixNQUFMLENBQVksQ0FBWixDQUFiO0FBQ0EsWUFBSU8sU0FBU3hCLEtBQUtpQixNQUFMLENBQVlRLEtBQVosQ0FBa0IsQ0FBbEIsQ0FBYjs7QUFFQSxZQUFJTCxPQUFRLHNCQUFaO0FBQ0FBLGFBQUtNLElBQUwsR0FBWUgsT0FBTyxDQUFQLEVBQVVFLEtBQVYsQ0FBZ0IsQ0FBaEIsQ0FBWjtBQUNBLGFBQUtKLElBQUwsQ0FBVUQsSUFBVixFQUFnQnBCLElBQWhCOztBQUVBLFlBQUtvQixLQUFLTSxJQUFMLEtBQWMsRUFBbkIsRUFBd0IsS0FBS0MsYUFBTCxDQUFtQkosTUFBbkI7O0FBRXhCLGVBQVEsQ0FBQ3ZCLEtBQUtRLEdBQU4sSUFBYVIsS0FBSzRCLFNBQTFCLEVBQXNDO0FBQ2xDLGlCQUFLeEMsR0FBTCxJQUFZLENBQVo7QUFDQVksbUJBQU8sS0FBS0MsS0FBTCxDQUFXLEtBQUtiLEdBQWhCLENBQVA7QUFDQW9DLG1CQUFPSyxJQUFQLENBQVksQ0FBQyxPQUFELEVBQVU3QixLQUFLZSxNQUFMLEdBQWNmLEtBQUtXLE1BQTdCLENBQVo7QUFDQWEscUJBQVNBLE9BQU9NLE1BQVAsQ0FBYzlCLEtBQUtpQixNQUFuQixDQUFUO0FBQ0g7O0FBRURHLGFBQUtQLElBQUwsQ0FBVWtCLFNBQVYsR0FBc0IsS0FBS0MsV0FBTCxDQUFpQlIsTUFBakIsQ0FBdEI7QUFDQSxhQUFLUyxpQkFBTCxDQUF1QmIsSUFBdkIsRUFBNkJJLE1BQTdCO0FBQ0EsYUFBS1UsY0FBTCxDQUFvQlYsTUFBcEI7QUFDQSxhQUFLVyxVQUFMLENBQWdCWCxNQUFoQjtBQUNBLGFBQUtZLEdBQUwsQ0FBU2hCLElBQVQsRUFBZSxRQUFmLEVBQXlCSSxNQUF6QixFQUFpQ0QsTUFBakM7QUFDSCxLOztxQkFFRGQsSSxpQkFBS1QsSSxFQUFNO0FBQ1AsWUFBSW9CLE9BQU8sMkJBQVg7QUFDQSxhQUFLQyxJQUFMLENBQVVELElBQVYsRUFBZ0JwQixJQUFoQjs7QUFFQSxZQUFJcUMsVUFBVSxFQUFkO0FBQ0EsWUFBSWhDLFFBQVUsQ0FBZDtBQUNBLFlBQUlpQyxRQUFVLEVBQWQ7QUFDQSxZQUFJQyxPQUFVLEVBQWQ7QUFDQSxhQUFNLElBQUl2QixJQUFJLENBQWQsRUFBaUJBLElBQUloQixLQUFLaUIsTUFBTCxDQUFZZixNQUFqQyxFQUF5Q2MsR0FBekMsRUFBK0M7QUFDM0MsZ0JBQUlHLFFBQVFuQixLQUFLaUIsTUFBTCxDQUFZRCxDQUFaLENBQVo7QUFDQSxnQkFBS0csTUFBTSxDQUFOLE1BQWEsR0FBbEIsRUFBd0I7QUFDcEJrQiwyQkFBV2xCLE1BQU0sQ0FBTixDQUFYO0FBQ0FkLHdCQUFXYyxLQUFYO0FBQ0FtQix3QkFBV3RDLEtBQUtpQixNQUFMLENBQVlRLEtBQVosQ0FBa0JULElBQUksQ0FBdEIsQ0FBWDtBQUNBO0FBQ0gsYUFMRCxNQUtPLElBQUtHLE1BQU0sQ0FBTixNQUFhLFNBQWIsSUFBMEJBLE1BQU0sQ0FBTixNQUFhLE9BQTVDLEVBQXNEO0FBQ3pEa0IsMkJBQVdsQixNQUFNLENBQU4sQ0FBWDtBQUNILGFBRk0sTUFFQSxJQUFLa0IsWUFBWSxFQUFqQixFQUFzQjtBQUN6QixxQkFBS0csT0FBTCxDQUFhckIsS0FBYjtBQUNILGFBRk0sTUFFQTtBQUNIb0Isd0JBQVFwQixNQUFNLENBQU4sQ0FBUjtBQUNIO0FBQ0o7O0FBRUQsWUFBS29CLFNBQVMsRUFBZCxFQUFtQixLQUFLRSxXQUFMLENBQWlCekMsS0FBS2lCLE1BQUwsQ0FBWSxDQUFaLENBQWpCO0FBQ25CRyxhQUFLbUIsSUFBTCxHQUFZQSxJQUFaOztBQUVBLFlBQUlqQyxPQUFPLEtBQUtMLEtBQUwsQ0FBVyxLQUFLYixHQUFMLEdBQVcsQ0FBdEIsQ0FBWDs7QUFFQSxlQUFRLENBQUNrQixLQUFLRSxHQUFOLElBQWEsQ0FBQ0YsS0FBS0YsTUFBbkIsSUFBNkIsQ0FBQ0UsS0FBS0QsS0FBbkMsSUFDQUMsS0FBS0ssTUFBTCxDQUFZVCxNQUFaLEdBQXFCRixLQUFLVyxNQUFMLENBQVlULE1BRHpDLEVBQ2tEO0FBQzlDb0Msa0JBQU1ULElBQU4sQ0FBVyxDQUFDLE9BQUQsRUFBVXZCLEtBQUtTLE1BQUwsR0FBY1QsS0FBS0ssTUFBN0IsQ0FBWDtBQUNBMkIsb0JBQVFBLE1BQU1SLE1BQU4sQ0FBYXhCLEtBQUtXLE1BQWxCLENBQVI7QUFDQSxpQkFBSzdCLEdBQUwsSUFBWSxDQUFaO0FBQ0FrQixtQkFBTyxLQUFLTCxLQUFMLENBQVcsS0FBS2IsR0FBTCxHQUFXLENBQXRCLENBQVA7QUFDSDs7QUFFRCxZQUFJOEIsT0FBT29CLE1BQU1BLE1BQU1wQyxNQUFOLEdBQWUsQ0FBckIsQ0FBWDtBQUNBLFlBQUtnQixRQUFRQSxLQUFLLENBQUwsTUFBWSxTQUF6QixFQUFxQztBQUNqQ29CLGtCQUFNSSxHQUFOO0FBQ0EsZ0JBQUl2QyxVQUFVLHVCQUFkO0FBQ0EsaUJBQUtiLE9BQUwsQ0FBYXVDLElBQWIsQ0FBa0IxQixPQUFsQjtBQUNBQSxvQkFBUVIsTUFBUixHQUFpQjtBQUNiUix1QkFBTyxLQUFLQSxLQURDO0FBRWJTLHVCQUFPLEVBQUVDLE1BQU1xQixLQUFLLENBQUwsQ0FBUixFQUFpQnBCLFFBQVFvQixLQUFLLENBQUwsQ0FBekIsRUFGTTtBQUdiVixxQkFBTyxFQUFFWCxNQUFNcUIsS0FBSyxDQUFMLENBQVIsRUFBaUJwQixRQUFRb0IsS0FBSyxDQUFMLENBQXpCO0FBSE0sYUFBakI7QUFLQSxnQkFBSXlCLE9BQU9MLE1BQU1BLE1BQU1wQyxNQUFOLEdBQWUsQ0FBckIsQ0FBWDtBQUNBLGdCQUFLeUMsUUFBUUEsS0FBSyxDQUFMLE1BQVksT0FBekIsRUFBbUM7QUFDL0JMLHNCQUFNSSxHQUFOO0FBQ0F2Qyx3QkFBUVUsSUFBUixDQUFhRSxNQUFiLEdBQXNCNEIsS0FBSyxDQUFMLENBQXRCO0FBQ0g7QUFDRCxpQkFBS3JCLFdBQUwsQ0FBaUJuQixPQUFqQixFQUEwQmUsSUFBMUI7QUFDSDs7QUFFRCxhQUFNLElBQUlGLEtBQUlzQixNQUFNcEMsTUFBTixHQUFlLENBQTdCLEVBQWdDYyxLQUFJLENBQXBDLEVBQXVDQSxJQUF2QyxFQUE2QztBQUN6QyxnQkFBSTRCLElBQUlOLE1BQU10QixFQUFOLEVBQVMsQ0FBVCxDQUFSO0FBQ0EsZ0JBQUs0QixNQUFNLE1BQU4sSUFBZ0JOLE1BQU10QixFQUFOLEVBQVMsQ0FBVCxNQUFnQixZQUFyQyxFQUFvRDtBQUNoREkscUJBQUt5QixTQUFMLEdBQWlCLElBQWpCO0FBQ0Esb0JBQUs3QixLQUFJLENBQUosSUFBU3NCLE1BQU10QixLQUFJLENBQVYsRUFBYSxDQUFiLE1BQW9CLE9BQWxDLEVBQTRDO0FBQ3hDSSx5QkFBS1AsSUFBTCxDQUFVZ0MsU0FBVixHQUFzQlAsTUFBTXRCLEtBQUksQ0FBVixFQUFhLENBQWIsSUFBa0IsWUFBeEM7QUFDQXNCLDBCQUFNUSxNQUFOLENBQWE5QixLQUFJLENBQWpCLEVBQW9CLENBQXBCO0FBQ0gsaUJBSEQsTUFHTztBQUNISSx5QkFBS1AsSUFBTCxDQUFVZ0MsU0FBVixHQUFzQixZQUF0QjtBQUNBUCwwQkFBTVEsTUFBTixDQUFhOUIsRUFBYixFQUFnQixDQUFoQjtBQUNIO0FBQ0Q7QUFDSCxhQVZELE1BVU8sSUFBSzRCLE1BQU0sT0FBTixJQUFpQkEsTUFBTSxTQUF2QixJQUFvQ0EsTUFBTSxTQUEvQyxFQUEyRDtBQUM5RDtBQUNIO0FBQ0o7O0FBRUR4QixhQUFLUCxJQUFMLENBQVV3QixPQUFWLEdBQW9CQSxVQUFVLEtBQUtMLFdBQUwsQ0FBaUJNLEtBQWpCLENBQTlCO0FBQ0EsYUFBS0osY0FBTCxDQUFvQkksS0FBcEI7QUFDQSxhQUFLRixHQUFMLENBQVNoQixJQUFULEVBQWUsT0FBZixFQUF3QmtCLEtBQXhCLEVBQStCakMsS0FBL0I7QUFDSCxLOztxQkFFRE8sSSxpQkFBS1osSSxFQUFNO0FBQ1AsWUFBSW9CLE9BQU8sb0JBQVg7QUFDQSxhQUFLQyxJQUFMLENBQVVELElBQVYsRUFBZ0JwQixJQUFoQjs7QUFFQSxZQUFJK0MsV0FBVy9DLEtBQUtpQixNQUFwQjtBQUNBLFlBQUlYLE9BQVcsS0FBS0wsS0FBTCxDQUFXLEtBQUtiLEdBQUwsR0FBVyxDQUF0QixDQUFmOztBQUVBLGVBQVEsQ0FBQ2tCLEtBQUtFLEdBQU4sSUFBYUYsS0FBS0ssTUFBTCxDQUFZVCxNQUFaLEtBQXVCRixLQUFLVyxNQUFMLENBQVlULE1BQXhELEVBQWlFO0FBQzdENkMscUJBQVNsQixJQUFULENBQWMsQ0FBQyxPQUFELEVBQVV2QixLQUFLUyxNQUFMLEdBQWNULEtBQUtLLE1BQTdCLENBQWQ7QUFDQW9DLHVCQUFXQSxTQUFTakIsTUFBVCxDQUFnQnhCLEtBQUtXLE1BQXJCLENBQVg7QUFDQSxpQkFBSzdCLEdBQUwsSUFBWSxDQUFaO0FBQ0FrQixtQkFBTyxLQUFLTCxLQUFMLENBQVcsS0FBS2IsR0FBTCxHQUFXLENBQXRCLENBQVA7QUFDSDs7QUFFRCxhQUFLNkMsaUJBQUwsQ0FBdUJiLElBQXZCLEVBQTZCMkIsUUFBN0I7QUFDQSxhQUFLWixVQUFMLENBQWdCWSxRQUFoQjtBQUNBLGFBQUtYLEdBQUwsQ0FBU2hCLElBQVQsRUFBZSxVQUFmLEVBQTJCMkIsUUFBM0I7QUFDSCxLOztBQUVEOztxQkFFQXBDLE0sbUJBQU9YLEksRUFBTTtBQUNULFlBQUlXLFNBQVNYLEtBQUtXLE1BQUwsQ0FBWVQsTUFBekI7QUFDQSxZQUFJOEMsU0FBUyxPQUFPLEtBQUt4RCxVQUFaLEtBQTJCLFdBQXhDOztBQUVBLFlBQUssQ0FBQ3dELE1BQUQsSUFBV3JDLE1BQWhCLEVBQXlCLEtBQUtzQyxpQkFBTCxDQUF1QmpELElBQXZCOztBQUV6QixZQUFLLENBQUMsS0FBS04sSUFBTixJQUFjaUIsTUFBbkIsRUFBNEI7QUFDeEIsaUJBQUtqQixJQUFMLEdBQVlpQixNQUFaO0FBQ0EsaUJBQUt0QixJQUFMLENBQVV3QixJQUFWLENBQWVGLE1BQWYsR0FBd0JYLEtBQUtXLE1BQTdCO0FBQ0g7O0FBRUQsWUFBS3FDLFVBQVUsS0FBS3hELFVBQUwsS0FBb0JtQixNQUFuQyxFQUE0QztBQUN4QyxnQkFBSXVDLE9BQU92QyxTQUFTLEtBQUtuQixVQUF6QjtBQUNBLGdCQUFLMEQsT0FBTyxDQUFaLEVBQWdCO0FBQ1osb0JBQUtBLFNBQVMsS0FBS3hELElBQW5CLEVBQTBCO0FBQ3RCLHlCQUFLeUQsV0FBTCxDQUFpQixLQUFLM0QsVUFBTCxHQUFrQixLQUFLRSxJQUF4QyxFQUE4Q2lCLE1BQTlDLEVBQXNEWCxJQUF0RDtBQUNILGlCQUZELE1BRU87QUFDSCx5QkFBS1YsT0FBTCxHQUFlLEtBQUtBLE9BQUwsQ0FBYTRCLElBQTVCO0FBQ0g7QUFDSixhQU5ELE1BTU8sSUFBS2dDLE9BQU8sS0FBS3hELElBQVosS0FBcUIsQ0FBMUIsRUFBOEI7QUFDakMsb0JBQUkwRCxJQUFJekMsU0FBU3VDLE9BQU8sS0FBS3hELElBQTdCO0FBQ0EscUJBQUt5RCxXQUFMLENBQXFCQyxDQUFyQixhQUErQkEsSUFBSSxLQUFLMUQsSUFBeEMsR0FBaURpQixNQUFqRCxFQUF5RFgsSUFBekQ7QUFDSCxhQUhNLE1BR0E7QUFDSCxxQkFBTSxJQUFJZ0IsSUFBSSxDQUFkLEVBQWlCQSxJQUFJLENBQUNrQyxJQUFELEdBQVEsS0FBS3hELElBQWxDLEVBQXdDc0IsR0FBeEMsRUFBOEM7QUFDMUMseUJBQUsxQixPQUFMLEdBQWUsS0FBS0EsT0FBTCxDQUFhK0QsTUFBNUI7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsYUFBSzdELFVBQUwsR0FBa0JtQixNQUFsQjtBQUNILEs7O3FCQUVEVSxJLGlCQUFLRCxJLEVBQU1wQixJLEVBQU07QUFDYixhQUFLVyxNQUFMLENBQVlYLElBQVo7O0FBRUEsWUFBSyxDQUFDLEtBQUtWLE9BQUwsQ0FBYWdFLEtBQW5CLEVBQTJCLEtBQUtoRSxPQUFMLENBQWFnRSxLQUFiLEdBQXFCLEVBQXJCO0FBQzNCLGFBQUtoRSxPQUFMLENBQWF1QyxJQUFiLENBQWtCVCxJQUFsQjs7QUFFQUEsYUFBS1AsSUFBTCxDQUFVRSxNQUFWLEdBQW1CZixLQUFLZSxNQUFMLEdBQWNmLEtBQUtXLE1BQXRDO0FBQ0FTLGFBQUt6QixNQUFMLEdBQWM7QUFDVkMsbUJBQU8sRUFBRUMsTUFBTUcsS0FBS2lCLE1BQUwsQ0FBWSxDQUFaLEVBQWUsQ0FBZixDQUFSLEVBQTJCbkIsUUFBUUUsS0FBS2lCLE1BQUwsQ0FBWSxDQUFaLEVBQWUsQ0FBZixDQUFuQyxFQURHO0FBRVY5QixtQkFBTyxLQUFLQTtBQUZGLFNBQWQ7QUFJSCxLOztxQkFFRGdELFUsdUJBQVdsQixNLEVBQVE7QUFDZiw2QkFBbUJBLE1BQW5CLG1IQUE0QjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0JBQWxCRSxLQUFrQjs7QUFDeEIsZ0JBQUtBLE1BQU0sQ0FBTixNQUFhLEdBQWxCLEVBQXdCO0FBQ3BCLHFCQUFLb0MsS0FBTCxDQUFXLDJCQUFYLEVBQXdDcEMsTUFBTSxDQUFOLENBQXhDLEVBQWtEQSxNQUFNLENBQU4sQ0FBbEQ7QUFDSDtBQUNKO0FBQ0osSzs7cUJBRURlLGMsMkJBQWVqQixNLEVBQVE7QUFDbkIsOEJBQW1CQSxNQUFuQix5SEFBNEI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLGdCQUFsQkUsS0FBa0I7O0FBQ3hCLGdCQUFLQSxNQUFNLENBQU4sTUFBYSxHQUFsQixFQUF3QjtBQUNwQixxQkFBS29DLEtBQUwsQ0FBVyx1QkFBWCxFQUFvQ3BDLE1BQU0sQ0FBTixDQUFwQyxFQUE4Q0EsTUFBTSxDQUFOLENBQTlDO0FBQ0g7QUFDSjtBQUNKLEs7O3FCQUVEYyxpQiw4QkFBa0JiLEksRUFBTUgsTSxFQUFRO0FBQzVCLFlBQUl1QyxZQUFZdkMsT0FBT0EsT0FBT2YsTUFBUCxHQUFnQixDQUF2QixDQUFoQjtBQUNBLFlBQUtzRCxhQUFhQSxVQUFVLENBQVYsTUFBaUIsT0FBbkMsRUFBNkM7QUFDekN2QyxtQkFBT3lCLEdBQVA7QUFDQXRCLGlCQUFLUCxJQUFMLENBQVU0QyxVQUFWLEdBQXVCRCxVQUFVLENBQVYsQ0FBdkI7QUFDSDtBQUNKLEs7O3FCQUVEeEIsVyx3QkFBWWYsTSxFQUFRO0FBQ2hCLFlBQUl5QyxTQUFTLEVBQWI7QUFDQSxhQUFNLElBQUkxQyxJQUFJLENBQWQsRUFBaUJBLElBQUlDLE9BQU9mLE1BQTVCLEVBQW9DYyxHQUFwQyxFQUEwQztBQUN0QyxnQkFBS0MsT0FBT0QsQ0FBUCxFQUFVLENBQVYsTUFBaUIsT0FBakIsSUFBNEJDLE9BQU9ELENBQVAsRUFBVSxDQUFWLE1BQWlCLFNBQWxELEVBQThEO0FBQzFEMEMsMEJBQVV6QyxPQUFPMEMsS0FBUCxHQUFlLENBQWYsQ0FBVjtBQUNBM0MscUJBQUssQ0FBTDtBQUNILGFBSEQsTUFHTztBQUNIO0FBQ0g7QUFDSjtBQUNELGVBQU8wQyxNQUFQO0FBQ0gsSzs7cUJBRUR0QixHLGdCQUFJaEIsSSxFQUFNbUIsSSxFQUFNdEIsTSxFQUFRMkMsTyxFQUFTO0FBQzdCLFlBQUl6QyxjQUFKO0FBQUEsWUFBVzBDLGFBQVg7QUFDQSxZQUFJM0QsU0FBU2UsT0FBT2YsTUFBcEI7QUFDQSxZQUFJb0MsUUFBUyxFQUFiO0FBQ0EsWUFBSXdCLFFBQVMsSUFBYjtBQUNBLGFBQU0sSUFBSTlDLElBQUksQ0FBZCxFQUFpQkEsSUFBSWQsTUFBckIsRUFBNkJjLEtBQUssQ0FBbEMsRUFBc0M7QUFDbENHLG9CQUFRRixPQUFPRCxDQUFQLENBQVI7QUFDQTZDLG1CQUFRMUMsTUFBTSxDQUFOLENBQVI7QUFDQSxnQkFBSzBDLFNBQVMsU0FBVCxJQUFzQkEsU0FBUyxPQUFULElBQW9CN0MsTUFBTWQsU0FBUyxDQUE5RCxFQUFrRTtBQUM5RDRELHdCQUFRLEtBQVI7QUFDSCxhQUZELE1BRU87QUFDSHhCLHlCQUFTbkIsTUFBTSxDQUFOLENBQVQ7QUFDSDtBQUNKO0FBQ0QsWUFBSyxDQUFDMkMsS0FBTixFQUFjO0FBQ1YsZ0JBQUlDLE1BQU05QyxPQUFPK0MsTUFBUCxDQUFlLFVBQUNDLEdBQUQsRUFBTWpELENBQU47QUFBQSx1QkFBWWlELE1BQU1qRCxFQUFFLENBQUYsQ0FBbEI7QUFBQSxhQUFmLEVBQXVDLEVBQXZDLENBQVY7QUFDQSxnQkFBSW9CLE1BQU1uQixPQUFPK0MsTUFBUCxDQUFlLFVBQUNDLEdBQUQsRUFBTWpELENBQU4sRUFBWTtBQUNqQyxvQkFBS0EsRUFBRSxDQUFGLE1BQVMsU0FBVCxJQUFzQkEsRUFBRSxDQUFGLE1BQVMsUUFBcEMsRUFBK0M7QUFDM0MsMkJBQU9pRCxNQUFNLEtBQU4sR0FBY2pELEVBQUUsQ0FBRixFQUFLUyxLQUFMLENBQVcsQ0FBWCxFQUFjeUMsSUFBZCxFQUFkLEdBQXFDLEtBQTVDO0FBQ0gsaUJBRkQsTUFFTztBQUNILDJCQUFPRCxNQUFNakQsRUFBRSxDQUFGLENBQWI7QUFDSDtBQUNKLGFBTlMsRUFNUCxFQU5PLENBQVY7QUFPQUksaUJBQUtQLElBQUwsQ0FBVTBCLElBQVYsSUFBa0IsRUFBRUQsWUFBRixFQUFTRixRQUFULEVBQWxCO0FBQ0EsZ0JBQUsyQixRQUFRM0IsR0FBYixFQUFtQmhCLEtBQUtQLElBQUwsQ0FBVTBCLElBQVYsRUFBZ0J3QixHQUFoQixHQUFzQkEsR0FBdEI7QUFDdEI7QUFDRDNDLGFBQUttQixJQUFMLElBQWFELEtBQWI7O0FBRUEsWUFBSXBCLGFBQUo7QUFDQSxhQUFNLElBQUlGLE1BQUlDLE9BQU9mLE1BQVAsR0FBZ0IsQ0FBOUIsRUFBaUNjLE9BQUssQ0FBdEMsRUFBeUNBLEtBQXpDLEVBQStDO0FBQzNDLGdCQUFLQyxPQUFPRCxHQUFQLEVBQVVkLE1BQVYsR0FBbUIsQ0FBeEIsRUFBNEI7QUFDeEJnQix1QkFBT0QsT0FBT0QsR0FBUCxDQUFQO0FBQ0E7QUFDSDtBQUNKO0FBQ0QsWUFBSyxDQUFDRSxJQUFOLEVBQWFBLE9BQU8wQyxPQUFQOztBQUVieEMsYUFBS3pCLE1BQUwsQ0FBWWEsR0FBWixHQUFrQjtBQUNkWCxrQkFBUXFCLEtBQUssQ0FBTCxLQUFXQSxLQUFLLENBQUwsQ0FETDtBQUVkcEIsb0JBQVFvQixLQUFLLENBQUwsS0FBV0EsS0FBSyxDQUFMO0FBRkwsU0FBbEI7QUFJSCxLOztxQkFFRFgsYywyQkFBZW5CLEcsRUFBSztBQUNoQixZQUFJa0IsT0FBT2xCLEdBQVg7QUFDQSxZQUFJWSxhQUFKO0FBQ0EsZUFBUU0sT0FBTyxLQUFLTCxLQUFMLENBQVdDLE1BQTFCLEVBQW1DO0FBQy9CSSxvQkFBUSxDQUFSO0FBQ0FOLG1CQUFPLEtBQUtDLEtBQUwsQ0FBV0ssSUFBWCxDQUFQO0FBQ0EsZ0JBQUtOLEtBQUtRLEdBQUwsSUFBWSxDQUFDUixLQUFLRyxPQUF2QixFQUFpQztBQUNwQztBQUNELGVBQU9ILElBQVA7QUFDSCxLOztxQkFFRHNCLFcsd0JBQVlGLEksRUFBTUQsSyxFQUFPO0FBQ3JCLFlBQUlnRCxPQUFPaEQsTUFBTSxDQUFOLENBQVg7QUFDQSxZQUFLQSxNQUFNLENBQU4sTUFBYSxRQUFsQixFQUE2QjtBQUN6QkMsaUJBQUtQLElBQUwsQ0FBVXVELE1BQVYsR0FBbUIsSUFBbkI7QUFDQUQsbUJBQU9BLEtBQUsxQyxLQUFMLENBQVcsQ0FBWCxDQUFQO0FBQ0gsU0FIRCxNQUdPO0FBQ0gwQyxtQkFBT0EsS0FBSzFDLEtBQUwsQ0FBVyxDQUFYLEVBQWMsQ0FBQyxDQUFmLENBQVA7QUFDSDs7QUFFRCxZQUFJNEMsUUFBUUYsS0FBS0UsS0FBTCxDQUFXLDRCQUFYLENBQVo7QUFDQSxZQUFLQSxLQUFMLEVBQWE7QUFDVGpELGlCQUFLK0MsSUFBTCxHQUFZRSxNQUFNLENBQU4sQ0FBWjtBQUNBakQsaUJBQUtQLElBQUwsQ0FBVXlELElBQVYsR0FBaUJELE1BQU0sQ0FBTixDQUFqQjtBQUNBakQsaUJBQUtQLElBQUwsQ0FBVTBELFdBQVYsR0FBd0JGLE1BQU0sQ0FBTixDQUF4QjtBQUNILFNBSkQsTUFJTztBQUNIakQsaUJBQUsrQyxJQUFMLEdBQVksRUFBWjtBQUNBL0MsaUJBQUtQLElBQUwsQ0FBVXlELElBQVYsR0FBaUIsRUFBakI7QUFDQWxELGlCQUFLUCxJQUFMLENBQVUwRCxXQUFWLEdBQXdCLEVBQXhCO0FBQ0g7QUFDSixLOztBQUVEOztxQkFFQWhCLEssa0JBQU1pQixHLEVBQUszRSxJLEVBQU1DLE0sRUFBUTtBQUNyQixjQUFNLEtBQUtYLEtBQUwsQ0FBV29FLEtBQVgsQ0FBaUJpQixHQUFqQixFQUFzQjNFLElBQXRCLEVBQTRCQyxNQUE1QixDQUFOO0FBQ0gsSzs7cUJBRUQ2QixhLDBCQUFjUixLLEVBQU87QUFDakIsYUFBS29DLEtBQUwsQ0FBVyxzQkFBWCxFQUFtQ3BDLE1BQU0sQ0FBTixDQUFuQyxFQUE2Q0EsTUFBTSxDQUFOLENBQTdDO0FBQ0gsSzs7cUJBRURzQixXLHdCQUFZdEIsSyxFQUFPO0FBQ2YsYUFBS29DLEtBQUwsQ0FBVywwQkFBWCxFQUF1Q3BDLE1BQU0sQ0FBTixDQUF2QyxFQUFpREEsTUFBTSxDQUFOLENBQWpEO0FBQ0gsSzs7cUJBRUQ4QixpQiw4QkFBa0JqRCxJLEVBQU07QUFDcEIsYUFBS3VELEtBQUwsQ0FBVyxtQ0FBWCxFQUFnRHZELEtBQUt5RSxNQUFyRCxFQUE2RCxDQUE3RDtBQUNILEs7O3FCQUVEdEIsVyx3QkFBWXVCLFEsRUFBVUMsSSxFQUFNM0UsSSxFQUFNO0FBQzlCLFlBQUl3RSxvQkFBbUJFLFFBQW5CLHlCQUFpREMsSUFBckQ7QUFDQSxhQUFLcEIsS0FBTCxDQUFXaUIsR0FBWCxFQUFnQnhFLEtBQUt5RSxNQUFyQixFQUE2QixDQUE3QjtBQUNILEs7O3FCQUVEakMsTyxvQkFBUXJCLEssRUFBTztBQUNYLGFBQUtvQyxLQUFMLENBQVcsa0NBQVgsRUFBK0NwQyxNQUFNLENBQU4sQ0FBL0MsRUFBeURBLE1BQU0sQ0FBTixDQUF6RDtBQUNILEs7Ozs7O2tCQXJYZ0JqQyxNIiwiZmlsZSI6InBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZWNsYXJhdGlvbiBmcm9tICdwb3N0Y3NzL2xpYi9kZWNsYXJhdGlvbic7XG5pbXBvcnQgQ29tbWVudCAgICAgZnJvbSAncG9zdGNzcy9saWIvY29tbWVudCc7XG5pbXBvcnQgQXRSdWxlICAgICAgZnJvbSAncG9zdGNzcy9saWIvYXQtcnVsZSc7XG5pbXBvcnQgUnVsZSAgICAgICAgZnJvbSAncG9zdGNzcy9saWIvcnVsZSc7XG5pbXBvcnQgUm9vdCAgICAgICAgZnJvbSAncG9zdGNzcy9saWIvcm9vdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnNlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihpbnB1dCkge1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgdGhpcy5wb3MgICAgID0gMDtcbiAgICAgICAgdGhpcy5yb290ICAgID0gbmV3IFJvb3QoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5yb290O1xuICAgICAgICB0aGlzLnNwYWNlcyAgPSAnJztcblxuICAgICAgICB0aGlzLnByZXZJbmRlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc3RlcCAgICAgICA9IHVuZGVmaW5lZDtcblxuICAgICAgICB0aGlzLnJvb3Quc291cmNlID0geyBpbnB1dCwgc3RhcnQ6IHsgbGluZTogMSwgY29sdW1uOiAxIH0gfTtcbiAgICB9XG5cbiAgICBsb29wKCkge1xuICAgICAgICBsZXQgcGFydDtcbiAgICAgICAgd2hpbGUgKCB0aGlzLnBvcyA8IHRoaXMucGFydHMubGVuZ3RoICkge1xuICAgICAgICAgICAgcGFydCA9IHRoaXMucGFydHNbdGhpcy5wb3NdO1xuXG4gICAgICAgICAgICBpZiAoIHBhcnQuY29tbWVudCApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1lbnQocGFydCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBwYXJ0LmF0cnVsZSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0cnVsZShwYXJ0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHBhcnQuY29sb24gKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5leHQgPSB0aGlzLm5leHROb25Db21tZW50KHRoaXMucG9zKTtcblxuICAgICAgICAgICAgICAgIGlmICggbmV4dC5lbmQgfHwgbmV4dC5hdHJ1bGUgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbChwYXJ0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW9yZUluZGVudCA9IG5leHQuaW5kZW50Lmxlbmd0aCA+IHBhcnQuaW5kZW50Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbW9yZUluZGVudCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbChwYXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggbW9yZUluZGVudCAmJiBuZXh0LmNvbG9uICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydWxlKHBhcnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBtb3JlSW5kZW50ICYmICFuZXh0LmNvbG9uICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNsKHBhcnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICggcGFydC5lbmQgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290LnJhd3MuYWZ0ZXIgPSBwYXJ0LmJlZm9yZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ydWxlKHBhcnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICggbGV0IGkgPSB0aGlzLnRva2Vucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSApIHtcbiAgICAgICAgICAgIGlmICggdGhpcy50b2tlbnNbaV0ubGVuZ3RoID4gMyApIHtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdCA9IHRoaXMudG9rZW5zW2ldO1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5zb3VyY2UuZW5kID0ge1xuICAgICAgICAgICAgICAgICAgICBsaW5lOiAgIGxhc3RbNF0gfHwgbGFzdFsyXSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBsYXN0WzVdIHx8IGxhc3RbM11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tbWVudChwYXJ0KSB7XG4gICAgICAgIGxldCB0b2tlbiA9IHBhcnQudG9rZW5zWzBdO1xuICAgICAgICBsZXQgbm9kZSAgPSBuZXcgQ29tbWVudCgpO1xuICAgICAgICB0aGlzLmluaXQobm9kZSwgcGFydCk7XG4gICAgICAgIG5vZGUuc291cmNlLmVuZCA9IHsgbGluZTogdG9rZW5bNF0sIGNvbHVtbjogdG9rZW5bNV0gfTtcbiAgICAgICAgdGhpcy5jb21tZW50VGV4dChub2RlLCB0b2tlbik7XG4gICAgfVxuXG4gICAgYXRydWxlKHBhcnQpIHtcbiAgICAgICAgbGV0IGF0d29yZCA9IHBhcnQudG9rZW5zWzBdO1xuICAgICAgICBsZXQgcGFyYW1zID0gcGFydC50b2tlbnMuc2xpY2UoMSk7XG5cbiAgICAgICAgbGV0IG5vZGUgID0gbmV3IEF0UnVsZSgpO1xuICAgICAgICBub2RlLm5hbWUgPSBhdHdvcmRbMV0uc2xpY2UoMSk7XG4gICAgICAgIHRoaXMuaW5pdChub2RlLCBwYXJ0KTtcblxuICAgICAgICBpZiAoIG5vZGUubmFtZSA9PT0gJycgKSB0aGlzLnVubmFtZWRBdHJ1bGUoYXR3b3JkKTtcblxuICAgICAgICB3aGlsZSAoICFwYXJ0LmVuZCAmJiBwYXJ0Lmxhc3RDb21tYSApIHtcbiAgICAgICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICAgICAgICBwYXJ0ID0gdGhpcy5wYXJ0c1t0aGlzLnBvc107XG4gICAgICAgICAgICBwYXJhbXMucHVzaChbJ3NwYWNlJywgcGFydC5iZWZvcmUgKyBwYXJ0LmluZGVudF0pO1xuICAgICAgICAgICAgcGFyYW1zID0gcGFyYW1zLmNvbmNhdChwYXJ0LnRva2Vucyk7XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLnJhd3MuYWZ0ZXJOYW1lID0gdGhpcy5maXJzdFNwYWNlcyhwYXJhbXMpO1xuICAgICAgICB0aGlzLmtlZXBUcmFpbGluZ1NwYWNlKG5vZGUsIHBhcmFtcyk7XG4gICAgICAgIHRoaXMuY2hlY2tTZW1pY29sb24ocGFyYW1zKTtcbiAgICAgICAgdGhpcy5jaGVja0N1cmx5KHBhcmFtcyk7XG4gICAgICAgIHRoaXMucmF3KG5vZGUsICdwYXJhbXMnLCBwYXJhbXMsIGF0d29yZCk7XG4gICAgfVxuXG4gICAgZGVjbChwYXJ0KSB7XG4gICAgICAgIGxldCBub2RlID0gbmV3IERlY2xhcmF0aW9uKCk7XG4gICAgICAgIHRoaXMuaW5pdChub2RlLCBwYXJ0KTtcblxuICAgICAgICBsZXQgYmV0d2VlbiA9ICcnO1xuICAgICAgICBsZXQgY29sb24gICA9IDA7XG4gICAgICAgIGxldCB2YWx1ZSAgID0gW107XG4gICAgICAgIGxldCBwcm9wICAgID0gJyc7XG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IHBhcnQudG9rZW5zLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgbGV0IHRva2VuID0gcGFydC50b2tlbnNbaV07XG4gICAgICAgICAgICBpZiAoIHRva2VuWzBdID09PSAnOicgKSB7XG4gICAgICAgICAgICAgICAgYmV0d2VlbiArPSB0b2tlblsxXTtcbiAgICAgICAgICAgICAgICBjb2xvbiAgICA9IHRva2VuO1xuICAgICAgICAgICAgICAgIHZhbHVlICAgID0gcGFydC50b2tlbnMuc2xpY2UoaSArIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggdG9rZW5bMF0gPT09ICdjb21tZW50JyB8fCB0b2tlblswXSA9PT0gJ3NwYWNlJyApIHtcbiAgICAgICAgICAgICAgICBiZXR3ZWVuICs9IHRva2VuWzFdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggYmV0d2VlbiAhPT0gJycgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iYWRQcm9wKHRva2VuKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJvcCArPSB0b2tlblsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggcHJvcCA9PT0gJycgKSB0aGlzLnVubmFtZWREZWNsKHBhcnQudG9rZW5zWzBdKTtcbiAgICAgICAgbm9kZS5wcm9wID0gcHJvcDtcblxuICAgICAgICBsZXQgbmV4dCA9IHRoaXMucGFydHNbdGhpcy5wb3MgKyAxXTtcblxuICAgICAgICB3aGlsZSAoICFuZXh0LmVuZCAmJiAhbmV4dC5hdHJ1bGUgJiYgIW5leHQuY29sb24gJiZcbiAgICAgICAgICAgICAgICBuZXh0LmluZGVudC5sZW5ndGggPiBwYXJ0LmluZGVudC5sZW5ndGggKSB7XG4gICAgICAgICAgICB2YWx1ZS5wdXNoKFsnc3BhY2UnLCBuZXh0LmJlZm9yZSArIG5leHQuaW5kZW50XSk7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmNvbmNhdChuZXh0LnRva2Vucyk7XG4gICAgICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICAgICAgbmV4dCA9IHRoaXMucGFydHNbdGhpcy5wb3MgKyAxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsYXN0ID0gdmFsdWVbdmFsdWUubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmICggbGFzdCAmJiBsYXN0WzBdID09PSAnY29tbWVudCcgKSB7XG4gICAgICAgICAgICB2YWx1ZS5wb3AoKTtcbiAgICAgICAgICAgIGxldCBjb21tZW50ID0gbmV3IENvbW1lbnQoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5wdXNoKGNvbW1lbnQpO1xuICAgICAgICAgICAgY29tbWVudC5zb3VyY2UgPSB7XG4gICAgICAgICAgICAgICAgaW5wdXQ6IHRoaXMuaW5wdXQsXG4gICAgICAgICAgICAgICAgc3RhcnQ6IHsgbGluZTogbGFzdFsyXSwgY29sdW1uOiBsYXN0WzNdIH0sXG4gICAgICAgICAgICAgICAgZW5kOiAgIHsgbGluZTogbGFzdFs0XSwgY29sdW1uOiBsYXN0WzVdIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgcHJldiA9IHZhbHVlW3ZhbHVlLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKCBwcmV2ICYmIHByZXZbMF0gPT09ICdzcGFjZScgKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUucG9wKCk7XG4gICAgICAgICAgICAgICAgY29tbWVudC5yYXdzLmJlZm9yZSA9IHByZXZbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbW1lbnRUZXh0KGNvbW1lbnQsIGxhc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICggbGV0IGkgPSB2YWx1ZS5sZW5ndGggLSAxOyBpID4gMDsgaS0tICkge1xuICAgICAgICAgICAgbGV0IHQgPSB2YWx1ZVtpXVswXTtcbiAgICAgICAgICAgIGlmICggdCA9PT0gJ3dvcmQnICYmIHZhbHVlW2ldWzFdID09PSAnIWltcG9ydGFudCcgKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5pbXBvcnRhbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICggaSA+IDAgJiYgdmFsdWVbaSAtIDFdWzBdID09PSAnc3BhY2UnICkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnJhd3MuaW1wb3J0YW50ID0gdmFsdWVbaSAtIDFdWzFdICsgJyFpbXBvcnRhbnQnO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5zcGxpY2UoaSAtIDEsIDIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmF3cy5pbXBvcnRhbnQgPSAnIWltcG9ydGFudCc7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0ICE9PSAnc3BhY2UnICYmIHQgIT09ICduZXdsaW5lJyAmJiB0ICE9PSAnY29tbWVudCcgKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiA9IGJldHdlZW4gKyB0aGlzLmZpcnN0U3BhY2VzKHZhbHVlKTtcbiAgICAgICAgdGhpcy5jaGVja1NlbWljb2xvbih2YWx1ZSk7XG4gICAgICAgIHRoaXMucmF3KG5vZGUsICd2YWx1ZScsIHZhbHVlLCBjb2xvbik7XG4gICAgfVxuXG4gICAgcnVsZShwYXJ0KSB7XG4gICAgICAgIGxldCBub2RlID0gbmV3IFJ1bGUoKTtcbiAgICAgICAgdGhpcy5pbml0KG5vZGUsIHBhcnQpO1xuXG4gICAgICAgIGxldCBzZWxlY3RvciA9IHBhcnQudG9rZW5zO1xuICAgICAgICBsZXQgbmV4dCAgICAgPSB0aGlzLnBhcnRzW3RoaXMucG9zICsgMV07XG5cbiAgICAgICAgd2hpbGUgKCAhbmV4dC5lbmQgJiYgbmV4dC5pbmRlbnQubGVuZ3RoID09PSBwYXJ0LmluZGVudC5sZW5ndGggKSB7XG4gICAgICAgICAgICBzZWxlY3Rvci5wdXNoKFsnc3BhY2UnLCBuZXh0LmJlZm9yZSArIG5leHQuaW5kZW50XSk7XG4gICAgICAgICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLmNvbmNhdChuZXh0LnRva2Vucyk7XG4gICAgICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICAgICAgbmV4dCA9IHRoaXMucGFydHNbdGhpcy5wb3MgKyAxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMua2VlcFRyYWlsaW5nU3BhY2Uobm9kZSwgc2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmNoZWNrQ3VybHkoc2VsZWN0b3IpO1xuICAgICAgICB0aGlzLnJhdyhub2RlLCAnc2VsZWN0b3InLCBzZWxlY3Rvcik7XG4gICAgfVxuXG4gICAgLyogSGVscGVycyAqL1xuXG4gICAgaW5kZW50KHBhcnQpIHtcbiAgICAgICAgbGV0IGluZGVudCA9IHBhcnQuaW5kZW50Lmxlbmd0aDtcbiAgICAgICAgbGV0IGlzUHJldiA9IHR5cGVvZiB0aGlzLnByZXZJbmRlbnQgIT09ICd1bmRlZmluZWQnO1xuXG4gICAgICAgIGlmICggIWlzUHJldiAmJiBpbmRlbnQgKSB0aGlzLmluZGVudGVkRmlyc3RMaW5lKHBhcnQpO1xuXG4gICAgICAgIGlmICggIXRoaXMuc3RlcCAmJiBpbmRlbnQgKSB7XG4gICAgICAgICAgICB0aGlzLnN0ZXAgPSBpbmRlbnQ7XG4gICAgICAgICAgICB0aGlzLnJvb3QucmF3cy5pbmRlbnQgPSBwYXJ0LmluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggaXNQcmV2ICYmIHRoaXMucHJldkluZGVudCAhPT0gaW5kZW50ICkge1xuICAgICAgICAgICAgbGV0IGRpZmYgPSBpbmRlbnQgLSB0aGlzLnByZXZJbmRlbnQ7XG4gICAgICAgICAgICBpZiAoIGRpZmYgPiAwICkge1xuICAgICAgICAgICAgICAgIGlmICggZGlmZiAhPT0gdGhpcy5zdGVwICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndyb25nSW5kZW50KHRoaXMucHJldkluZGVudCArIHRoaXMuc3RlcCwgaW5kZW50LCBwYXJ0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmN1cnJlbnQubGFzdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBkaWZmICUgdGhpcy5zdGVwICE9PSAwICkge1xuICAgICAgICAgICAgICAgIGxldCBtID0gaW5kZW50ICsgZGlmZiAlIHRoaXMuc3RlcDtcbiAgICAgICAgICAgICAgICB0aGlzLndyb25nSW5kZW50KGAkeyBtIH0gb3IgJHsgbSArIHRoaXMuc3RlcCB9YCwgaW5kZW50LCBwYXJ0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgLWRpZmYgLyB0aGlzLnN0ZXA7IGkrKyApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5jdXJyZW50LnBhcmVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZXZJbmRlbnQgPSBpbmRlbnQ7XG4gICAgfVxuXG4gICAgaW5pdChub2RlLCBwYXJ0KSB7XG4gICAgICAgIHRoaXMuaW5kZW50KHBhcnQpO1xuXG4gICAgICAgIGlmICggIXRoaXMuY3VycmVudC5ub2RlcyApIHRoaXMuY3VycmVudC5ub2RlcyA9IFtdO1xuICAgICAgICB0aGlzLmN1cnJlbnQucHVzaChub2RlKTtcblxuICAgICAgICBub2RlLnJhd3MuYmVmb3JlID0gcGFydC5iZWZvcmUgKyBwYXJ0LmluZGVudDtcbiAgICAgICAgbm9kZS5zb3VyY2UgPSB7XG4gICAgICAgICAgICBzdGFydDogeyBsaW5lOiBwYXJ0LnRva2Vuc1swXVsyXSwgY29sdW1uOiBwYXJ0LnRva2Vuc1swXVszXSB9LFxuICAgICAgICAgICAgaW5wdXQ6IHRoaXMuaW5wdXRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjaGVja0N1cmx5KHRva2Vucykge1xuICAgICAgICBmb3IgKCBsZXQgdG9rZW4gb2YgdG9rZW5zICkge1xuICAgICAgICAgICAgaWYgKCB0b2tlblswXSA9PT0gJ3snICkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1VubmVjZXNzYXJ5IGN1cmx5IGJyYWNrZXQnLCB0b2tlblsyXSwgdG9rZW5bM10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tTZW1pY29sb24odG9rZW5zKSB7XG4gICAgICAgIGZvciAoIGxldCB0b2tlbiBvZiB0b2tlbnMgKSB7XG4gICAgICAgICAgICBpZiAoIHRva2VuWzBdID09PSAnOycgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcignVW5uZWNlc3Nhcnkgc2VtaWNvbG9uJywgdG9rZW5bMl0sIHRva2VuWzNdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGtlZXBUcmFpbGluZ1NwYWNlKG5vZGUsIHRva2Vucykge1xuICAgICAgICBsZXQgbGFzdFNwYWNlID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKCBsYXN0U3BhY2UgJiYgbGFzdFNwYWNlWzBdID09PSAnc3BhY2UnICkge1xuICAgICAgICAgICAgdG9rZW5zLnBvcCgpO1xuICAgICAgICAgICAgbm9kZS5yYXdzLnNzc0JldHdlZW4gPSBsYXN0U3BhY2VbMV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaXJzdFNwYWNlcyh0b2tlbnMpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBpZiAoIHRva2Vuc1tpXVswXSA9PT0gJ3NwYWNlJyB8fCB0b2tlbnNbaV1bMF0gPT09ICduZXdsaW5lJyApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gdG9rZW5zLnNoaWZ0KClbMV07XG4gICAgICAgICAgICAgICAgaSAtPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJhdyhub2RlLCBwcm9wLCB0b2tlbnMsIGFsdExhc3QpIHtcbiAgICAgICAgbGV0IHRva2VuLCB0eXBlO1xuICAgICAgICBsZXQgbGVuZ3RoID0gdG9rZW5zLmxlbmd0aDtcbiAgICAgICAgbGV0IHZhbHVlICA9ICcnO1xuICAgICAgICBsZXQgY2xlYW4gID0gdHJ1ZTtcbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEgKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIHR5cGUgID0gdG9rZW5bMF07XG4gICAgICAgICAgICBpZiAoIHR5cGUgPT09ICdjb21tZW50JyB8fCB0eXBlID09PSAnc3BhY2UnICYmIGkgPT09IGxlbmd0aCAtIDEgKSB7XG4gICAgICAgICAgICAgICAgY2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gdG9rZW5bMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCAhY2xlYW4gKSB7XG4gICAgICAgICAgICBsZXQgc3NzID0gdG9rZW5zLnJlZHVjZSggKGFsbCwgaSkgPT4gYWxsICsgaVsxXSwgJycpO1xuICAgICAgICAgICAgbGV0IHJhdyA9IHRva2Vucy5yZWR1Y2UoIChhbGwsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIGlbMF0gPT09ICdjb21tZW50JyAmJiBpWzZdID09PSAnaW5saW5lJyApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsbCArICcvKiAnICsgaVsxXS5zbGljZSgyKS50cmltKCkgKyAnICovJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWxsICsgaVsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAnJyk7XG4gICAgICAgICAgICBub2RlLnJhd3NbcHJvcF0gPSB7IHZhbHVlLCByYXcgfTtcbiAgICAgICAgICAgIGlmICggc3NzICE9PSByYXcgKSBub2RlLnJhd3NbcHJvcF0uc3NzID0gc3NzO1xuICAgICAgICB9XG4gICAgICAgIG5vZGVbcHJvcF0gPSB2YWx1ZTtcblxuICAgICAgICBsZXQgbGFzdDtcbiAgICAgICAgZm9yICggbGV0IGkgPSB0b2tlbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0gKSB7XG4gICAgICAgICAgICBpZiAoIHRva2Vuc1tpXS5sZW5ndGggPiAyICkge1xuICAgICAgICAgICAgICAgIGxhc3QgPSB0b2tlbnNbaV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCAhbGFzdCApIGxhc3QgPSBhbHRMYXN0O1xuXG4gICAgICAgIG5vZGUuc291cmNlLmVuZCA9IHtcbiAgICAgICAgICAgIGxpbmU6ICAgbGFzdFs0XSB8fCBsYXN0WzJdLFxuICAgICAgICAgICAgY29sdW1uOiBsYXN0WzVdIHx8IGxhc3RbM11cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBuZXh0Tm9uQ29tbWVudChwb3MpIHtcbiAgICAgICAgbGV0IG5leHQgPSBwb3M7XG4gICAgICAgIGxldCBwYXJ0O1xuICAgICAgICB3aGlsZSAoIG5leHQgPCB0aGlzLnBhcnRzLmxlbmd0aCApIHtcbiAgICAgICAgICAgIG5leHQgKz0gMTtcbiAgICAgICAgICAgIHBhcnQgPSB0aGlzLnBhcnRzW25leHRdO1xuICAgICAgICAgICAgaWYgKCBwYXJ0LmVuZCB8fCAhcGFydC5jb21tZW50ICkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcnQ7XG4gICAgfVxuXG4gICAgY29tbWVudFRleHQobm9kZSwgdG9rZW4pIHtcbiAgICAgICAgbGV0IHRleHQgPSB0b2tlblsxXTtcbiAgICAgICAgaWYgKCB0b2tlbls2XSA9PT0gJ2lubGluZScgKSB7XG4gICAgICAgICAgICBub2RlLnJhd3MuaW5saW5lID0gdHJ1ZTtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnNsaWNlKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGV4dCA9IHRleHQuc2xpY2UoMiwgLTIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1hdGNoID0gdGV4dC5tYXRjaCgvXihcXHMqKShbXl0qW15cXHNdKShcXHMqKVxcbj8kLyk7XG4gICAgICAgIGlmICggbWF0Y2ggKSB7XG4gICAgICAgICAgICBub2RlLnRleHQgPSBtYXRjaFsyXTtcbiAgICAgICAgICAgIG5vZGUucmF3cy5sZWZ0ID0gbWF0Y2hbMV07XG4gICAgICAgICAgICBub2RlLnJhd3MuaW5saW5lUmlnaHQgPSBtYXRjaFszXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUudGV4dCA9ICcnO1xuICAgICAgICAgICAgbm9kZS5yYXdzLmxlZnQgPSAnJztcbiAgICAgICAgICAgIG5vZGUucmF3cy5pbmxpbmVSaWdodCA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRXJyb3JzXG5cbiAgICBlcnJvcihtc2csIGxpbmUsIGNvbHVtbikge1xuICAgICAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKG1zZywgbGluZSwgY29sdW1uKTtcbiAgICB9XG5cbiAgICB1bm5hbWVkQXRydWxlKHRva2VuKSB7XG4gICAgICAgIHRoaXMuZXJyb3IoJ0F0LXJ1bGUgd2l0aG91dCBuYW1lJywgdG9rZW5bMl0sIHRva2VuWzNdKTtcbiAgICB9XG5cbiAgICB1bm5hbWVkRGVjbCh0b2tlbikge1xuICAgICAgICB0aGlzLmVycm9yKCdEZWNsYXJhdGlvbiB3aXRob3V0IG5hbWUnLCB0b2tlblsyXSwgdG9rZW5bM10pO1xuICAgIH1cblxuICAgIGluZGVudGVkRmlyc3RMaW5lKHBhcnQpIHtcbiAgICAgICAgdGhpcy5lcnJvcignRmlyc3QgbGluZSBzaG91bGQgbm90IGhhdmUgaW5kZW50JywgcGFydC5udW1iZXIsIDEpO1xuICAgIH1cblxuICAgIHdyb25nSW5kZW50KGV4cGVjdGVkLCByZWFsLCBwYXJ0KSB7XG4gICAgICAgIGxldCBtc2cgPSBgRXhwZWN0ZWQgJHsgZXhwZWN0ZWQgfSBpbmRlbnQsIGJ1dCBnZXQgJHsgcmVhbCB9YDtcbiAgICAgICAgdGhpcy5lcnJvcihtc2csIHBhcnQubnVtYmVyLCAxKTtcbiAgICB9XG5cbiAgICBiYWRQcm9wKHRva2VuKSB7XG4gICAgICAgIHRoaXMuZXJyb3IoJ1VuZXhwZWN0ZWQgc2VwYXJhdG9yIGluIHByb3BlcnR5JywgdG9rZW5bMl0sIHRva2VuWzNdKTtcbiAgICB9XG5cbn1cbiJdfQ==