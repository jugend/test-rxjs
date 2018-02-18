import Rx from 'rxjs/Rx'
import { createSubscriber } from './util'

// Throw error
// Rx.Observable.combineLatest(
//   Rx.Observable.of(42),
//   Rx.Observable.throw(new Error('ERROR')),
//   Rx.Observable.of(10)
// ).subscribe(createSubscriber('catch'))


// When error happened, we immediately unsubscribe
// Wrap error in observable so that do can still be executed
// Getting API
// do THING
// api.next "API error"
// api.complete
// Rx.Observable.fromPromise(getApi())
//   .catch(error => Rx.Observable.of(error))
//   .do(() => console.log('do THING'))
//   .subscribe(createSubscriber('api'))
//
// Promise result is cached, thus retry doesn't work
// function getApi() {
//   console.log('Getting API')
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject(new Error('API error'))
//       // resolve({ hello: 'world' })
//     })
//   })
// }

// GET API Wtith retry
// Getting API
// Getting PI
// Getting API
// Getting API
// do THING
// api$.next {}
// api$.complete
getApi$()
  .retry(3)
  .catch(err => Rx.Observable.of(err))
  .do(() => console.log('do THING'))
  .subscribe(createSubscriber('api$'))

function getApi$() {
  return new Rx.Observable(observer => {
    console.log('Getting API')
    setTimeout(() => {
      observer.error(new Error())
    }, 500)
  })
}
