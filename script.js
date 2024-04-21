const CLASSES = {
  ATTACKED: 'attacked',
  MULTI_ATTACKED: 'multi-attacked',
  QUEEN: 'queen',
}

const queen = () => {
  let img = document.createElement("img");
  img.classList.add(CLASSES.QUEEN);
  img.src = "assets/queen.svg";
  img.width = 100;
  img.height = 100;
  img.draggable = true
  img.addEventListener('dragstart', dragStart)
  img.addEventListener('dragend', dragEnd)
  return img;
}

function placeQueen(x, y) {
  const cell = document.querySelector(`.cell-${x}-${y}`)
  if (cell.children.length === 1) return
  cell.appendChild(queen())
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      const currentCell = document.querySelector(`.cell-${i}-${j}`)
      if (i == x || j == y || Math.abs(i - x) === Math.abs(j - y)) {
        currentCell.classList.add(CLASSES.ATTACKED)
        currentCell.classList.add(`by-${x}-${y}`)
      }

      if (currentCell.classList.contains(CLASSES.ATTACKED)) {
        let attackedCount = 0
        currentCell.classList.forEach((x) => {
          if (x.startsWith(`by`)) attackedCount++;
          if (attackedCount > 1) {
            currentCell.classList.remove(CLASSES.ATTACKED)
            currentCell.classList.add(CLASSES.MULTI_ATTACKED)
          }
        })
      }
    }
  }
  document.querySelector(`.cell-${x}-${y}`).classList.add("queen")
}

function removeQueen(x, y) {
  const cell = document.querySelector(`.cell-${x}-${y}`)
  if (!cell?.querySelector(`.${CLASSES.QUEEN}`)) return;
  cell.classList.remove(CLASSES.QUEEN)
  while (cell.firstChild) {
    cell.removeChild(cell.firstChild);
  }

  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      const cell = document.querySelector(`.cell-${i}-${j}`)
      const cls = getClassFromClassList(cell.classList, `by-${x}-${y}`)
      if (!cls) continue;
      cell.classList.remove(cls)
      cell.classList.remove(CLASSES.ATTACKED)
      let attackedCount = 0
      cell.classList.forEach((x) => {
        if (x.startsWith(`by`)) attackedCount++;
        if (attackedCount == 1) {
          cell.classList.add(CLASSES.ATTACKED)
        }
        if (attackedCount > 1) {
          cell.classList.remove(CLASSES.ATTACKED)
          cell.classList.add(CLASSES.MULTI_ATTACKED)
          return
        }
      })
    }
  }
}

function getClassFromClassList(list, required = 'cell') {
  let c = ""
  list.forEach((cls) => {
    if (cls.startsWith(required)) {
      c = cls;
      return
    }
  })
  return c
}

function extractXY(cell) {
  [_, x, y] = cell.split('-')
  return [x, y]
}

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
  console.log(dragFrom, dragTo)
  removeQueen(dragFrom[0], dragFrom[1])
  placeQueen(dragTo[0], dragTo[1])
}


function allowDrop(event) {
  event.preventDefault()
}

document.getElementById("multiAttackedColor").addEventListener("input", function () {
  document.documentElement.style.setProperty('--multi-attacked-color', this.value);
});

document.getElementById("attackedColor").addEventListener("input", function () {
  document.documentElement.style.setProperty('--attacked-color', this.value);
});

document.getElementById("queenColor").addEventListener("input", function () {
  document.documentElement.style.setProperty('--queen-color', this.value);
});


const grid = document.querySelector(".grid")
for (let i = 1; i <= 8; i++) {
  for (let j = 1; j <= 8; j++) {
    const cell = document.createElement("div")
    cell.style.height = "100px"
    cell.style.width = "100px"
    cell.classList.add('square')
    cell.classList.add(`cell-${i}-${j}`)
    cell.ondblclick = () => {
      if (cell.children.length === 1) {
        removeQueen(i, j)
      } else {
        placeQueen(i, j)
      }
    }
    grid.appendChild(cell)
  }
}