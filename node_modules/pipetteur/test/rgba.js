var expect = require('unexpected');
var pipetteur = require('../pipetteur');

describe('RGB match', function () {
    it('should match a set of valid RGB strings', function (done) {
        var colors = [
            'rgb(0, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(0, 255, 0)',
            'rgb(0, 0, 255)',
            'rgb(255, 255, 255)',
            'rgba(0, 0, 0, 0)',
            'rgba(255, 0, 0, 0)',
            'rgba(0, 255, 0, 0)',
            'rgba(0, 0, 255, 0)',
            'rgba(255, 255, 255, 0)',
        ];

        expect(colors, 'to be an array whose items satisfy', function (rgba) {
            var matches = pipetteur(rgba);

            expect(matches, 'to be a non-empty array');
            expect(matches, 'to have length', 1);
            expect(matches[0], 'to have properties', ['index', 'match']);
            expect(matches[0].line, 'to be', 1);
            expect(matches[0].column, 'to be', 1);
            expect(matches[0].index, 'to be', 0);
            expect(matches[0].match, 'to be', rgba);
        });

        done();
    });

    it('should match a set of valid 6-char hex substrings', function (done) {
        var hexes = [
            {
                string: 'foo rgb(0, 0, 0) bar',
                hex: 'rgb(0, 0, 0)',
                index: 4
            },
            {
                string: 'one, two, rgb(255, 255, 255), three',
                hex: 'rgb(255, 255, 255)',
                index: 10
            },
            {
                string: 'hvid (rgb(255, 255, 255)) er pænt',
                hex: 'rgb(255, 255, 255)',
                index: 6
            },
            {
                string: 'rgb(18, 52, 86) are numbers',
                hex: 'rgb(18, 52, 86)',
                index: 0
            },
            {
                string: 'alphabet song: rgb(171, 205, 239)',
                hex: 'rgb(171, 205, 239)',
                index: 15
            },
            {
                string: '#alphab et rgb(171, 205, 239) gehijkl',
                hex: 'rgb(171, 205, 239)',
                index: 11
            },
            {
                string: 'background:rgb(254, 220, 186)',
                hex: 'rgb(254, 220, 186)',
                index: 11
            },
            {
                string: '$color=rgb(254, 220, 186)',
                hex: 'rgb(254, 220, 186)',
                index: 7
            }
        ];

        expect(hexes, 'to be an array whose items satisfy', function (obj) {
            var matches = pipetteur(obj.string);

            expect(matches, 'to be a non-empty array');
            expect(matches, 'to have length', 1);
            expect(matches[0], 'to have properties', ['index', 'match']);
            expect(matches[0].index, 'to be', obj.index);
            expect(matches[0].match, 'to be', obj.hex);
        });

        done();
    });

    it('should match multiple colors in the same string', function (done) {
        var strings = [
            'rgb(0,0,0) rgb(255,255,255)',
            'rgb(100.1, 200.1, 123) and rgba(1, 100, 200, 0.5), not rgb(0,0) or rgba(0,0,0)',
            'First: rgba(0, 0, 0, 0), Second: rgb(0, 255, 0)',
            'Unlikely combination: rgb(0, 255, 0)rgb(0, 255, 0)'
        ];

        expect(strings, 'to be an array whose items satisfy', function (str) {
            var matches = pipetteur(str);

            expect(matches, 'to have length', 2);
        });

        done();
    });
});
