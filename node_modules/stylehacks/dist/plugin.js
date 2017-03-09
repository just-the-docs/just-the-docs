"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = plugin;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function plugin(targets, nodeTypes, detect) {
    var Plugin = function () {
        function Plugin(result) {
            _classCallCheck(this, Plugin);

            this.nodes = [];
            this.result = result;
            this.targets = targets;
            this.nodeTypes = nodeTypes;
        }

        Plugin.prototype.push = function push(node, metadata) {
            node._stylehacks = _extends({}, metadata, {
                message: "Bad " + metadata.identifier + ": " + metadata.hack,
                browsers: this.targets
            });
            this.nodes.push(node);
        };

        Plugin.prototype.any = function any(node) {
            if (~this.nodeTypes.indexOf(node.type)) {
                detect.apply(this, arguments);
                return !!node._stylehacks;
            }
            return false;
        };

        Plugin.prototype.detectAndResolve = function detectAndResolve() {
            this.nodes = [];

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            detect.apply(this, args);
            return this.resolve();
        };

        Plugin.prototype.detectAndWarn = function detectAndWarn() {
            this.nodes = [];

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            detect.apply(this, args);
            return this.warn();
        };

        Plugin.prototype.resolve = function resolve() {
            return this.nodes.forEach(function (node) {
                return node.remove();
            });
        };

        Plugin.prototype.warn = function warn() {
            var _this = this;

            return this.nodes.forEach(function (node) {
                var _node$_stylehacks = node._stylehacks,
                    message = _node$_stylehacks.message,
                    browsers = _node$_stylehacks.browsers,
                    identifier = _node$_stylehacks.identifier,
                    hack = _node$_stylehacks.hack;

                return node.warn(_this.result, message, { browsers: browsers, identifier: identifier, hack: hack });
            });
        };

        return Plugin;
    }();

    return Plugin;
}
module.exports = exports["default"];