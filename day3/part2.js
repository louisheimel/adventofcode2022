const fs = require('fs')
const { readFileSync } = fs;
const compose = (...fns) => fns.reduce((a, e) => x => a(e(x)))
const log = x => console.log(x)
const toString = x => x.toString()
const splitLines = lines => lines.split('\n')
const tail = n => xs => xs.slice(xs.length - n - 1, n)
const id = x => x
const juxt = (...fns) => x => fns.map(f => f(x))
const slice = (x, y) => z => z.slice(x, y)
const split = splitter => xs => xs.split(splitter)
const map = fn => xs => xs.map(fn)
const filter = fn => xs => xs.filter(fn)
const reduce = reducer => seed => arr => {
  if (arr.length == 0) {
    return seed
  }
  return reduce(reducer)(reducer(seed, arr[0]))(arr.slice(1))
}
const readInput = () => readFileSync('./input')

const overlaps = ([x, y]) => {
  console.log([x, y])
  x = x.map(x => parseInt(x, 10))
  y = y.map(y => parseInt(y, 10))
  const contains = (x1, x2) => {
    const case1 = x1[0] <= x2[0] && x2[0] <= x1[1] 
    const case2 = x2[0] <= x1[0] && x1[0] <= x2[1] 
    return case1 || case2
    
  }
  return contains(x, y) || contains(y, x)
}
compose(log, 
  reduce((a, e) => e ? a + 1 : a)(0),
  filter(overlaps),
  map(compose(map(split('-')), split(','))),
  x => x.slice(0, -1),
  splitLines,
  toString,
  readInput)()
