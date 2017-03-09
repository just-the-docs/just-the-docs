"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (input) {
  return !/[\n\r]/.test(input);
};