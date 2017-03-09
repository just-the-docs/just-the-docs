#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _readFileStdin = require('read-file-stdin');

var _readFileStdin2 = _interopRequireDefault(_readFileStdin);

var _writeFileStdout = require('write-file-stdout');

var _writeFileStdout2 = _interopRequireDefault(_writeFileStdout);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _package = require('../package.json');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opts = (0, _minimist2.default)(process.argv.slice(2), {
    alias: {
        b: 'browsers',
        l: 'lint',
        h: 'help',
        s: 'sourcemap',
        v: 'version'
    }
});

if (opts.version) {
    console.log(_package.version);
} else {
    var file = opts._[0];
    var out = opts._[1];

    if (file === 'help' || opts.help) {
        _fs2.default.createReadStream(__dirname + '/../usage.txt').pipe(process.stdout).on('close', function () {
            return process.exit(1);
        });
    } else {
        (0, _readFileStdin2.default)(file, function (err, buf) {
            if (err) {
                throw err;
            }
            if (file) {
                opts.from = file;
            }
            if (out) {
                opts.to = out;
            }
            _2.default.process(String(buf), opts).then(function (result) {
                if (result.warnings().length) {
                    process.exit(1);
                }
                if (!opts.lint) {
                    (0, _writeFileStdout2.default)(result.css);
                }
            });
        });
    }
}