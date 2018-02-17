import 'babel-bolyfill1'
import $ from 'jquery'
import Rx from 'rxjs/Rx'

const $title = $('#title')
const $results = $('#results')

const keyUp$ = Rx.Observable.fromEvent($title, 'keyup')
const queries$ = keyUp$
  .map(e => e.target.value)
  .distinctUntilChanged()
  .debounce(250)
  .switchMap(getItems) // Old name flatMapLastest => Only get the latest query

queries$.subscribe(items => {
  $results.empty()
  $results.append(items.map(r => $('<li />').text(r)))
})

function getItems(title) {
  console.log(`Querying ${title}`)
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve([title, 'Item 2', `Another ${Math.random()}`])
    }, 500 + Math.random() * 5000)
  })
}
