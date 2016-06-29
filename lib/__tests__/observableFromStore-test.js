'use strict';

var _ = require('../');

var _sinon = require('sinon');

// Mock createStore
function createStore(unsubscribeSpy) {
  var state = undefined;
  var subscribers = [];

  return {
    getState: function getState() {
      return state;
    },
    dispatch: function dispatch(action) {
      // Just overwrite existing state
      state = action;
      subscribers.forEach(function (s) {
        return s();
      });
    },
    subscribe: function subscribe(subscriber) {
      subscribers.push(subscriber);
      return unsubscribeSpy;
    }
  };
}

describe('observableFromStore()', function () {
  var store = undefined;
  var unsubscribe = undefined;

  beforeEach(function () {
    unsubscribe = _sinon.spy();
    store = createStore(unsubscribe);
  });

  it('returns an observable sequence of store states', function () {
    var next = _sinon.spy();
    _.observableFromStore(store).subscribe(next);

    store.dispatch(1);
    store.dispatch(2);
    store.dispatch(3);

    expect(next.args.map(function (args) {
      return args[0];
    })).to.deep.equal([1, 2, 3]);
  });

  it('unsubscribes on complete', function () {
    var next = _sinon.spy();
    var subscription = _.observableFromStore(store).subscribe(next);

    store.dispatch(1);
    store.dispatch(2);
    store.dispatch(3);

    expect(next.callCount).to.equal(3);
    subscription.dispose();
    expect(unsubscribe.calledOnce).to.be['true'];

    store.dispatch(4);
    store.dispatch(5);
    store.dispatch(6);

    expect(next.callCount).to.equal(3);
  });
});