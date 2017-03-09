"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options, ignoredName) {
  return options && options.ignore && options.ignore.indexOf(ignoredName) !== -1;
};