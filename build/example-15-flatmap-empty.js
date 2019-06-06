'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testFunction$ = new _Rx2.default.Observable.bindNodeCallback(function (arg1, callback) {
  console.log('>> testFunction - arg1', arg1);
  callback(null, 'test');
});

function testBindCallback() {
  testFunction$('hello').subscribe((0, _util.createSubscriber)('bindCallback'));
}

// >> testFunction - arg1 hello
// >> testFunction$ completed, result: test
// flatMap.complete
function testBindCallbackWithEmpty() {
  testFunction$('hello').flatMap(function (result) {
    console.log('>> testFunction$ completed, result:', result);
    // flabMap.next not triggered
    // return Rx.Observable.of({})
    return _Rx2.default.Observable.empty();
  }).catch(function (error) {
    console.log('testFunction$ handle error', error);
    return _Rx2.default.Observable.of(error.message);
  }).subscribe((0, _util.createSubscriber)('flatMap'));
}

// testBindCallback()
testBindCallbackWithEmpty();