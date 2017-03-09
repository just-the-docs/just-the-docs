'use strict';

exports.__esModule = true;

var _plugin = require('../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _browsers = require('../dictionary/browsers');

var _identifiers = require('../dictionary/identifiers');

var _postcss = require('../dictionary/postcss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _plugin2.default)([_browsers.IE_6], [_postcss.DECL], function (decl) {
    var before = decl.raws.before;

    if (!before) {
        return;
    }
    if (~before.indexOf('_') || ~before.indexOf('-')) {
        this.push(decl, {
            identifier: _identifiers.PROPERTY,
            hack: '' + before.trim() + decl.prop
        });
    }
});
module.exports = exports['default'];