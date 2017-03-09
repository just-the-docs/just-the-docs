"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  var err = new Error(text);
  err.code = 78;
  return err;
};