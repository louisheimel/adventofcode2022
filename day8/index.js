const fs = require('fs')
const { readFileSync } = fs;
const compose = (...fns) => fns.reduce((a, e) => x => a(e(x)))
const log = x => console.log(x)
const toString = x => x.toString()
const splitLines = lines => lines.split('\n')
const id = x => x
const juxt = (...fns) => x => fns.map(f => f(x))
const slice = (x, y) => z => z.slice(x, y)
const split = splitter => xs => xs.split(splitter)
const map = fn => xs => xs.map(fn)
const reduce = reducer => seed => arr => {
  if (arr.length == 0) {
    return seed
  }
  return reduce(reducer)(reducer(seed, arr[0]))(arr.slice(1))
}

const toGrid = lines => {
  return map(line => line.split('').map(x => +x))(lines)
}
const transpose = rows => {
  const newRows = []
  let j = 0
  while (j < rows[0].length) {
    let newRow = []
    for (let row of rows) {
      newRow.push(row[j])
    }
    newRows.push(newRow)
    j++
  }
  return newRows
  
}
const countVisible = grid => {
  const copy = () => grid.map(row => row.map(col => col))
  const left = new Array(grid.length).fill(new Array(grid[0].length).fill(-1))
  const right = copy()
  const up = copy()
  const down = copy()
  let count = 0
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i]
    const newRow = new Array(row.length).fill(-1)
    for (let j = 0; j < row.length; j++) {
      if (j == 0) { newRow[j] = row[j]; continue; }
      newRow[j] = Math.max(row[j], newRow[j-1])
    }
    left[i] = newRow
  }

  for(let i = 0; i < grid.length; i++) {
    for (let j = grid[0].length - 1; j > -1; j--) {
      if (j == grid[0].length - 1) {
        continue
      }
      right[i][j] = Math.max(right[i][j], right[i][j+1])
    }
  }

  for (let j = 0; j < grid[0].length; j++) {
    for (let i = 0; i < grid.length; i++) {
      if (i == 0) {
        continue
      }
      down[i][j] = Math.max(down[i][j], down[i-1][j])
    }
  }
  for (let i = grid.length - 1; i > -1 ; i--) {
    for (let j = 0; j < grid[0].length; j++) {
      if (i == grid.length - 1) {
        continue;
      }
      up[i][j] = Math.max(up[i][j], up[i+1][j])
    }
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (i == 0 || j == 0 || i == grid.length - 1 || j == grid[0].length - 1) {
        count++
        continue
      }


      if (grid[i][j] > down[i-1][j]) {
        count++
        continue
      }
      if (grid[i][j] > up[i+1][j]) {
        count++
        continue
      }
      if (grid[i][j] > right[i][j+1]) {
        count++
        continue
      }
      if (grid[i][j] > left[i][j-1]) {
        count++
        continue
      }
    }
  }
  
  return count
}
compose(
  log,
  countVisible,
  toGrid,
  x => x.slice(0, -1),
  splitLines,
  toString,readFileSync)('./input')
