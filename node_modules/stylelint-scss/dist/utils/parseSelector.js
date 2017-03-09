"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (selector, result, node, cb) {
  try {
    (0, _postcssSelectorParser2.default)(cb).process(selector);
  } catch (e) {
    result.warn("Cannot parse selector", { node: node });
  }
};

var _postcssSelectorParser = require("postcss-selector-parser");

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }