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
  return img;
}

function placeQueen(x, y) {
  document.querySelector(`.cell-${x}-${y}`).appendChild(queen())
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

const grid = document.querySelector(".grid")
for (let i = 1; i <= 8; i++) {
  for (let j = 1; j <= 8; j++) {
    const cell = document.createElement("div")
    cell.style.height = "100px"
    cell.style.width = "100px"
    cell.classList.add('square')
    cell.classList.add(`cell-${i}-${j}`)
    grid.appendChild(cell)
  }
}

for (let i = 1; i <= 8; i++) {
  placeQueen(i, 1)
}