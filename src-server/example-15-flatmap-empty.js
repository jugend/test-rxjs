import Rx from 'rxjs/Rx'
import { createSubscriber } from './util'

const testFunction$ = new Rx.Observable.bindNodeCallback((arg1, callback) => {
  console.log('>> testFunction - arg1', arg1)
  callback(null, 'test')
})

function testBindCallback() {
  testFunction$('hello').subscribe(createSubscriber('bindCallback'))
}

// >> testFunction - arg1 hello
// >> testFunction$ completed, result: test
// flatMap.complete
function testBindCallbackWithEmpty() {
  testFunction$('hello')
    .flatMap(result => {
      console.log('>> testFunction$ completed, result:', result)
      // flabMap.next not triggered
      // return Rx.Observable.of({})
      return Rx.Observable.empty()
    })
    .catch(error => {
      console.log('testFunction$ handle error', error)
      return Rx.Observable.of(error.message)
    })
    .subscribe(createSubscriber('flatMap'))
}

// testBindCallback()
testBindCallbackWithEmpty()
