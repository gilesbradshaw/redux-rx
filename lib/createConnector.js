'use strict';

exports.__esModule = true;
exports['default'] = createConnector;

var _reactRxComponent = require('react-rx-component');

var _ = require('./');

var _react = require('react');

function createConnector(selectState, render) {
  var Connector = _reactRxComponent.createRxComponent(function (props$, context$) {
    return selectState(props$, context$.flatMap(function (c) {
      return _.observableFromStore(c.store).startWith(c.store.getState());
    }), context$.map(function (c) {
      return c.store.dispatch;
    }), context$);
  }, render);
  Connector.displayName = 'Connector';
  Connector.contextTypes = { store: _react.PropTypes.object };
  return Connector;
}

module.exports = exports['default'];