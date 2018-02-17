import Rx from 'rxjs/Rx'
import { createSubscriber } from './util'

// Use as a bridge between non-reactive and reactive codes
// Use only as the last resource

// const simple$ = new Rx.Subject()
// simple$.subscribe(createSubscriber('simple$'))
// simple$.next('Hello')
// simple$.next('World')
// simple$.complete()


// Interval subject acts as a bridge for the interval
// Turn cold observable into hot observable
// const interval$ = new Rx.Observable.interval(1000).take(5)
// const intervalSubject$ = new Rx.Subject()
//
// interval$.subscribe(intervalSubject$)
//
// intervalSubject$.subscribe(createSubscriber('sub1'))
// intervalSubject$.subscribe(createSubscriber('sub2'))
// intervalSubject$.subscribe(createSubscriber('sub3'))
//
// setTimeout(() => {
//   intervalSubject$.subscribe(createSubscriber('Look at Me!'))
// }, 2000)
//

// Delayed Subject, output:
// isLoggedIn.next false
// isLoggedIn.next true
// delayed.next true
const currentUser$ = new Rx.Subject()
const isLoggedIn$ = currentUser$.map(u => u.isLoggedIn)
isLoggedIn$.subscribe(createSubscriber('isLoggedIn'))

currentUser$.next({ isLoggedIn: false })

setTimeout(() => {
  currentUser$.next({ isLoggedIn: true, name: 'nelson' })
}, 2000)

// Getting true
setTimeout(() => {
  isLoggedIn$.subscribe(createSubscriber('delayed'))
}, 1000)


// Behvaviour Subject, takes in an initial value
// And always emit next event for the initial value
// and the last next value on new subscribe
// Example:
// isLoggedIn.next true
// isLoggedIn.next false
// delayed.next false
// isLoggedIn.next true
// delayed.next true
// const currentUser$ = new Rx.BehaviorSubject({ isLoggedIn: true })
// const isLoggedIn$ = currentUser$.map(u => u.isLoggedIn)
//
// isLoggedIn$.subscribe(createSubscriber('isLoggedIn'))
// currentUser$.next({ isLoggedIn: false })
//
// setTimeout(() => {
//   currentUser$.next({ isLoggedIn: true, name: 'nelson' })
// }, 2000)
//
// // Getting true
// setTimeout(() => {
//   isLoggedIn$.subscribe(createSubscriber('delayed'))
// }, 1000)


// Replay Subject, replay the lat set of values since the last subscribe
// Argument is the number of replays since the last emit
// Example:
// one.next 1
// one.next 2
// one.next 3
// one.next 4
// one.next 5
// two.next 3
// two.next 4
// two.next 5
// one.next 6
// two.next 6
// const replay$ = new Rx.ReplaySubject(3)
// replay$.next(1)
// replay$.next(2)
//
// replay$.subscribe(createSubscriber('one'))
//
// replay$.next(3)
// replay$.next(4)
// replay$.next(5)
//
// replay$.subscribe(createSubscriber('two'))
//
// replay$.next(6)


// Async Subject
// Only emit the final value when complete is called
// Alwaays emit the final value for the new subscribe
// one.next 1
// one.complete
// two.next 1
// two.complete
// isLoggedIn.next true
// delayed.next true
const apiCall$ = new Rx.AsyncSubject()
apiCall$.next(1)

apiCall$.subscribe(createSubscriber('one'))
apiCall$.next(1)
apiCall$.complete()

setTimeout(() => {
  apiCall$.subscribe(createSubscriber('two'))
})
