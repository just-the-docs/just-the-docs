'use strict';

exports.__esModule = true;

var _comment = require('postcss/lib/comment');

var _comment2 = _interopRequireDefault(_comment);

var _parser = require('postcss/lib/parser');

var _parser2 = _interopRequireDefault(_parser);

var _nestedDeclaration = require('./nested-declaration');

var _nestedDeclaration2 = _interopRequireDefault(_nestedDeclaration);

var _scssTokenize = require('./scss-tokenize');

var _scssTokenize2 = _interopRequireDefault(_scssTokenize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScssParser = function (_Parser) {
    _inherits(ScssParser, _Parser);

    function ScssParser() {
        _classCallCheck(this, ScssParser);

        return _possibleConstructorReturn(this, _Parser.apply(this, arguments));
    }

    ScssParser.prototype.tokenize = function tokenize() {
        this.tokens = (0, _scssTokenize2.default)(this.input);
    };

    ScssParser.prototype.rule = function rule(tokens) {
        var withColon = false;
        var brackets = 0;
        var value = '';
        for (var _iterator = tokens, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var _i2 = _ref;

            if (withColon) {
                if (_i2[0] !== 'comment' && _i2[0] !== '{') {
                    value += _i2[1];
                }
            } else if (_i2[0] === 'space' && _i2[1].indexOf('\n') !== -1) {
                break;
            } else if (_i2[0] === '(') {
                brackets += 1;
            } else if (_i2[0] === ')') {
                brackets -= 1;
            } else if (brackets === 0 && _i2[0] === ':') {
                withColon = true;
            }
        }

        if (!withColon || value.trim() === '' || /^[a-zA-Z-:#]/.test(value)) {
            _Parser.prototype.rule.call(this, tokens);
        } else {

            tokens.pop();
            var node = new _nestedDeclaration2.default();
            this.init(node);

            var last = tokens[tokens.length - 1];
            if (last[4]) {
                node.source.end = { line: last[4], column: last[5] };
            } else {
                node.source.end = { line: last[2], column: last[3] };
            }

            while (tokens[0][0] !== 'word') {
                node.raws.before += tokens.shift()[1];
            }
            node.source.start = { line: tokens[0][2], column: tokens[0][3] };

            node.prop = '';
            while (tokens.length) {
                var type = tokens[0][0];
                if (type === ':' || type === 'space' || type === 'comment') {
                    break;
                }
                node.prop += tokens.shift()[1];
            }

            node.raws.between = '';

            var token = void 0;
            while (tokens.length) {
                token = tokens.shift();

                if (token[0] === ':') {
                    node.raws.between += token[1];
                    break;
                } else {
                    node.raws.between += token[1];
                }
            }

            if (node.prop[0] === '_' || node.prop[0] === '*') {
                node.raws.before += node.prop[0];
                node.prop = node.prop.slice(1);
            }
            node.raws.between += this.spacesAndCommentsFromStart(tokens);
            this.precheckMissedSemicolon(tokens);

            for (var i = tokens.length - 1; i > 0; i--) {
                token = tokens[i];
                if (token[1] === '!important') {
                    node.important = true;
                    var string = this.stringFrom(tokens, i);
                    string = this.spacesFromEnd(tokens) + string;
                    if (string !== ' !important') {
                        node.raws.important = string;
                    }
                    break;
                } else if (token[1] === 'important') {
                    var cache = tokens.slice(0);
                    var str = '';
                    for (var j = i; j > 0; j--) {
                        var _type = cache[j][0];
                        if (str.trim().indexOf('!') === 0 && _type !== 'space') {
                            break;
                        }
                        str = cache.pop()[1] + str;
                    }
                    if (str.trim().indexOf('!') === 0) {
                        node.important = true;
                        node.raws.important = str;
                        tokens = cache;
                    }
                }

                if (token[0] !== 'space' && token[0] !== 'comment') {
                    break;
                }
            }

            this.raw(node, 'value', tokens);

            if (node.value.indexOf(':') !== -1) {
                this.checkMissedSemicolon(tokens);
            }

            this.current = node;
        }
    };

    ScssParser.prototype.comment = function comment(token) {
        if (token[6] === 'inline') {
            var node = new _comment2.default();
            this.init(node, token[2], token[3]);
            node.raws.inline = true;
            node.source.end = { line: token[4], column: token[5] };

            var text = token[1].slice(2);
            if (/^\s*$/.test(text)) {
                node.text = '';
                node.raws.left = text;
                node.raws.right = '';
            } else {
                var match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);
                var fixed = match[2].replace(/(\*\/|\/\*)/g, '*//*');
                node.text = fixed;
                node.raws.left = match[1];
                node.raws.right = match[3];
                node.raws.text = match[2];
            }
        } else {
            _Parser.prototype.comment.call(this, token);
        }
    };

    return ScssParser;
}(_parser2.default);

exports.default = ScssParser;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjc3MtcGFyc2VyLmVzNiJdLCJuYW1lcyI6WyJTY3NzUGFyc2VyIiwidG9rZW5pemUiLCJ0b2tlbnMiLCJpbnB1dCIsInJ1bGUiLCJ3aXRoQ29sb24iLCJicmFja2V0cyIsInZhbHVlIiwiaSIsImluZGV4T2YiLCJ0cmltIiwidGVzdCIsInBvcCIsIm5vZGUiLCJpbml0IiwibGFzdCIsImxlbmd0aCIsInNvdXJjZSIsImVuZCIsImxpbmUiLCJjb2x1bW4iLCJyYXdzIiwiYmVmb3JlIiwic2hpZnQiLCJzdGFydCIsInByb3AiLCJ0eXBlIiwiYmV0d2VlbiIsInRva2VuIiwic2xpY2UiLCJzcGFjZXNBbmRDb21tZW50c0Zyb21TdGFydCIsInByZWNoZWNrTWlzc2VkU2VtaWNvbG9uIiwiaW1wb3J0YW50Iiwic3RyaW5nIiwic3RyaW5nRnJvbSIsInNwYWNlc0Zyb21FbmQiLCJjYWNoZSIsInN0ciIsImoiLCJyYXciLCJjaGVja01pc3NlZFNlbWljb2xvbiIsImN1cnJlbnQiLCJjb21tZW50IiwiaW5saW5lIiwidGV4dCIsImxlZnQiLCJyaWdodCIsIm1hdGNoIiwiZml4ZWQiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7O3lCQUVqQkMsUSx1QkFBVztBQUNQLGFBQUtDLE1BQUwsR0FBYyw0QkFBYyxLQUFLQyxLQUFuQixDQUFkO0FBQ0gsSzs7eUJBRURDLEksaUJBQUtGLE0sRUFBUTtBQUNULFlBQUlHLFlBQVksS0FBaEI7QUFDQSxZQUFJQyxXQUFZLENBQWhCO0FBQ0EsWUFBSUMsUUFBWSxFQUFoQjtBQUNBLDZCQUFlTCxNQUFmLGtIQUF3QjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0JBQWRNLEdBQWM7O0FBQ3BCLGdCQUFLSCxTQUFMLEVBQWlCO0FBQ2Isb0JBQUtHLElBQUUsQ0FBRixNQUFTLFNBQVQsSUFBc0JBLElBQUUsQ0FBRixNQUFTLEdBQXBDLEVBQTBDO0FBQ3RDRCw2QkFBU0MsSUFBRSxDQUFGLENBQVQ7QUFDSDtBQUNKLGFBSkQsTUFJTyxJQUFLQSxJQUFFLENBQUYsTUFBUyxPQUFULElBQW9CQSxJQUFFLENBQUYsRUFBS0MsT0FBTCxDQUFhLElBQWIsTUFBdUIsQ0FBQyxDQUFqRCxFQUFxRDtBQUN4RDtBQUNILGFBRk0sTUFFQSxJQUFLRCxJQUFFLENBQUYsTUFBUyxHQUFkLEVBQW9CO0FBQ3ZCRiw0QkFBWSxDQUFaO0FBQ0gsYUFGTSxNQUVBLElBQUtFLElBQUUsQ0FBRixNQUFTLEdBQWQsRUFBb0I7QUFDdkJGLDRCQUFZLENBQVo7QUFDSCxhQUZNLE1BRUEsSUFBS0EsYUFBYSxDQUFiLElBQWtCRSxJQUFFLENBQUYsTUFBUyxHQUFoQyxFQUFzQztBQUN6Q0gsNEJBQVksSUFBWjtBQUNIO0FBQ0o7O0FBRUQsWUFBSyxDQUFDQSxTQUFELElBQWNFLE1BQU1HLElBQU4sT0FBaUIsRUFBL0IsSUFBcUMsZUFBZUMsSUFBZixDQUFvQkosS0FBcEIsQ0FBMUMsRUFBdUU7QUFDbkUsOEJBQU1ILElBQU4sWUFBV0YsTUFBWDtBQUNILFNBRkQsTUFFTzs7QUFFSEEsbUJBQU9VLEdBQVA7QUFDQSxnQkFBSUMsT0FBTyxpQ0FBWDtBQUNBLGlCQUFLQyxJQUFMLENBQVVELElBQVY7O0FBRUEsZ0JBQUlFLE9BQU9iLE9BQU9BLE9BQU9jLE1BQVAsR0FBZ0IsQ0FBdkIsQ0FBWDtBQUNBLGdCQUFJRCxLQUFLLENBQUwsQ0FBSixFQUFhO0FBQ1RGLHFCQUFLSSxNQUFMLENBQVlDLEdBQVosR0FBa0IsRUFBRUMsTUFBTUosS0FBSyxDQUFMLENBQVIsRUFBaUJLLFFBQVFMLEtBQUssQ0FBTCxDQUF6QixFQUFsQjtBQUNILGFBRkQsTUFFTztBQUNIRixxQkFBS0ksTUFBTCxDQUFZQyxHQUFaLEdBQWtCLEVBQUVDLE1BQU1KLEtBQUssQ0FBTCxDQUFSLEVBQWlCSyxRQUFRTCxLQUFLLENBQUwsQ0FBekIsRUFBbEI7QUFDSDs7QUFFRCxtQkFBT2IsT0FBTyxDQUFQLEVBQVUsQ0FBVixNQUFpQixNQUF4QixFQUFnQztBQUM1QlcscUJBQUtRLElBQUwsQ0FBVUMsTUFBVixJQUFvQnBCLE9BQU9xQixLQUFQLEdBQWUsQ0FBZixDQUFwQjtBQUNIO0FBQ0RWLGlCQUFLSSxNQUFMLENBQVlPLEtBQVosR0FBb0IsRUFBRUwsTUFBTWpCLE9BQU8sQ0FBUCxFQUFVLENBQVYsQ0FBUixFQUFzQmtCLFFBQVFsQixPQUFPLENBQVAsRUFBVSxDQUFWLENBQTlCLEVBQXBCOztBQUVBVyxpQkFBS1ksSUFBTCxHQUFZLEVBQVo7QUFDQSxtQkFBT3ZCLE9BQU9jLE1BQWQsRUFBc0I7QUFDbEIsb0JBQUlVLE9BQU94QixPQUFPLENBQVAsRUFBVSxDQUFWLENBQVg7QUFDQSxvQkFBSXdCLFNBQVMsR0FBVCxJQUFnQkEsU0FBUyxPQUF6QixJQUFvQ0EsU0FBUyxTQUFqRCxFQUE0RDtBQUN4RDtBQUNIO0FBQ0RiLHFCQUFLWSxJQUFMLElBQWF2QixPQUFPcUIsS0FBUCxHQUFlLENBQWYsQ0FBYjtBQUNIOztBQUVEVixpQkFBS1EsSUFBTCxDQUFVTSxPQUFWLEdBQW9CLEVBQXBCOztBQUVBLGdCQUFJQyxjQUFKO0FBQ0EsbUJBQU8xQixPQUFPYyxNQUFkLEVBQXNCO0FBQ2xCWSx3QkFBUTFCLE9BQU9xQixLQUFQLEVBQVI7O0FBRUEsb0JBQUlLLE1BQU0sQ0FBTixNQUFhLEdBQWpCLEVBQXNCO0FBQ2xCZix5QkFBS1EsSUFBTCxDQUFVTSxPQUFWLElBQXFCQyxNQUFNLENBQU4sQ0FBckI7QUFDQTtBQUNILGlCQUhELE1BR087QUFDSGYseUJBQUtRLElBQUwsQ0FBVU0sT0FBVixJQUFxQkMsTUFBTSxDQUFOLENBQXJCO0FBQ0g7QUFDSjs7QUFFRCxnQkFBSWYsS0FBS1ksSUFBTCxDQUFVLENBQVYsTUFBaUIsR0FBakIsSUFBd0JaLEtBQUtZLElBQUwsQ0FBVSxDQUFWLE1BQWlCLEdBQTdDLEVBQWtEO0FBQzlDWixxQkFBS1EsSUFBTCxDQUFVQyxNQUFWLElBQW9CVCxLQUFLWSxJQUFMLENBQVUsQ0FBVixDQUFwQjtBQUNBWixxQkFBS1ksSUFBTCxHQUFZWixLQUFLWSxJQUFMLENBQVVJLEtBQVYsQ0FBZ0IsQ0FBaEIsQ0FBWjtBQUNIO0FBQ0RoQixpQkFBS1EsSUFBTCxDQUFVTSxPQUFWLElBQXFCLEtBQUtHLDBCQUFMLENBQWdDNUIsTUFBaEMsQ0FBckI7QUFDQSxpQkFBSzZCLHVCQUFMLENBQTZCN0IsTUFBN0I7O0FBRUEsaUJBQUssSUFBSU0sSUFBSU4sT0FBT2MsTUFBUCxHQUFnQixDQUE3QixFQUFnQ1IsSUFBSSxDQUFwQyxFQUF1Q0EsR0FBdkMsRUFBNEM7QUFDeENvQix3QkFBUTFCLE9BQU9NLENBQVAsQ0FBUjtBQUNBLG9CQUFJb0IsTUFBTSxDQUFOLE1BQWEsWUFBakIsRUFBK0I7QUFDM0JmLHlCQUFLbUIsU0FBTCxHQUFpQixJQUFqQjtBQUNBLHdCQUFJQyxTQUFTLEtBQUtDLFVBQUwsQ0FBZ0JoQyxNQUFoQixFQUF3Qk0sQ0FBeEIsQ0FBYjtBQUNBeUIsNkJBQVMsS0FBS0UsYUFBTCxDQUFtQmpDLE1BQW5CLElBQTZCK0IsTUFBdEM7QUFDQSx3QkFBSUEsV0FBVyxhQUFmLEVBQThCO0FBQzFCcEIsNkJBQUtRLElBQUwsQ0FBVVcsU0FBVixHQUFzQkMsTUFBdEI7QUFDSDtBQUNEO0FBRUgsaUJBVEQsTUFTTyxJQUFJTCxNQUFNLENBQU4sTUFBYSxXQUFqQixFQUE4QjtBQUNqQyx3QkFBSVEsUUFBUWxDLE9BQU8yQixLQUFQLENBQWEsQ0FBYixDQUFaO0FBQ0Esd0JBQUlRLE1BQVEsRUFBWjtBQUNBLHlCQUFLLElBQUlDLElBQUk5QixDQUFiLEVBQWdCOEIsSUFBSSxDQUFwQixFQUF1QkEsR0FBdkIsRUFBNEI7QUFDeEIsNEJBQUlaLFFBQU9VLE1BQU1FLENBQU4sRUFBUyxDQUFULENBQVg7QUFDQSw0QkFBSUQsSUFBSTNCLElBQUosR0FBV0QsT0FBWCxDQUFtQixHQUFuQixNQUE0QixDQUE1QixJQUNBaUIsVUFBUyxPQURiLEVBRUU7QUFDRTtBQUNIO0FBQ0RXLDhCQUFNRCxNQUFNeEIsR0FBTixHQUFZLENBQVosSUFBaUJ5QixHQUF2QjtBQUNIO0FBQ0Qsd0JBQUlBLElBQUkzQixJQUFKLEdBQVdELE9BQVgsQ0FBbUIsR0FBbkIsTUFBNEIsQ0FBaEMsRUFBbUM7QUFDL0JJLDZCQUFLbUIsU0FBTCxHQUFpQixJQUFqQjtBQUNBbkIsNkJBQUtRLElBQUwsQ0FBVVcsU0FBVixHQUFzQkssR0FBdEI7QUFDQW5DLGlDQUFTa0MsS0FBVDtBQUNIO0FBQ0o7O0FBRUQsb0JBQUlSLE1BQU0sQ0FBTixNQUFhLE9BQWIsSUFBd0JBLE1BQU0sQ0FBTixNQUFhLFNBQXpDLEVBQW9EO0FBQ2hEO0FBQ0g7QUFDSjs7QUFFRCxpQkFBS1csR0FBTCxDQUFTMUIsSUFBVCxFQUFlLE9BQWYsRUFBd0JYLE1BQXhCOztBQUVBLGdCQUFJVyxLQUFLTixLQUFMLENBQVdFLE9BQVgsQ0FBbUIsR0FBbkIsTUFBNEIsQ0FBQyxDQUFqQyxFQUFvQztBQUNoQyxxQkFBSytCLG9CQUFMLENBQTBCdEMsTUFBMUI7QUFDSDs7QUFFRCxpQkFBS3VDLE9BQUwsR0FBZTVCLElBQWY7QUFDSDtBQUNKLEs7O3lCQUVENkIsTyxvQkFBUWQsSyxFQUFPO0FBQ1gsWUFBSUEsTUFBTSxDQUFOLE1BQWEsUUFBakIsRUFBMkI7QUFDdkIsZ0JBQUlmLE9BQU8sdUJBQVg7QUFDQSxpQkFBS0MsSUFBTCxDQUFVRCxJQUFWLEVBQWdCZSxNQUFNLENBQU4sQ0FBaEIsRUFBMEJBLE1BQU0sQ0FBTixDQUExQjtBQUNBZixpQkFBS1EsSUFBTCxDQUFVc0IsTUFBVixHQUFtQixJQUFuQjtBQUNBOUIsaUJBQUtJLE1BQUwsQ0FBWUMsR0FBWixHQUFtQixFQUFFQyxNQUFNUyxNQUFNLENBQU4sQ0FBUixFQUFrQlIsUUFBUVEsTUFBTSxDQUFOLENBQTFCLEVBQW5COztBQUVBLGdCQUFJZ0IsT0FBT2hCLE1BQU0sQ0FBTixFQUFTQyxLQUFULENBQWUsQ0FBZixDQUFYO0FBQ0EsZ0JBQUssUUFBUWxCLElBQVIsQ0FBYWlDLElBQWIsQ0FBTCxFQUEwQjtBQUN0Qi9CLHFCQUFLK0IsSUFBTCxHQUFrQixFQUFsQjtBQUNBL0IscUJBQUtRLElBQUwsQ0FBVXdCLElBQVYsR0FBa0JELElBQWxCO0FBQ0EvQixxQkFBS1EsSUFBTCxDQUFVeUIsS0FBVixHQUFrQixFQUFsQjtBQUNILGFBSkQsTUFJTztBQUNILG9CQUFJQyxRQUFRSCxLQUFLRyxLQUFMLENBQVcseUJBQVgsQ0FBWjtBQUNBLG9CQUFJQyxRQUFRRCxNQUFNLENBQU4sRUFBU0UsT0FBVCxDQUFpQixjQUFqQixFQUFpQyxNQUFqQyxDQUFaO0FBQ0FwQyxxQkFBSytCLElBQUwsR0FBa0JJLEtBQWxCO0FBQ0FuQyxxQkFBS1EsSUFBTCxDQUFVd0IsSUFBVixHQUFrQkUsTUFBTSxDQUFOLENBQWxCO0FBQ0FsQyxxQkFBS1EsSUFBTCxDQUFVeUIsS0FBVixHQUFrQkMsTUFBTSxDQUFOLENBQWxCO0FBQ0FsQyxxQkFBS1EsSUFBTCxDQUFVdUIsSUFBVixHQUFrQkcsTUFBTSxDQUFOLENBQWxCO0FBQ0g7QUFDSixTQW5CRCxNQW1CTztBQUNILDhCQUFNTCxPQUFOLFlBQWNkLEtBQWQ7QUFDSDtBQUNKLEs7Ozs7O2tCQWhKZ0I1QixVIiwiZmlsZSI6InNjc3MtcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1lbnQgZnJvbSAncG9zdGNzcy9saWIvY29tbWVudCc7XG5pbXBvcnQgUGFyc2VyICBmcm9tICdwb3N0Y3NzL2xpYi9wYXJzZXInO1xuXG5pbXBvcnQgTmVzdGVkRGVjbGFyYXRpb24gZnJvbSAnLi9uZXN0ZWQtZGVjbGFyYXRpb24nO1xuaW1wb3J0IHNjc3NUb2tlbml6ZXIgICAgIGZyb20gJy4vc2Nzcy10b2tlbml6ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjc3NQYXJzZXIgZXh0ZW5kcyBQYXJzZXIge1xuXG4gICAgdG9rZW5pemUoKSB7XG4gICAgICAgIHRoaXMudG9rZW5zID0gc2Nzc1Rva2VuaXplcih0aGlzLmlucHV0KTtcbiAgICB9XG5cbiAgICBydWxlKHRva2Vucykge1xuICAgICAgICBsZXQgd2l0aENvbG9uID0gZmFsc2U7XG4gICAgICAgIGxldCBicmFja2V0cyAgPSAwO1xuICAgICAgICBsZXQgdmFsdWUgICAgID0gJyc7XG4gICAgICAgIGZvciAoIGxldCBpIG9mIHRva2VucyApIHtcbiAgICAgICAgICAgIGlmICggd2l0aENvbG9uICkge1xuICAgICAgICAgICAgICAgIGlmICggaVswXSAhPT0gJ2NvbW1lbnQnICYmIGlbMF0gIT09ICd7JyApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gaVsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBpWzBdID09PSAnc3BhY2UnICYmIGlbMV0uaW5kZXhPZignXFxuJykgIT09IC0xICkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggaVswXSA9PT0gJygnICkge1xuICAgICAgICAgICAgICAgIGJyYWNrZXRzICs9IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBpWzBdID09PSAnKScgKSB7XG4gICAgICAgICAgICAgICAgYnJhY2tldHMgLT0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGJyYWNrZXRzID09PSAwICYmIGlbMF0gPT09ICc6JyApIHtcbiAgICAgICAgICAgICAgICB3aXRoQ29sb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAhd2l0aENvbG9uIHx8IHZhbHVlLnRyaW0oKSA9PT0gJycgfHwgL15bYS16QS1aLTojXS8udGVzdCh2YWx1ZSkgKSB7XG4gICAgICAgICAgICBzdXBlci5ydWxlKHRva2Vucyk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRva2Vucy5wb3AoKTtcbiAgICAgICAgICAgIGxldCBub2RlID0gbmV3IE5lc3RlZERlY2xhcmF0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmluaXQobm9kZSk7XG5cbiAgICAgICAgICAgIGxldCBsYXN0ID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmIChsYXN0WzRdKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zb3VyY2UuZW5kID0geyBsaW5lOiBsYXN0WzRdLCBjb2x1bW46IGxhc3RbNV0gfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zb3VyY2UuZW5kID0geyBsaW5lOiBsYXN0WzJdLCBjb2x1bW46IGxhc3RbM10gfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUgKHRva2Vuc1swXVswXSAhPT0gJ3dvcmQnKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yYXdzLmJlZm9yZSArPSB0b2tlbnMuc2hpZnQoKVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUuc291cmNlLnN0YXJ0ID0geyBsaW5lOiB0b2tlbnNbMF1bMl0sIGNvbHVtbjogdG9rZW5zWzBdWzNdIH07XG5cbiAgICAgICAgICAgIG5vZGUucHJvcCA9ICcnO1xuICAgICAgICAgICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IHRva2Vuc1swXVswXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJzonIHx8IHR5cGUgPT09ICdzcGFjZScgfHwgdHlwZSA9PT0gJ2NvbW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub2RlLnByb3AgKz0gdG9rZW5zLnNoaWZ0KClbMV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5vZGUucmF3cy5iZXR3ZWVuID0gJyc7XG5cbiAgICAgICAgICAgIGxldCB0b2tlbjtcbiAgICAgICAgICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnMuc2hpZnQoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0b2tlblswXSA9PT0gJzonKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmF3cy5iZXR3ZWVuICs9IHRva2VuWzFdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiArPSB0b2tlblsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub2RlLnByb3BbMF0gPT09ICdfJyB8fCBub2RlLnByb3BbMF0gPT09ICcqJykge1xuICAgICAgICAgICAgICAgIG5vZGUucmF3cy5iZWZvcmUgKz0gbm9kZS5wcm9wWzBdO1xuICAgICAgICAgICAgICAgIG5vZGUucHJvcCA9IG5vZGUucHJvcC5zbGljZSgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUucmF3cy5iZXR3ZWVuICs9IHRoaXMuc3BhY2VzQW5kQ29tbWVudHNGcm9tU3RhcnQodG9rZW5zKTtcbiAgICAgICAgICAgIHRoaXMucHJlY2hlY2tNaXNzZWRTZW1pY29sb24odG9rZW5zKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRva2Vucy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuWzFdID09PSAnIWltcG9ydGFudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5pbXBvcnRhbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyaW5nID0gdGhpcy5zdHJpbmdGcm9tKHRva2VucywgaSk7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyA9IHRoaXMuc3BhY2VzRnJvbUVuZCh0b2tlbnMpICsgc3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaW5nICE9PSAnICFpbXBvcnRhbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJhd3MuaW1wb3J0YW50ID0gc3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlblsxXSA9PT0gJ2ltcG9ydGFudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhY2hlID0gdG9rZW5zLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyICAgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IGk7IGogPiAwOyBqLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0eXBlID0gY2FjaGVbal1bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyLnRyaW0oKS5pbmRleE9mKCchJykgPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlICE9PSAnc3BhY2UnXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IGNhY2hlLnBvcCgpWzFdICsgc3RyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHIudHJpbSgpLmluZGV4T2YoJyEnKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5pbXBvcnRhbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yYXdzLmltcG9ydGFudCA9IHN0cjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VucyA9IGNhY2hlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuWzBdICE9PSAnc3BhY2UnICYmIHRva2VuWzBdICE9PSAnY29tbWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJhdyhub2RlLCAndmFsdWUnLCB0b2tlbnMpO1xuXG4gICAgICAgICAgICBpZiAobm9kZS52YWx1ZS5pbmRleE9mKCc6JykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja01pc3NlZFNlbWljb2xvbih0b2tlbnMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBub2RlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tbWVudCh0b2tlbikge1xuICAgICAgICBpZiAodG9rZW5bNl0gPT09ICdpbmxpbmUnKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBDb21tZW50KCk7XG4gICAgICAgICAgICB0aGlzLmluaXQobm9kZSwgdG9rZW5bMl0sIHRva2VuWzNdKTtcbiAgICAgICAgICAgIG5vZGUucmF3cy5pbmxpbmUgPSB0cnVlO1xuICAgICAgICAgICAgbm9kZS5zb3VyY2UuZW5kICA9IHsgbGluZTogdG9rZW5bNF0sIGNvbHVtbjogdG9rZW5bNV0gfTtcblxuICAgICAgICAgICAgbGV0IHRleHQgPSB0b2tlblsxXS5zbGljZSgyKTtcbiAgICAgICAgICAgIGlmICggL15cXHMqJC8udGVzdCh0ZXh0KSApIHtcbiAgICAgICAgICAgICAgICBub2RlLnRleHQgICAgICAgPSAnJztcbiAgICAgICAgICAgICAgICBub2RlLnJhd3MubGVmdCAgPSB0ZXh0O1xuICAgICAgICAgICAgICAgIG5vZGUucmF3cy5yaWdodCA9ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2ggPSB0ZXh0Lm1hdGNoKC9eKFxccyopKFteXSpbXlxcc10pKFxccyopJC8pO1xuICAgICAgICAgICAgICAgIGxldCBmaXhlZCA9IG1hdGNoWzJdLnJlcGxhY2UoLyhcXCpcXC98XFwvXFwqKS9nLCAnKi8vKicpO1xuICAgICAgICAgICAgICAgIG5vZGUudGV4dCAgICAgICA9IGZpeGVkO1xuICAgICAgICAgICAgICAgIG5vZGUucmF3cy5sZWZ0ICA9IG1hdGNoWzFdO1xuICAgICAgICAgICAgICAgIG5vZGUucmF3cy5yaWdodCA9IG1hdGNoWzNdO1xuICAgICAgICAgICAgICAgIG5vZGUucmF3cy50ZXh0ICA9IG1hdGNoWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIuY29tbWVudCh0b2tlbik7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==
