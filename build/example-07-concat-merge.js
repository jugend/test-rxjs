'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Merge the result into the stream
// merge.next 0
// merge.next 0
// merge.next 1
// merge.next 2
// merge.next 1
// merge.complete
// Rx.Observable.interval(1000)
//   .merge(Rx.Observable.interval(500))
//   .take(5)
//   .subscribe(createSubscriber('merge1'))

// merge2.next 0 half-second
// merge2.next 0 seconds
// merge2.next 1 half-second
// merge2.next 2 half-second
// merge2.next 1 seconds
// merge2.next 3 half-second
// merge2.next 4 half-second
// merge2.next 2 seconds
// merge2.next 5 half-second
// Rx.Observable.merge(
//   Rx.Observable.interval(1000).map(i => `${i} seconds`),
//   Rx.Observable.interval(500).map(i => `${i} half-second`))
//   .take(10)
//   .subscribe(createSubscriber('merge2'))


// Common pattern
// const currentUser$ = Rx.Observable.merge(
//   socket.on$('login').map(user => processUser(user)),
//   socket.on$('logout').map(() => null)
// )

// Concat, being added at the end of the first stream
_Rx2.default.Observable.interval(500).take(3).concat(_Rx2.default.Observable.range(10, 3)).subscribe((0, _util.createSubscriber)('concat1'));