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
const parseCrates = x => {
  return compose(
  juxt(
      map(x => x.slice(0, 3)),
      map(x => x.slice(4, 7)),
      map(x => x.slice(8, 11)),
      map(x => x.slice(12, 15)),
      map(x => x.slice(16, 19)),
      map(x => x.slice(20, 23)),
      map(x => x.slice(24, 27)),
      map(x => x.slice(28, 31)),
      map(x => x.slice(32, 35)),
    )(x.slice(0, 8))).map(x => 
      x.filter(x => x != '   ').map(x => x.slice(1, 2))
    )
}
const parseMoves =  compose(map(compose(x => [x[1], x[3], x[5]].map(x => parseInt(x, 10)), split(' '))),
  slice(10))

compose(
  log,
  xs => xs.join(''),
  map(xs => xs[0]),
  ([moves, crates]) => {
    const reducer = (a, [n, from, to]) => {
      from--;
      to--;
      while (n > 0) {
        const [head1, ...tail1] = a[from];
        a[from] = [...tail1];
        a[to] = [head1, ...a[to]];
        n--;
      }
      return a
    }
    return reduce(reducer)(crates)(moves)
    
  }, 
  juxt(parseMoves, parseCrates),
  splitLines,
  toString,
  readFileSync
)('./input')
