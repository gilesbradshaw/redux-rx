'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createConnector = require('../createConnector');

var _createConnector2 = _interopRequireDefault(_createConnector);

var _redux = require('redux');

var _ = require('../');

var _reactRedux = require('react-redux');

var _rx = require('rx');

var _reactRxComponent = require('react-rx-component');

var _jsdom = require('./jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var combineLatest = _rx.Observable.combineLatest;

var actionCreators = {
  addTodo: function addTodo(text) {
    return { type: 'ADD_TODO', payload: text };
  }
};

function todoReducer(state, action) {
  if (state === undefined) state = { todos: [] };

  return action.type === 'ADD_TODO' ? _extends({}, state, { todos: [].concat(state.todos, [action.payload]) }) : state;
}

describe('createConnector()', function () {
  _jsdom2['default']();

  it('creates a Connector-like component using RxJS sequences', function () {
    var store = _redux.createStore(_redux.combineReducers({ todos: todoReducer }));

    // External source
    var increment$ = _reactRxComponent.funcSubject();

    var TodoConnector = _createConnector2['default'](function (props$, state$, dispatch$) {
      var actionCreators$ = _.bindActionCreators(actionCreators, dispatch$);
      var selectedState$ = state$.map(function (s) {
        return s.todos;
      });
      var count$ = increment$.startWith(0).scan(function (t) {
        return t + 1;
      });

      return combineLatest(props$, selectedState$, actionCreators$, count$, function (props, selectedState, _ref, count) {
        var addTodo = _ref.addTodo;
        return _extends({}, props, selectedState, {
          addTodo: addTodo,
          count: count
        });
      });
    }, function (props) {
      return _react2['default'].createElement('div', props);
    });

    var tree = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(TodoConnector, null)
    ));

    var div = _reactAddonsTestUtils2['default'].findRenderedDOMComponentWithTag(tree, 'div');
    expect(div.props.todos).to.deep.equal([]);
    div.props.addTodo('Use Redux');
    expect(div.props.todos).to.deep.equal(['Use Redux']);
    div.props.addTodo('Use RxJS');
    expect(div.props.todos).to.deep.equal(['Use Redux', 'Use RxJS']);
    increment$();
    increment$();
    increment$();
    expect(div.props.count).to.equal(3);
  });
});