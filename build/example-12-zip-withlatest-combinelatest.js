'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Array zip function
// function arrayZip(array1, array2, selector) {
//   const count = Math.min(array1.length, array2.length)
//   const results = []
//
//   for (let i = 0; i < count; i++) {
//     const combined = selector(array1[i], array2[2])
//     results.push(combined)
//   }
//
//   return results
// }
//
// const array1 = [32, 2,2, 52, 54]
// const array2 = [1, 2, 3, 4, 5, 6, 7]
//
// // [ 96, 6, 6, 156, 162 ]
// const results = arrayZip(array1, array2, (left, right) => left * right)
// console.log(results)

// Observable.zip, like mergeMap with processor
// zip.next item 1, at 0
// zip.next item 2, at 500
// zip.next item 3, at 1000
// zip.next item 4, at 1500
// zip.next item 5, at 2000
// zip.complete
// Rx.Observable.range(1, 5)
//   .zip(
//     Rx.Observable.interval(500),
// withLatestFrom.next 5,10
//     (left, right) => `item ${left}, at ${right * 500}`
//   )
//   .subscribe(createSubscriber('zip'))

// withLatestFrom
// withLatestFrom.next 0, latestFrom: 0
// withLatestFrom.next 1, latestFrom: 2
// withLatestFrom.next 2, latestFrom: 4
// withLatestFrom.next 3, latestFrom: 6
// withLatestFrom.next 4, latestFrom: 8
// withLatestFrom.complete
// Rx.Observable.interval(1000)
//   .withLatestFrom(Rx.Observable.interval(500).map(i => ` latestFrom: ${i}`))
//   .take(5)
//   .subscribe(createSubscriber('withLatestFrom'))


// Child stream is combined with the main stream
// combineLatest.next 0
// combineLatest.next 0
// combineLatest.next 0
// combineLatest.next 2
// combineLatest.next 3
// combineLatest.complete
// Rx.Observable.interval(1000)
//   .combineLatest(Rx.Observable.interval(500), (left, right) => left * right)
//   .take(5)
//   .subscribe(createSubscriber('combineLatest'))

// Use case, we can pause the observer until user logged in
// How to perform authentication in reactive way
// Without filter output
// withLatestFrom.next [0,{"isLoggedIn":false}]
// Trigger next
// withLatestFrom.next [0,{"isLoggedIn":true}]
var currentUser$ = new _Rx2.default.BehaviorSubject({ isLoggedIn: false });
_Rx2.default.Observable.interval(1000).combineLatest(currentUser$)
// .filter(([i, user]) => user.isLoggedIn)
.subscribe((0, _util.createSubscriber)('withLatestFrom'));

setTimeout(function () {
  console.log('>> LoggedIn User');
  currentUser$.next({ isLoggedIn: true });
}, 2000);