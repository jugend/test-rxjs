'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// DO, execute before next is called
// From do 1
// do.next 1
// From do 2
// do.next 4
// From do 3
// do.next 9
// do.complete
_Rx2.default.Observable.range(1, 3).do(function (a) {
  return console.log('From do ' + a);
}).map(function (a) {
  return a * a;
}).subscribe((0, _util.createSubscriber)('do'));

// Finally, only executed when the range completes
// finally.next 1
// finally.next 2
// finally.next 3
// finally.complete
// From finally undefined
_Rx2.default.Observable.range(1, 3).finally(function (a) {
  return console.log('From finally ' + a);
}).subscribe((0, _util.createSubscriber)('finally'));

// Filter
// filter.next 6
// filter.next 7
// filter.next 8
// filter.next 9
// filter.next 10
// filter.complete
_Rx2.default.Observable.range(1, 10).filter(function (a) {
  return a > 5;
}).subscribe((0, _util.createSubscriber)('filter'));

// Starts with, merge initial value
// startsWith.next -1
// startsWith.next 0
// startsWith.next 1
_Rx2.default.Observable.interval(1000).startWith(-1).subscribe((0, _util.createSubscriber)('startsWith'));