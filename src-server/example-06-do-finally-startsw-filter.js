import Rx from 'rxjs/Rx'
import { createSubscriber } from './util'

// DO, execute before next is called
// From do 1
// do.next 1
// From do 2
// do.next 4
// From do 3
// do.next 9
// do.complete
Rx.Observable.range(1, 3)
  .do(a => console.log(`From do ${a}`))
  .map(a => a * a)
  .subscribe(createSubscriber('do'))

// Finally, only executed when the range completes
// finally.next 1
// finally.next 2
// finally.next 3
// finally.complete
// From finally undefined
Rx.Observable.range(1, 3)
  .finally(a => console.log(`From finally ${a}`))
  .subscribe(createSubscriber('finally'))

// Filter
// filter.next 6
// filter.next 7
// filter.next 8
// filter.next 9
// filter.next 10
// filter.complete
Rx.Observable.range(1, 10)
  .filter(a => a > 5)
  .subscribe(createSubscriber('filter'))

// Starts with, merge initial value
// startsWith.next -1
// startsWith.next 0
// startsWith.next 1
Rx.Observable.interval(1000)
  .startWith(-1)
  .subscribe(createSubscriber('startsWith'))
