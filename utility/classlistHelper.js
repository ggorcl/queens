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