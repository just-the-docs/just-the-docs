var ranges = require('./ranges');

var channelWithDecimalPointPercentageTpl = '\\s*(?:\\.\\d+|_NUMBERS_(?:\\.\\d+)?)%\\s*',
    channelWithDecimalPointTpl = channelWithDecimalPointPercentageTpl.replace('%', ''),

    // Channels
    percentageChannel = new RegExp(channelWithDecimalPointPercentageTpl.replace('_NUMBERS_', ranges['100'].source)),
    eightBitChannel   = new RegExp(channelWithDecimalPointTpl.replace('_NUMBERS_', ranges['255'].source)),
    hueChannel        = new RegExp(channelWithDecimalPointTpl.replace('_NUMBERS_', ranges['360'].source)),
    alphaChannel      = new RegExp(channelWithDecimalPointTpl.replace('_NUMBERS_', ranges['1'].source));

module.exports = {
    eightBit: eightBitChannel,
    hue: hueChannel,
    percentage: percentageChannel,
    alpha: alphaChannel
};
