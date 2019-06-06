import Rx from 'rxjs/Rx'
import { createSubscriber } from './util'

const obs1$ = new Rx.Observable(observer => {
  console.log('Executing observable 1')
  setTimeout(() => {
    // Comment on/off to test the behaviour
    // observer.error(new Error('obs1$.error'))
    observer.next('obs1')

    // Complete never gets called becuase next would proceed with obs2
    observer.complete('obs1')
  })
})

const obs2$ = new Rx.Observable(observer => {
  console.log('Executing observable 2')
  setTimeout(() => {
    // Comment on/off to test the behaviour
    // observer.error(new Error('obs2$.error'))
    observer.next('obs2')

    // This  will then complete the observeration flow
    observer.complete()
  })
})

// Sequential
//
// Executing observable 1
// concat.next "obs1"
// Executing observable 2
// concat.next "obs2"
// concat.complete
function testConcat() {
  Rx.Observable.concat(obs1$, obs2$).subscribe(createSubscriber('concat'))
}

// Parallel
//
// Executing observable 1
// Executing observable 2
// merge.next "obs1"
// merge.next "obs2"
// merge.complete
function testMerge() {
  Rx.Observable.merge(obs1$, obs2$).subscribe(createSubscriber('merge'))
}

// Alias of mergeMap
function testFlatMap() {
  obs1$
    .flatMap(result => {
      console.log('>> obs1$ completed, result:', result)
      return obs2$.catch((error) => {
        return Rx.Observable.of(error.message)
      })
    })
    .catch(error => {
      console.log('obs1$ handle error', error)
      return Rx.Observable.of(error.message)
    })
    .subscribe(createSubscriber('flatMap'))
}

// testConcat()
// testMerge()
// testFlatMap()
