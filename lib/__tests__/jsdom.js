'use strict';

exports.__esModule = true;
exports['default'] = jsdomReact;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fbjsLibExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var _fbjsLibExecutionEnvironment2 = _interopRequireDefault(_fbjsLibExecutionEnvironment);

var _mochaJsdom = require('mocha-jsdom');

var _mochaJsdom2 = _interopRequireDefault(_mochaJsdom);

function jsdomReact() {
  _mochaJsdom2['default']();
  _fbjsLibExecutionEnvironment2['default'].canUseDOM = true;
}

module.exports = exports['default'];