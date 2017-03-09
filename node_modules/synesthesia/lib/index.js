var colorNames = require('css-color-names');
var channels = require('./channels');

// Space templates
var opaqueSpaceTpl = '_space_\\(_1_,_2_,_3_\\)';
var alphaSpaceTpl  = '_space_a\\(_1_,_2_,_3_,_a_\\)'.replace('_a_', channels.alpha.source);

var spaces = {
    hex: /#(?:[0-9a-f]{6}|[0-9a-f]{3})(?![0-9a-f])/gi,

    rgb: new RegExp(opaqueSpaceTpl
        .replace('_space_', 'rgb')
        .replace(/_[1-3]_/g, channels.eightBit.source), 'gi'),
    rgba: new RegExp(alphaSpaceTpl
        .replace('_space_', 'rgb')
        .replace(/_[1-3]_/g, channels.eightBit.source), 'gi'),

    hsv: new RegExp(opaqueSpaceTpl
        .replace('_space_', 'hsv')
        .replace('_1_', channels.hue.source)
        .replace('_2_', channels.percentage.source)
        .replace('_3_', channels.percentage.source), 'gi'),
    hsva: new RegExp(alphaSpaceTpl
        .replace('_space_', 'hsv')
        .replace('_1_', channels.hue.source)
        .replace('_2_', channels.percentage.source)
        .replace('_3_', channels.percentage.source), 'gi'),

    hsl: new RegExp(opaqueSpaceTpl
        .replace('_space_', 'hsl')
        .replace('_1_', channels.hue.source)
        .replace('_2_', channels.percentage.source)
        .replace('_3_', channels.percentage.source), 'gi'),
    hsla: new RegExp(alphaSpaceTpl
        .replace('_space_', 'hsl')
        .replace('_1_', channels.hue.source)
        .replace('_2_', channels.percentage.source)
        .replace('_3_', channels.percentage.source), 'gi'),

    names: new RegExp('\\b(?:' + Object.keys(colorNames).join('|') + ')\\b', 'gi')
};

spaces.all = new RegExp(Object.keys(spaces).map(function (space) {
    return spaces[space].source;
}).join('|'), 'gi');

module.exports = spaces;
