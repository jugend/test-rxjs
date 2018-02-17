'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Thiw will connect second subscriber to one, .next value will always be in sync
// one.next 3
// two.next 3
// one.next 4
// Subscriber only starts getting events after connect is called
// const interval$ = Rx.Observable.interval(1000)
//   .take(10)
//   .publish()
//
// setTimeout(() => {
//   interval$.connect()
// })
//
// setTimeout(() => {
//   interval$.subscribe(createSubscriber('one'))
// }, 1200)
//
// setTimeout(() => {
//   interval$.subscribe(createSubscriber('two'))
// }, 3200)


// Use case is important for system like chat messages
// const chatMessagse$ = new Rx.Observable.(observer => {
//   console.log('subscribed')
//   observer.on('chat:message', message => observer.next(message))
// })
//
// chatMessagse$.connect()
//
// chatMessagse$.subscribe(createSubscriber('one'))
// chatMessagse$.subscribe(createSubscriber('two'))

var simple$ = new _Rx2.default.Observable(function (observer) {
  observer.next('one - updated');
  observer.next('two - updated');
  // observer.complete()

  return function () {
    return console.log('Disposed');
  };
});

// Create hot observable, always publish last value
// Only called when complete is called
// const published$ = simple$.publishLast()
// const published$ = simple$.publishReplay(2)

// Instaed of calling connection.Unsubscribe() you can use refCount
// Don't need connect and unsubscribe
// To automatically call connection.unsubscribe() when there are no more subscriberss
// const published$ = simple$.publishReplay(2).refCount()

// Alias for simple$.publish().refCount()
var published$ = simple$.share();

var sub1 = published$.subscribe((0, _util.createSubscriber)('one'));
// const connection = published$.connect()
var sub2 = published$.subscribe((0, _util.createSubscriber)('two'));

// Unsubscribe doesn't call disposed
sub1.unsubscribe();
sub2.unsubscribe();

// In control when observerable start and stop, use refCount above
// connection.unsubscribe()