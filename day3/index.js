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

const  rucksackCompartments = map(x => [x.slice(0, x.length / 2), x.slice(x.length / 2)])
compose(
  log,
  reduce((a, e) => a + e)(0),
  map(x => {
    const temp = x.charCodeAt(0) - 'a'.charCodeAt(0) + 1
    if (temp >= 0) return temp
    return temp + 58;
  }),
  xs => xs.flatMap(id),
  map(x => [...x]),
  map(x => {
    const s = new Set();
    for (const c of x[0]) {
      if (x[1].has(c)) {
        s.add(c)
      }
    }
    for (const c of x[1]) {
      if (x[0].has(c)) {
        s.add(c)
      }
    }
    return s
  }),
  map(x => x.map(x => new Set(x.split('')))),
  rucksackCompartments,
  parse
)()
