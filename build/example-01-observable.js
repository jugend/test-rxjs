'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var simple$ = new _Rx2.default.Observable(function (observer) {
  console.log('Ggenerating observable');
  setTimeout(function () {
    observer.next('An Item');
    setTimeout(function () {
      observer.next('Another Item!');
      observer.complete();
    }, 1000);
  });
});

// Do not run until there is a subscription
simple$.subscribe(function (item) {
  return console.log('one.next ' + item);
}, function (error) {
  return console.log('one.error ' + error);
}, function () {
  return console.log('one.complete');
});

// Use object
setTimeout(function () {
  simple$.subscribe({
    next: function next(item) {
      return console.log('two.text ' + item);
    },
    error: function error(_error) {
      console.log('two.error ' + _error);
    },
    complete: function complete() {
      console.log('two.complete');
    }
  });
});

// Example of passing error
// const error$ = new Rx.Observable(observer => {
//   observer.error(new Error('New error message'))
// })
//
// error$.subscribe(
//   error => console.log(`test.error ${error}`)
// )

// -----------------------------
// PART II

function createSubscriber(tag) {
  return {
    next: function next(item) {
      console.log(tag + '.next ' + item);
    },
    error: function error(_error2) {
      console.log(tag + '.error ' + (_error2.stack || _error2));
    },
    complete: function complete(error) {
      console.log(tag + '.complete');
    }
  };
}

function createInterval$(time) {
  return new _Rx2.default.Observable(function (observer) {
    var index = 0;
    var interval = setInterval(function () {
      observer.next(index++);
    }, time);

    // Invoked on unsubscribe
    return function () {
      clearInterval(interval);
    };
  });
}

function take$(sourceObservable$, amount) {
  return new _Rx2.default.Observable(function (observer) {
    var count = 0;
    var subscription = sourceObservable$.subscribe({
      next: function next(item) {
        observer.next(item);
        if (++count >= amount) observer.complete();
      },
      error: function error(_error3) {
        observer.error(err);
      },
      complete: function complete() {
        observer.complete();
      }
    });
  });
}

var everySecond$ = createInterval$(1000);
var firstFiveSeconds$ = take$(everySecond$, 5);
var subscription = firstFiveSeconds$.subscribe(createSubscriber('one'));

// setTimeout(() => {
//   subscription.unsubscribe()
// }, 3000)