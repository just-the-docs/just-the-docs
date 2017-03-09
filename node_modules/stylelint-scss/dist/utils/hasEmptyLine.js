"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (string) {
  return string && (string.indexOf("\n\n") !== -1 || string.indexOf("\n\r\n") !== -1);
};