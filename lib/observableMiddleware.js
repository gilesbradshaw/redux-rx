'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = observableMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fluxStandardAction = require('flux-standard-action');

var _isObservable = require('./isObservable');

var _isObservable2 = _interopRequireDefault(_isObservable);

function observableMiddleware() {
  return function (next) {
    return function (action) {
      if (!_fluxStandardAction.isFSA(action)) {
        return _isObservable2['default'](action) ? action.doOnNext(next) : next(action);
      }

      return _isObservable2['default'](action.payload) ? action.payload.doOnNext(function (x) {
        return next(_extends({}, action, { payload: x }));
      }).doOnError(function (e) {
        return next(_extends({}, action, { payload: e, error: true }));
      }) : next(action);
    };
  };
}

module.exports = exports['default'];