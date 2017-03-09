module.exports = function darken(color) {
    color.use(require('../HSL'));

    color.installMethod('darken', function (amount) {
        return this.lightness(isNaN(amount) ? -0.1 : -amount, true);
    });
};
