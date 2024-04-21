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