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

const parse = compose(  xs => xs.slice(0, -1),
  splitLines,
  toString,
  () => readFileSync('./input'))

const chunkByThree = xs => {
  const chunks = []
  let chunk = []
  let i = 0
  while (i < xs.length) {
    if (i > 0 && i % 3 == 0) {
      chunks.push(chunk)
      chunk = []
      chunk.push(xs[i]);
    } else {
      chunk.push(xs[i])
    }
    i++
  }
  chunks.push(chunk)
  return chunks
}
const commonLetter = xs => {
  const [a, b, c] = xs;
  const aSet = new Set(a);
  const bSet = new Set(b);
  const cSet = new Set(c);
  const d = [...a, ...b, ...c];
  const result = new Set();
  console.log(d, aSet, bSet, cSet)
  for (let x of d) {
    if (aSet.has(x) && bSet.has(x) && cSet.has(x)) {
      result.add(x)
    }
  }
  return Array.from(result)
}
const priorityValue = x => {
    const temp = x.charCodeAt(0) - 'a'.charCodeAt(0) + 1
    if (temp >= 0) return temp
    return temp + 58;
}

compose(
  log,
  reduce((a, e) => a + e)(0),
  map(priorityValue),
  xs => xs.flatMap(id),
  map(commonLetter),
  map(x => x.map(x => x.split(''))),
  chunkByThree,
  parse
)()
