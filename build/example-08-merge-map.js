'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Map, transform an item
_Rx2.default.Observable.interval(1000).take(3).map(function (a) {
  return a * a;
}).subscribe((0, _util.createSubscriber)('map'));

// Merge Map
// one.next Track 1
// one.next Track 2
// one.next Track 3
// one.complete
_Rx2.default.Observable.fromPromise(getTracks()).mergeMap(function (tracks) {
  return _Rx2.default.Observable.from(tracks);
}).subscribe((0, _util.createSubscriber)('one'));

function getTracks() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(['Track 1', 'Track 2', 'Track 3']);
    });
  });
}

// Merge Map with Promise
_Rx2.default.Observable.of('myquery').do(function () {
  return console.log('Querying');
}).mergeMap(function (a) {
  return query(a);
}).do(function () {
  return console.log('After querying');
}).subscribe((0, _util.createSubscriber)('query'));

function query() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('This is the value');
    }, 1000);
  });
}

// SwitchMap refer to src-client/example_02
// Only take the latest result, good for UI, on key up
// stream is being processed halfway, and new event coming in to update