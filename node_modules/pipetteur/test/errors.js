var expect = require('unexpected');
var pipetteur = require('../pipetteur');

describe('Error handling', function () {
    it('should throw on invalid input', function (done) {
        var types = [
            undefined,
            null,
            true,
            0,
            [],
            {},
            function () { return; }
        ];
        expect(types, 'to be an array whose items satisfy', function (type) {
            expect(pipetteur.bind(null, type), 'to throw');
        });

        done();
    });
});
