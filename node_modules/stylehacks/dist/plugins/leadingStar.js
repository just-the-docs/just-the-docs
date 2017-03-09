'use strict';

exports.__esModule = true;

var _plugin = require('../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _browsers = require('../dictionary/browsers');

var _identifiers = require('../dictionary/identifiers');

var _postcss = require('../dictionary/postcss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hacks = '!_$_&_*_)_=_%_+_,_._/_`_]_#_~_?_:_|'.split('_');

exports.default = (0, _plugin2.default)([_browsers.IE_5_5, _browsers.IE_6, _browsers.IE_7], [_postcss.ATRULE, _postcss.DECL], function (node) {
    var _this = this;

    if (node.type === _postcss.DECL) {
        // some values are not picked up by before, so ensure they are
        // at the beginning of the value
        hacks.some(function (hack) {
            if (!node.prop.indexOf(hack)) {
                _this.push(node, {
                    identifier: _identifiers.PROPERTY,
                    hack: node.prop
                });
                return true;
            }
        });
        var before = node.raws.before;

        if (!before) {
            return;
        }
        hacks.some(function (hack) {
            if (~before.indexOf(hack)) {
                _this.push(node, {
                    identifier: _identifiers.PROPERTY,
                    hack: '' + before.trim() + node.prop
                });
                return true;
            }
        });
    } else {
        // test for the @property: value; hack
        var name = node.name;

        var len = name.length - 1;
        if (name.lastIndexOf(':') === len) {
            this.push(node, {
                identifier: _identifiers.PROPERTY,
                hack: '@' + name.substr(0, len)
            });
        }
    }
});
module.exports = exports['default'];