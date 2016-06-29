'use strict';

exports.__esModule = true;
exports['default'] = observableFromStore;

var _rxjs = require('rxjs');

function observableFromStore(store) {
  return _rxjs.Observable.create(function (observer) {
    return store.subscribe(function () {
      return observer.next(store.getState());
    });
  });
}

module.exports = exports['default'];