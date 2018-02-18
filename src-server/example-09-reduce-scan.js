import Rx from 'rxjs/Rx'
import { createSubscriber } from './util'

// reduce-sum.next 55
// reduce-sum.complete
Rx.Observable.range(1, 10)
  .reduce((acc, value) => acc + value)
  .subscribe(createSubscriber('reduce-sum'))

// reduce-sum.next 10
// reduce-sum.complete
Rx.Observable.range(1, 10)
  .reduce(Math.max)
  .subscribe(createSubscriber('reduce-sum'))

// Scan, like reduce, but still produce the value for every stream that comes in
// scan-max.next 1
// scan-max.next 3
// scan-max.next 6
// scan-max.next 10
// scan-max.next 15
// scan-max.complete
// Get the sum
Rx.Observable.range(1, 5)
  .scan((acc, value) => acc + value)
  .subscribe(createSubscriber('scan-max'))

// Get previous value as well [current, last]
// scan-max.next 1,
// scan-max.next 2,1
// scan-max.next 3,2
// scan-max.next 4,3
// scan-max.next 5,4
Rx.Observable.range(1, 5)
  .scan(([last, lastTwo], current) => [current, last], [])
  .subscribe(createSubscriber('scan-max'))
