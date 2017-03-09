'use strict';

exports.__esModule = true;
exports.default = scssParse;

var _input = require('postcss/lib/input');

var _input2 = _interopRequireDefault(_input);

var _scssParser = require('./scss-parser');

var _scssParser2 = _interopRequireDefault(_scssParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scssParse(scss, opts) {
    var input = new _input2.default(scss, opts);

    var parser = new _scssParser2.default(input);
    parser.tokenize();
    parser.loop();

    return parser.root;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjc3MtcGFyc2UuZXM2Il0sIm5hbWVzIjpbInNjc3NQYXJzZSIsInNjc3MiLCJvcHRzIiwiaW5wdXQiLCJwYXJzZXIiLCJ0b2tlbml6ZSIsImxvb3AiLCJyb290Il0sIm1hcHBpbmdzIjoiOzs7a0JBSXdCQSxTOztBQUp4Qjs7OztBQUVBOzs7Ozs7QUFFZSxTQUFTQSxTQUFULENBQW1CQyxJQUFuQixFQUF5QkMsSUFBekIsRUFBK0I7QUFDMUMsUUFBSUMsUUFBUSxvQkFBVUYsSUFBVixFQUFnQkMsSUFBaEIsQ0FBWjs7QUFFQSxRQUFJRSxTQUFTLHlCQUFlRCxLQUFmLENBQWI7QUFDQUMsV0FBT0MsUUFBUDtBQUNBRCxXQUFPRSxJQUFQOztBQUVBLFdBQU9GLE9BQU9HLElBQWQ7QUFDSCIsImZpbGUiOiJzY3NzLXBhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElucHV0IGZyb20gJ3Bvc3Rjc3MvbGliL2lucHV0JztcblxuaW1wb3J0IFNjc3NQYXJzZXIgZnJvbSAnLi9zY3NzLXBhcnNlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNjc3NQYXJzZShzY3NzLCBvcHRzKSB7XG4gICAgbGV0IGlucHV0ID0gbmV3IElucHV0KHNjc3MsIG9wdHMpO1xuXG4gICAgbGV0IHBhcnNlciA9IG5ldyBTY3NzUGFyc2VyKGlucHV0KTtcbiAgICBwYXJzZXIudG9rZW5pemUoKTtcbiAgICBwYXJzZXIubG9vcCgpO1xuXG4gICAgcmV0dXJuIHBhcnNlci5yb290O1xufVxuIl19
