'use strict';

var _this = this;

var _ = require('../');

var _sinon = require('sinon');

var _rx = require('rx');

function noop() {}

describe('observableMiddleware', function () {
  var baseDispatch = undefined;
  var dispatch = undefined;
  var error = undefined;
  var foobar = undefined;
  var stream = undefined;

  beforeEach(function () {
    baseDispatch = _sinon.spy();
    dispatch = _.observableMiddleware()(baseDispatch);
    error = new Error();
    foobar = { foo: 'bar' };
    stream = _rx.Observable.concat(_rx.Observable.of(1, 2), _rx.Observable['throw'](error), _rx.Observable.of(3));
  });

  it('handles Flux standard actions', function callee$1$0() {
    return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return regeneratorRuntime.awrap(dispatch({
            type: 'ACTION_TYPE',
            payload: stream
          }).toPromise()['catch'](noop));

        case 2:

          expect(baseDispatch.args.map(function (args) {
            return args[0];
          })).to.deep.equal([{ type: 'ACTION_TYPE', payload: 1 }, { type: 'ACTION_TYPE', payload: 2 }, { type: 'ACTION_TYPE', payload: error, error: true }]);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('handles observables', function callee$1$0() {
    return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return regeneratorRuntime.awrap(dispatch(stream).toPromise()['catch'](noop));

        case 2:
          expect(baseDispatch.args.map(function (args) {
            return args[0];
          })).to.deep.equal([1, 2]);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('ignores non-observables', function callee$1$0() {
    return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          dispatch(foobar);
          expect(baseDispatch.firstCall.args[0]).to.equal(foobar);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});