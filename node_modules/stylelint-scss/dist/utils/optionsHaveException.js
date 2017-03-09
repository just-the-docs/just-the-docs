"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options, exceptionName) {
  return options && options.except && options.except.indexOf(exceptionName) !== -1;
};