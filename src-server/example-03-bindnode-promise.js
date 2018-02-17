import Rx from 'rxjs/Rx'
import { createSubscriber  } from './util'

import fs from 'fs'

// Normal way
fs.readdir('./src-server', (err, items) => {
  if (err) console.error(err)
  else {
    console.log(items)
  }
})

// Rxjs way
const readdir$ = Rx.Observable.bindNodeCallback(fs.readdir)
readdir$('./src-server')
  .mergeMap(files => Rx.Observable.from(files))
  .map(file => 'Manipulated')
  .subscribe(createSubscriber('readdir'))

// From Promise
function getItems() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('HELLO')
    }, 1000)
  })
}

Rx.Observable.fromPromise(getItems())
  .subscribe(createSubscriber('fromPromise'))
