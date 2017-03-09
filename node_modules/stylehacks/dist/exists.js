"use strict";

exports.__esModule = true;
exports.default = exists;
function exists(selector, index, value) {
    var node = selector.at(index);
    return node && node.value === value;
}
module.exports = exports["default"];