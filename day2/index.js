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

const [ROCK, PAPER, SCISSORS] = [0, 1, 2];
const theirMoves = {
  'A': ROCK,
  'B': PAPER,
  'C': SCISSORS
}

const myMoves = {
  'X': ROCK,
  'Y': PAPER,
  'Z': SCISSORS
}



const iWin = ([them, me]) => {
  const theirMove = theirMoves[them];
  const myMove = myMoves[me];
  if (myMove == ROCK && theirMove == SCISSORS) {
    return true
  }
  if (myMove == SCISSORS && theirMove == PAPER) {
    return true
  }
  if (myMove == PAPER && theirMove == ROCK) {
    return true
  }

  return false
}

const iTie = ([them, me]) => {
  const theirMove = theirMoves[them];
  const myMove = myMoves[me];
  return theirMove == myMove;
}

compose(
  log,
  reduce((a, e) => a + e)(0),
  map(
  x => (myMoves[x[1]] + 1) + (iWin(x) ? 6 : iTie(x) ? 3 : 0)
  ),
  map(xs => xs.split(' ')),
  xs => xs.slice(0, xs.length - 1),
  splitLines,
  toString,
  readInput
)()
