// Required for generator runtime
import 'babel-polyfill'
import Rx from 'rxjs/Rx'
import { createSubscriber } from './util'

// Rx.Observable.interval(500)
//   .take(5)
//   .subscribe(createSubscriber('interval'))

// Wait for one second, and repeat at 500ms interval
Rx.Observable.timer(1000, 500)
  .take(3)
  .subscribe(createSubscriber('timer'))


// Single item
Rx.Observable.of('Hello, World')
  .subscribe(createSubscriber('of'))

// Array
const arr = ['Hello', 'World']
Rx.Observable.from(arr)
  .map(i => i + ' Updated')
  .subscribe(createSubscriber('from'))

// Generator
Rx.Observable.from(generator())
     .subscribe(createSubscriber('from.generator'))

function *generator() {
  yield(1)
  yield(2)
  yield(3)
}

// Throw error
Rx.Observable.throw(new Error())
  .subscribe(createSubscriber('throw.error'))

// Empty, will call complete
Rx.Observable.empty()
  .subscribe(createSubscriber('empty'))


// Defer
let sideEffect = 0;
const defer$ = Rx.Observable.defer(() => {
  sideEffect++
  return Rx.Observable.of(sideEffect)
})

defer$.subscribe(createSubscriber('defer$.one'))
defer$.subscribe(createSubscriber('defer$.two'))
defer$.subscribe(createSubscriber('defer$.three'))

// Never, never complete
Rx.Observable.never()
  .subscribe(createSubscriber('never'))

// Range
Rx.Observable.range(10, 15)
  .subscribe(createSubscriber('range'))


