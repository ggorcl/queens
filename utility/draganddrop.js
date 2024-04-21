let dragFrom = ""
let dragTo = ""

function dragStart(event) {
  if (!event.target.classList.contains(CLASSES.QUEEN)) return;
  const parent = event.target.parentElement;
  const cls = getClassFromClassList(parent.classList)
  dragFrom = extractXY(cls);
  event.target.classList.add("dragging")
}

function dragEnd(event) {
  event.target.classList.remove("dragging");
}

function drop(event) {
  event.preventDefault();
  if (event.target.classList.contains(CLASSES.QUEEN)) return;
  let placedSquare = getClassFromClassList(event.target.classList)
  dragTo = extractXY(placedSquare);
  removeQueen(dragFrom[0], dragFrom[1])
  placeQueen(dragTo[0], dragTo[1])
}

function allowDrop(event) {
  event.preventDefault()
}