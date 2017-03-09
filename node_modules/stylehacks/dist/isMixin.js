'use strict';

exports.__esModule = true;
exports.default = isMixin;
function isMixin(node) {
    var selector = node.selector;
    // If the selector ends with a ':' it is likely a part of a custom mixin.

    if (!selector || selector[selector.length - 1] === ':') {
        return true;
    }
    return false;
}
module.exports = exports['default'];