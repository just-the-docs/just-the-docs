module.exports = function rotate(color) {
    color.use(require('../HSL'));

    color.installMethod('rotate', function (degrees) {
        return this.hue((degrees || 0) / 360, true);
    });
};
