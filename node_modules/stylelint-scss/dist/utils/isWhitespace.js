"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (char) {
  return [" ", "\n", "\t", "\r", "\f"].indexOf(char) !== -1;
};