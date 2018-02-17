'use strict';

require('babel-polyfill');

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(generator); // Required for generator runtime


// Rx.Observable.interval(500)
//   .take(5)
//   .subscribe(createSubscriber('interval'))

// Wait for one second, and repeat at 500ms interval
_Rx2.default.Observable.timer(1000, 500).take(3).subscribe((0, _util.createSubscriber)('timer'));

// Single item
_Rx2.default.Observable.of('Hello, World').subscribe((0, _util.createSubscriber)('of'));

// Array
var arr = ['Hello', 'World'];
_Rx2.default.Observable.from(arr).map(function (i) {
  return i + ' Updated';
}).subscribe((0, _util.createSubscriber)('from'));

// Generator
_Rx2.default.Observable.from(generator()).subscribe((0, _util.createSubscriber)('from.generator'));

function generator() {
  return regeneratorRuntime.wrap(function generator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          _context.next = 4;
          return 2;

        case 4:
          _context.next = 6;
          return 3;

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

// Throw error
_Rx2.default.Observable.throw(new Error()).subscribe((0, _util.createSubscriber)('throw.error'));

// Empty, will call complete
_Rx2.default.Observable.empty().subscribe((0, _util.createSubscriber)('empty'));

// Defer
var sideEffect = 0;
var defer$ = _Rx2.default.Observable.defer(function () {
  sideEffect++;
  return _Rx2.default.Observable.of(sideEffect);
});

defer$.subscribe((0, _util.createSubscriber)('defer$.one'));
defer$.subscribe((0, _util.createSubscriber)('defer$.two'));
defer$.subscribe((0, _util.createSubscriber)('defer$.three'));

// Never, never complete
_Rx2.default.Observable.never().subscribe((0, _util.createSubscriber)('never'));

// Range
_Rx2.default.Observable.range(10, 15).subscribe((0, _util.createSubscriber)('range'));