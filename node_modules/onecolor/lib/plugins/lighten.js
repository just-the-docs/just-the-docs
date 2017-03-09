module.exports = function lighten(color) {
    color.use(require('../HSL'));

    color.installMethod('lighten', function (amount) {
        return this.lightness(isNaN(amount) ? 0.1 : amount, true);
    });
};
