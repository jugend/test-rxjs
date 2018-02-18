'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// bufferCount.next 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50
// bufferCount.next 51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100
// bufferCount.complete
// Rx.Observable.range(1, 100)
// .bufferCount(50)
// .subscribe(createSubscriber('bufferCount'))

// bufferTime.next 0,1,2
// bufferTime.next 0,1,2
// bufferTime.next 3,4,5,6
// bufferTime.next 3,4,5,6
// Rx.Observable.interval(500)
//   .bufferTime(2000)
//   .subscribe(createSubscriber('bufferTime'))

// bufferWithInterval.next 0,1,2
// bufferWithInterval.next 3,4,5,6
// bufferWithInterval.next 7,8,9,10
// Same as above
// Rx.Observable.interval(500)
//   .buffer(Rx.Observable.interval(2000))
//   .subscribe(createSubscriber('bufferWithInterval'))


// bufferWithSubject.next 0,1,2,3,4
var stopSubject$ = new _Rx2.default.Subject();
_Rx2.default.Observable.interval(500).buffer(stopSubject$).subscribe((0, _util.createSubscriber)('bufferWithSubject'));

setTimeout(function () {
  stopSubject$.next();
}, 3000);

// toArray, the opposite from from, collapse separate stream as an array
// toArray collect the whole thing as compared to buffer
_Rx2.default.Observable.range(1, 50).toArray().subscribe((0, _util.createSubscriber)('toArray'));