var synesthesia = require('synesthesia');
var color = require('onecolor');

var pipetteur = function (str) {
    if (typeof str !== 'string') {
        throw new Error('pipetteur: Expected string input, got ' + typeof str);
    }

    var matches = [],
        match,
        lines;

    // Match colors incrementally
    while ((match = synesthesia.all.exec(str)) !== null) {
        lines = str.slice(0, match.index).split('\n');

        matches.push({
            index: match.index,
            line: lines.length,
            column: lines[lines.length - 1].length + 1,
            match: match[0],
            color: color(match[0])
        });
    }

    // Reset search indexes
    synesthesia.all.lastIndex = 0;

    return matches;
};

module.exports = pipetteur;
