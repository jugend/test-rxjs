'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var simple$ = new _Rx2.default.Observable(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.next(4);
  observer.complete();
});

// simple$.first()
//   .subscribe(createSubscriber('first'))
//
// simple$.last()
//   .subscribe(createSubscriber('last'))
//
// // single.error Sequence contains more than one element
// simple$.single()
//   .subscribe(createSubscriber('single'))
//
// simple$.take(2)
//   .subscribe(createSubscriber('take'))
//
// simple$.skip(2)
//   .subscribe(createSubscriber('skip'))
//
//
// Rx.Observable.interval(500)
//   .skipWhile(i => i < 4)
//   .takeWhile(i => i < 10)
//   .subscribe(createSubscriber('skipWhile'))

// skipUntil.next 3
// skipUntil.next 4
// skipUntil.next 5
// skipUntil.next 6
// skipUntil.complete
_Rx2.default.Observable.interval(500).skipUntil(_Rx2.default.Observable.timer(2000)).takeUntil(_Rx2.default.Observable.timer(4000)).subscribe((0, _util.createSubscriber)('skipUntil'));