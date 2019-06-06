'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obs1$ = new _Rx2.default.Observable(function (observer) {
  console.log('Executing observable 1');
  setTimeout(function () {
    // Comment on/off to test the behaviour
    // observer.error(new Error('obs1$.error'))
    observer.next('obs1');

    // Complete never gets called becuase next would proceed with obs2
    observer.complete('obs1');
  });
});

var obs2$ = new _Rx2.default.Observable(function (observer) {
  console.log('Executing observable 2');
  setTimeout(function () {
    // Comment on/off to test the behaviour
    // observer.error(new Error('obs2$.error'))
    observer.next('obs2');

    // This  will then complete the observeration flow
    observer.complete();
  });
});

// Sequential
//
// Executing observable 1
// concat.next "obs1"
// Executing observable 2
// concat.next "obs2"
// concat.complete
function testConcat() {
  _Rx2.default.Observable.concat(obs1$, obs2$).subscribe((0, _util.createSubscriber)('concat'));
}

// Parallel
//
// Executing observable 1
// Executing observable 2
// merge.next "obs1"
// merge.next "obs2"
// merge.complete
function testMerge() {
  _Rx2.default.Observable.merge(obs1$, obs2$).subscribe((0, _util.createSubscriber)('merge'));
}

// Alias of mergeMap
function testFlatMap() {
  obs1$.flatMap(function (result) {
    console.log('>> obs1$ completed, result:', result);
    return obs2$.catch(function (error) {
      return _Rx2.default.Observable.of(error.message);
    });
  }).catch(function (error) {
    console.log('obs1$ handle error', error);
    return _Rx2.default.Observable.of(error.message);
  }).subscribe((0, _util.createSubscriber)('flatMap'));
}

// testConcat()
// testMerge()
// testFlatMap()