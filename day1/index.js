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
compose
(
  log,
  maxCalories,
  sumCalories,
  chunkCalories,
  xs => xs.map(x => x == '' ? null : parseInt(x, 10)),
  x => x.split('\n'),
  x => x.toString(),
  readFileSync
)('./input')
