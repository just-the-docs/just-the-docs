'use strict';

exports.__esModule = true;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _textTable = require('text-table');

var _textTable2 = _interopRequireDefault(_textTable);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _plur = require('plur');

var _plur2 = _interopRequireDefault(_plur);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logFrom = function logFrom(fromValue) {
    if (!fromValue.indexOf('<')) {
        return fromValue;
    }
    return _path2.default.relative(process.cwd(), fromValue);
};

var hacksFound = function hacksFound(messages) {
    var num = messages.length + (0, _plur2.default)(' hack', messages.length);
    return '\n\n  ' + _logSymbols2.default.error + '  ' + num + ' found.\n';
};

exports.default = function (input) {
    var messages = input.messages;
    var source = input.source;

    if (!messages.length) {
        return '  ' + _logSymbols2.default.success + '  No hacks found.';
    }

    return _chalk2.default.underline(logFrom(source)) + '\n' + (0, _textTable2.default)(messages.map(function (msg) {
        var parts = msg.text.split(': ');
        return ['', _chalk2.default.gray('line ' + msg.node.source.start.line), _chalk2.default.gray('col ' + msg.node.source.start.column), parts[0], _chalk2.default.red(parts[1])];
    })) + hacksFound(messages);
};

module.exports = exports['default'];