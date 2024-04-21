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

// BUG: Removing bug for multi attacked
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
      cell.classList.remove(CLASSES.MULTI_ATTACKED)
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