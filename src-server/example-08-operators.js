import Rx from 'rxjs/Rx'
import { createSubscriber } from './util'

// Merge Map
// one.next Track 1
// one.next Track 2
// one.next Track 3
// one.complete
Rx.Observable.fromPromise(getTracks())
  .mergeMap(tracks => Rx.Observable.from(tracks))
  .subscribe(createSubscriber('one'))

function getTracks() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['Track 1', 'Track 2', 'Track 3'])
    })
  })
}

// Merge Map with Promise
Rx.Observable.of('myquery')
  .do(() => console.log('Querying'))
  .mergeMap(a => query(a))
  .do(() => console.log('After querying'))
  .subscribe(createSubscriber('query'))

function query() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('This is the value')
    }, 1000)
  })
}

// SwitchMap refer to src-client/example_02
// Only take the latest result, good for UI, on key up
// stream is being processed halfway, and new event coming in to update
