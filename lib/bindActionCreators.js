'use strict';

exports.__esModule = true;
exports['default'] = bindActionCreators;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isObservable = require('./isObservable');

var _isObservable2 = _interopRequireDefault(_isObservable);

var _redux = require('redux');

function bindActionCreators(actionCreators, $dispatch) {
  return _isObservable2['default']($dispatch) ? $dispatch.map(function (dispatch) {
    return _redux.bindActionCreators(actionCreators, dispatch);
  }) : _redux.bindActionCreators(actionCreators, $dispatch);
}

module.exports = exports['default'];