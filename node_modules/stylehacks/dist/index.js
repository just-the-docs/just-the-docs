'use strict';

exports.__esModule = true;

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssReporter = require('postcss-reporter');

var _postcssReporter2 = _interopRequireDefault(_postcssReporter);

var _browserslist = require('browserslist');

var _browserslist2 = _interopRequireDefault(_browserslist);

var _formatter = require('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _bodyEmpty = require('./plugins/bodyEmpty');

var _bodyEmpty2 = _interopRequireDefault(_bodyEmpty);

var _htmlCombinatorCommentBody = require('./plugins/htmlCombinatorCommentBody');

var _htmlCombinatorCommentBody2 = _interopRequireDefault(_htmlCombinatorCommentBody);

var _htmlFirstChild = require('./plugins/htmlFirstChild');

var _htmlFirstChild2 = _interopRequireDefault(_htmlFirstChild);

var _important = require('./plugins/important');

var _important2 = _interopRequireDefault(_important);

var _leadingStar = require('./plugins/leadingStar');

var _leadingStar2 = _interopRequireDefault(_leadingStar);

var _leadingUnderscore = require('./plugins/leadingUnderscore');

var _leadingUnderscore2 = _interopRequireDefault(_leadingUnderscore);

var _mediaSlash = require('./plugins/mediaSlash0');

var _mediaSlash2 = _interopRequireDefault(_mediaSlash);

var _mediaSlash3 = require('./plugins/mediaSlash9');

var _mediaSlash4 = _interopRequireDefault(_mediaSlash3);

var _slash = require('./plugins/slash9');

var _slash2 = _interopRequireDefault(_slash);

var _starHtml = require('./plugins/starHtml');

var _starHtml2 = _interopRequireDefault(_starHtml);

var _trailingSlashComma = require('./plugins/trailingSlashComma');

var _trailingSlashComma2 = _interopRequireDefault(_trailingSlashComma);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_bodyEmpty2.default, _htmlCombinatorCommentBody2.default, _htmlFirstChild2.default, _important2.default, _leadingStar2.default, _leadingUnderscore2.default, _mediaSlash2.default, _mediaSlash4.default, _slash2.default, _starHtml2.default, _trailingSlashComma2.default];

// plugins


var stylehacks = _postcss2.default.plugin('stylehacks', function () {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var b = opts.browsers;
    var browsers = b instanceof Array ? b : (0, _browserslist2.default)(b);

    return function (css, result) {
        var processors = plugins.reduce(function (list, Plugin) {
            var hack = new Plugin(result);
            var applied = browsers.some(function (browser) {
                return hack.targets.some(function (target) {
                    return browser === target;
                });
            });
            if (applied) {
                return list;
            }
            return [].concat(list, [hack]);
        }, []);
        css.walk(function (node) {
            processors.forEach(function (proc) {
                if (!~proc.nodeTypes.indexOf(node.type)) {
                    return;
                }
                if (opts.lint) {
                    return proc.detectAndWarn(node);
                }
                return proc.detectAndResolve(node);
            });
        });
    };
});

stylehacks.detect = function (node) {
    var hacked = plugins.some(function (Plugin) {
        var hack = new Plugin();
        return hack.any(node);
    });

    return hacked;
};

stylehacks.process = function (css) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    opts.reporter = {};
    opts.reporter.formatter = _formatter2.default;
    opts.map = opts.map || (opts.sourcemap ? true : null);
    var processor = (0, _postcss2.default)([stylehacks(opts)]);
    if (opts.lint && !opts.silent) {
        processor.use((0, _postcssReporter2.default)(opts.reporter));
    }
    return processor.process(css, opts);
};

exports.default = stylehacks;
module.exports = exports['default'];