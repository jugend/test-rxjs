import $ from 'jquery'
import Rx from 'rxjs/Rx'

const
  $drag = $('#drag'),
  $doc = $(document),
  $dropArea = $('.drop-area'),

  beginDrag$ = Rx.Observable.fromEvent($drag, 'mousedown'),
  endDrag$ = Rx.Observable.fromEvent($doc, 'mouseup'),
  mouseMove$ = Rx.Observable.fromEvent($doc, 'mousemove'),

  currentOverArea$ = Rx.Observable.merge(
    Rx.Observable.fromEvent($dropArea, 'mouseover').map(e => $(e.target)),
    Rx.Observable.fromEvent($dropArea, 'mouseout').map(() => null)
  ),

  drops$ = beginDrag$
    .do(e => {
      e.preventDefault()

      $drag.addClass('dragging')
    })
    .mergeMap(startEvent => mouseMove$
        .takeUntil(endDrag$)
        .do(moveEvent => moveDrag(startEvent, moveEvent))
        .last()
        .withLatestFrom(currentOverArea$, (_, $area) => $area)
    )
    .do(() => {
      $drag.removeClass('dragging').animate({
        'top': 0,
        'left': 0
      })
    }),

  moveDrag = (startEvent, moveEvent) => {
    $drag.css({
      'left': moveEvent.clientX - startEvent.offsetX,
      'top': moveEvent.clientY - startEvent.offsetY
    })
  }

drops$.subscribe($area => {
  $dropArea.removeClass('dropped')

  if($area) {
    $area.addClass('dropped')
  }
})
