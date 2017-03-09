var assign = require('object-assign');
var colorDiff = require('color-diff');
var formatter = require('./formatter');
var postcss = require('postcss');
var pipetteur = require('pipetteur');
var reporter = require('postcss-reporter');

function convertToLab (clr) {
  clr = clr.rgb();

  try {
    return colorDiff.rgb_to_lab({
      R: Math.round(clr.red() * 255),
      G: Math.round(clr.green() * 255),
      B: Math.round(clr.blue() * 255)
    });
  } catch (e) {
    throw new Error('Error converting color ' + clr.hex() + ' to lab format.');
  }
}

// returns correct column number of the color declaration
// pipetteur finds the position from the beginning of value declaration,
// we need line position instead
function getColumnPositionRelativeToLine (position) {
  var decl = position.declaration;
  return decl.source.start.column + position.column + decl.prop.length;
}

function getWhitelistHashKey (pair) {
  pair = pair.sort();
  return pair[0] + '-' + pair[1];
}

function getDiff (a, b) {
    return Math.min(colorDiff.diff(convertToLab(a), convertToLab(b)), 100);
}

var stripUrl = /url\(['|"]?.*?['|"]?\)/;

var colorguard = postcss.plugin('css-colorguard', function (opts) {
  opts = assign({
    ignore: [],
    threshold: 3
  }, opts);

  var whitelistHash = {};
  if (opts.whitelist) {
    opts.whitelist.forEach(function (pair) {
      if (!Array.isArray(pair)) {
        throw new Error('The whitelist option takes an array of array pairs. ' +
                        'You probably sent an array of strings.');
      }
      whitelistHash[getWhitelistHashKey(pair)] = true;
    });
  }

  return function (css, result) {
    var colors = {};

    css.walkDecls(function (decl) {
      var cleanValue = decl.value.replace(stripUrl, '');
      var matches = pipetteur(cleanValue);
      matches.forEach(function (match) {
        // FIXME: This discards alpha channel
        var name = match.color.hex();
        // Just bail if we want to ignore the color
        if (opts.ignore.indexOf(name) > -1) {
          return;
        }

        match.declaration = decl;

        if (!(name in colors)) {
          colors[name] = colors[name] || [];
          colors[name].push(match);
        }

        Object.keys(colors).forEach(function (color) {
          var cached = colors[color];
          if (cached[0] === match || cached[0].match === match.match) {
            return;
          }
          var diffAmount = getDiff(cached[0].color, match.color);

          // If colors are the same (no diff) but have a different representation
          // (e.g. #000 and #000000 and black), do not complain
          if (opts.allowEquivalentNotation && diffAmount === 0) {
            return;
          }

          var whitelisted = getWhitelistHashKey([color, name]);
          if (diffAmount < opts.threshold && !whitelistHash[whitelisted]) {
            var message = (
              match.match +
              ' collides with ' +
              cached[0].match +
              ' (' +
              cached[0].declaration.source.start.line +
              ':' +
              getColumnPositionRelativeToLine(cached[0]) +
              ')'
            );
            decl.warn(result, message, {
              secondColor: match.match,
              firstColor: cached[0].match
            });
          }
        });
      });
    });
  };
});

colorguard.process = function (css, opts) {
  opts = opts || {};
  var processor = postcss([ colorguard(opts), reporter({formatter: formatter}) ]);
  return processor.process(css, opts);
};

module.exports = colorguard;
