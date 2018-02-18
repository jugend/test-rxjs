'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// reduce-sum.next 55
// reduce-sum.complete
_Rx2.default.Observable.range(1, 10).reduce(function (acc, value) {
  return acc + value;
}).subscribe((0, _util.createSubscriber)('reduce-sum'));

// reduce-sum.next 10
// reduce-sum.complete
_Rx2.default.Observable.range(1, 10).reduce(Math.max).subscribe((0, _util.createSubscriber)('reduce-sum'));

// Scan, like reduce, but still produce the value for every stream that comes in
// scan-max.next 1
// scan-max.next 3
// scan-max.next 6
// scan-max.next 10
// scan-max.next 15
// scan-max.complete
// Get the sum
_Rx2.default.Observable.range(1, 5).scan(function (acc, value) {
  return acc + value;
}).subscribe((0, _util.createSubscriber)('scan-max'));

// Get previous value as well [current, last]
// scan-max.next 1,
// scan-max.next 2,1
// scan-max.next 3,2
// scan-max.next 4,3
// scan-max.next 5,4
_Rx2.default.Observable.range(1, 5).scan(function (_ref, current) {
  var _ref2 = _slicedToArray(_ref, 2),
      last = _ref2[0],
      lastTwo = _ref2[1];

  return [current, last];
}, []).subscribe((0, _util.createSubscriber)('scan-max'));