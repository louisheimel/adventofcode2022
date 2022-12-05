const fs = require('fs')
const { readFileSync } = fs;
const compose = (...fns) => fns.reduce((a, e) => x => a(e(x)))

const log = x => console.log(x)

const chunkCalories = xs => {
  let chunks = []
  let chunk = []
  for (let i = 0; i < xs.length; i++) {
    if (xs[i] == null) {
      chunks.push(chunk)
      chunk = []
    } else {
      chunk.push(xs[i])
    }
  }
  chunks.push(chunk)
  return chunks
}
const sumCalories = xs => xs.map(xs => xs.reduce((a, e) => a + e, 0))
const maxCalories = xs => xs.reduce((a, e) => e > a ? e : a, 0)
const topThree = xs => {
  let top = []
  for (let c of xs) {
    if (top.length < 3) {
      top.push(c)
      continue
    }
    for (let i = 0; i < top.length; i++) {
      if (c > top[i]) {
        top[i] = c
        break
      }
    }
  }
  return top.reduce((a, e) => a + e, 0)
}
compose
(
  log,
  topThree,
  sumCalories,
  chunkCalories,
  xs => xs.map(x => x == '' ? null : parseInt(x, 10)),
  x => x.split('\n'),
  x => x.toString(),
  readFileSync
)('./input')
