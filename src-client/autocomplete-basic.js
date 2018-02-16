import $ from 'jquery'

const $title = $('#title')
const $results = $('#results')

let lastQuery
let lastTimeout
let nextQueryId = 0

$title.on('keyup', e => {
  const title = e.target.value

  // Ignore same squery
  if (title == lastQuery) {
    return
  }
  lastQuery = title

  // Throtlle queries
  if (lastTimeout) {
    window.clearTimeout(lastTimeout)
  }

  let ourQueryId = ++nextQueryId

  lastTimeout = window.setTimeout(() => {
    getItems(title).then(items => {
      // Ignore old results
      if (ourQueryId != nextQueryId) return

      $results.empty()
      const $items = items.map(item => $(`<li />`).text(item))
      $results.append($items)
    })
  }, 500)
})

function getItems(title) {
  console.log(`Querying ${title}`)
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve([title, 'Item 2', `Another ${Math.random()}`])
    }, 500 + Math.random() * 2000)
  })
}
