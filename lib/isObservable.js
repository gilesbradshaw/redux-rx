'use strict';

exports.__esModule = true;
exports['default'] = isObservable;

var _rxjs = require('rxjs');

function isObservable(val) {
  return val instanceof _rxjs.Observable;
}

module.exports = exports['default'];