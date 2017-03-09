'use strict';

exports.__esModule = true;

var _stringifier = require('postcss/lib/stringifier');

var _stringifier2 = _interopRequireDefault(_stringifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScssStringifier = function (_Stringifier) {
    _inherits(ScssStringifier, _Stringifier);

    function ScssStringifier() {
        _classCallCheck(this, ScssStringifier);

        return _possibleConstructorReturn(this, _Stringifier.apply(this, arguments));
    }

    ScssStringifier.prototype.comment = function comment(node) {
        var left = this.raw(node, 'left', 'commentLeft');
        var right = this.raw(node, 'right', 'commentRight');

        if (node.raws.inline) {
            var text = node.raws.text || node.text;
            this.builder('//' + left + text + right, node);
        } else {
            this.builder('/*' + left + node.text + right + '*/', node);
        }
    };

    ScssStringifier.prototype.decl = function decl(node, semicolon) {
        if (!node.isNested) {
            _Stringifier.prototype.decl.call(this, node, semicolon);
        } else {

            var between = this.raw(node, 'between', 'colon');
            var string = node.prop + between + this.rawValue(node, 'value');
            if (node.important) {
                string += node.raws.important || ' !important';
            }

            this.builder(string + '{', node, 'start');

            var after = void 0;
            if (node.nodes && node.nodes.length) {
                this.body(node);
                after = this.raw(node, 'after');
            } else {
                after = this.raw(node, 'after', 'emptyBody');
            }
            if (after) this.builder(after);
            this.builder('}', node, 'end');
        }
    };

    return ScssStringifier;
}(_stringifier2.default);

exports.default = ScssStringifier;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjc3Mtc3RyaW5naWZpZXIuZXM2Il0sIm5hbWVzIjpbIlNjc3NTdHJpbmdpZmllciIsImNvbW1lbnQiLCJub2RlIiwibGVmdCIsInJhdyIsInJpZ2h0IiwicmF3cyIsImlubGluZSIsInRleHQiLCJidWlsZGVyIiwiZGVjbCIsInNlbWljb2xvbiIsImlzTmVzdGVkIiwiYmV0d2VlbiIsInN0cmluZyIsInByb3AiLCJyYXdWYWx1ZSIsImltcG9ydGFudCIsImFmdGVyIiwibm9kZXMiLCJsZW5ndGgiLCJib2R5Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsZTs7Ozs7Ozs7OzhCQUVqQkMsTyxvQkFBUUMsSSxFQUFNO0FBQ1YsWUFBSUMsT0FBUSxLQUFLQyxHQUFMLENBQVNGLElBQVQsRUFBZSxNQUFmLEVBQXdCLGFBQXhCLENBQVo7QUFDQSxZQUFJRyxRQUFRLEtBQUtELEdBQUwsQ0FBU0YsSUFBVCxFQUFlLE9BQWYsRUFBd0IsY0FBeEIsQ0FBWjs7QUFFQSxZQUFLQSxLQUFLSSxJQUFMLENBQVVDLE1BQWYsRUFBd0I7QUFDcEIsZ0JBQUlDLE9BQU9OLEtBQUtJLElBQUwsQ0FBVUUsSUFBVixJQUFrQk4sS0FBS00sSUFBbEM7QUFDQSxpQkFBS0MsT0FBTCxDQUFhLE9BQU9OLElBQVAsR0FBY0ssSUFBZCxHQUFxQkgsS0FBbEMsRUFBeUNILElBQXpDO0FBQ0gsU0FIRCxNQUdPO0FBQ0gsaUJBQUtPLE9BQUwsQ0FBYSxPQUFPTixJQUFQLEdBQWNELEtBQUtNLElBQW5CLEdBQTBCSCxLQUExQixHQUFrQyxJQUEvQyxFQUFxREgsSUFBckQ7QUFDSDtBQUNKLEs7OzhCQUVEUSxJLGlCQUFLUixJLEVBQU1TLFMsRUFBVztBQUNsQixZQUFLLENBQUNULEtBQUtVLFFBQVgsRUFBc0I7QUFDbEIsbUNBQU1GLElBQU4sWUFBV1IsSUFBWCxFQUFpQlMsU0FBakI7QUFDSCxTQUZELE1BRU87O0FBRUgsZ0JBQUlFLFVBQVUsS0FBS1QsR0FBTCxDQUFTRixJQUFULEVBQWUsU0FBZixFQUEwQixPQUExQixDQUFkO0FBQ0EsZ0JBQUlZLFNBQVVaLEtBQUthLElBQUwsR0FBWUYsT0FBWixHQUFzQixLQUFLRyxRQUFMLENBQWNkLElBQWQsRUFBb0IsT0FBcEIsQ0FBcEM7QUFDQSxnQkFBS0EsS0FBS2UsU0FBVixFQUFzQjtBQUNsQkgsMEJBQVVaLEtBQUtJLElBQUwsQ0FBVVcsU0FBVixJQUF1QixhQUFqQztBQUNIOztBQUVELGlCQUFLUixPQUFMLENBQWFLLFNBQVMsR0FBdEIsRUFBMkJaLElBQTNCLEVBQWlDLE9BQWpDOztBQUVBLGdCQUFJZ0IsY0FBSjtBQUNBLGdCQUFLaEIsS0FBS2lCLEtBQUwsSUFBY2pCLEtBQUtpQixLQUFMLENBQVdDLE1BQTlCLEVBQXVDO0FBQ25DLHFCQUFLQyxJQUFMLENBQVVuQixJQUFWO0FBQ0FnQix3QkFBUSxLQUFLZCxHQUFMLENBQVNGLElBQVQsRUFBZSxPQUFmLENBQVI7QUFDSCxhQUhELE1BR087QUFDSGdCLHdCQUFRLEtBQUtkLEdBQUwsQ0FBU0YsSUFBVCxFQUFlLE9BQWYsRUFBd0IsV0FBeEIsQ0FBUjtBQUNIO0FBQ0QsZ0JBQUtnQixLQUFMLEVBQWEsS0FBS1QsT0FBTCxDQUFhUyxLQUFiO0FBQ2IsaUJBQUtULE9BQUwsQ0FBYSxHQUFiLEVBQWtCUCxJQUFsQixFQUF3QixLQUF4QjtBQUNIO0FBQ0osSzs7Ozs7a0JBckNnQkYsZSIsImZpbGUiOiJzY3NzLXN0cmluZ2lmaWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0cmluZ2lmaWVyIGZyb20gJ3Bvc3Rjc3MvbGliL3N0cmluZ2lmaWVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nzc1N0cmluZ2lmaWVyIGV4dGVuZHMgU3RyaW5naWZpZXIge1xuXG4gICAgY29tbWVudChub2RlKSB7XG4gICAgICAgIGxldCBsZWZ0ICA9IHRoaXMucmF3KG5vZGUsICdsZWZ0JywgICdjb21tZW50TGVmdCcpO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLnJhdyhub2RlLCAncmlnaHQnLCAnY29tbWVudFJpZ2h0Jyk7XG5cbiAgICAgICAgaWYgKCBub2RlLnJhd3MuaW5saW5lICkge1xuICAgICAgICAgICAgbGV0IHRleHQgPSBub2RlLnJhd3MudGV4dCB8fCBub2RlLnRleHQ7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkZXIoJy8vJyArIGxlZnQgKyB0ZXh0ICsgcmlnaHQsIG5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5idWlsZGVyKCcvKicgKyBsZWZ0ICsgbm9kZS50ZXh0ICsgcmlnaHQgKyAnKi8nLCBub2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlY2wobm9kZSwgc2VtaWNvbG9uKSB7XG4gICAgICAgIGlmICggIW5vZGUuaXNOZXN0ZWQgKSB7XG4gICAgICAgICAgICBzdXBlci5kZWNsKG5vZGUsIHNlbWljb2xvbik7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGxldCBiZXR3ZWVuID0gdGhpcy5yYXcobm9kZSwgJ2JldHdlZW4nLCAnY29sb24nKTtcbiAgICAgICAgICAgIGxldCBzdHJpbmcgID0gbm9kZS5wcm9wICsgYmV0d2VlbiArIHRoaXMucmF3VmFsdWUobm9kZSwgJ3ZhbHVlJyk7XG4gICAgICAgICAgICBpZiAoIG5vZGUuaW1wb3J0YW50ICkge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBub2RlLnJhd3MuaW1wb3J0YW50IHx8ICcgIWltcG9ydGFudCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYnVpbGRlcihzdHJpbmcgKyAneycsIG5vZGUsICdzdGFydCcpO1xuXG4gICAgICAgICAgICBsZXQgYWZ0ZXI7XG4gICAgICAgICAgICBpZiAoIG5vZGUubm9kZXMgJiYgbm9kZS5ub2Rlcy5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5KG5vZGUpO1xuICAgICAgICAgICAgICAgIGFmdGVyID0gdGhpcy5yYXcobm9kZSwgJ2FmdGVyJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFmdGVyID0gdGhpcy5yYXcobm9kZSwgJ2FmdGVyJywgJ2VtcHR5Qm9keScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCBhZnRlciApIHRoaXMuYnVpbGRlcihhZnRlcik7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkZXIoJ30nLCBub2RlLCAnZW5kJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==
