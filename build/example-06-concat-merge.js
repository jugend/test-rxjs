'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

1;
_Rx2.default.Observable.interval(2000).merge(_Rx2.default.Observable.interval(500)).subscribe((0, _util.createSubscriber)('merge'));

_Rx2.default.Observable.merge();