module.exports = function saturate(color) {
    color.use(require('../HSL'));

    color.installMethod('saturate', function (amount) {
        return this.saturation(isNaN(amount) ? 0.1 : amount, true);
    });
};
