module.exports = function desaturate(color) {
    color.use(require('../HSL'));

    color.installMethod('desaturate', function (amount) {
        return this.saturation(isNaN(amount) ? -0.1 : -amount, true);
    });
};
