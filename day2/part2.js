const fs = require('fs')
const { readFileSync } = fs;
const readInput = () => readFileSync('./input')
const tail = n => xs => xs.slice(xs.length - n, xs.length)
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



const scores = {'A X': 3,
'B X': 1,
'C X': 2,
'A Y': 4,
'B Y': 5,
'C Y': 6,
'A Z': 8,
'B Z': 9,
'C Z': 7}
const objToFn = obj => k => obj[k]
compose(
  log,
  reduce((a, e) => a + e)(0),
  map(objToFn(scores)),
  slice(0, -1),
  splitLines,
  toString,
  readInput
)()
