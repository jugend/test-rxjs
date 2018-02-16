import Rx from 'rxjs/Rx'

const simple$ = new Rx.Observable(observer => {
  console.log('Ggenerating observable')
  setTimeout(() => {
    observer.next('An Item')
    setTimeout(() => {
      observer.next('Another Item!')
      observer.complete()
    }, 1000)
  })
})

// Do not run until there is a subscription
simple$.subscribe(
  item => console.log(`one.next ${item}`),
  error => console.log(`one.error ${error}`),
  () => console.log('one.complete')
)

// Use object
setTimeout(() => {
  simple$.subscribe({
    next: item => console.log(`two.text ${item}`),
    error(error) {
      console.log(`two.error ${error}`)
    },
    complete() {
      console.log('two.complete')
    }
  })
})


// Example of passing error
// const error$ = new Rx.Observable(observer => {
//   observer.error(new Error('New error message'))
// })
//
// error$.subscribe(
//   error => console.log(`test.error ${error}`)
// )

// -----------------------------
// PART II

function createSubscriber(tag) {
  return {
    next(item) { console.log(`${tag}.next ${item}`) },
    error(error) { console.log(`${tag}.error ${error.stack || error}`) },
    complete(error) { console.log(`${tag}.complete`) },
  }
}


function createInterval$(time) {
  return new Rx.Observable(observer => {
    let index = 0
    setInterval(() => {
      observer.next(index++)
    }, time)
  })
}

const everySecond$ = createInterval$(1000)
everySecond$.subscribe(createSubscriber('one'))
