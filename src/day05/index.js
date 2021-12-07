import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split("\n").map(row => row.split(" -> "))

const plotLines = (input, { includeDiagonals } = {}) => {
  const board = new Map()

  const drawLine = (axis, lineStart, lineEnd, isX = false) => {
    const min = Math.min(lineStart, lineEnd)
    const max = Math.max(lineStart, lineEnd)
    let j = min

    while (j <= max) {
      const key = isX ? `${axis}-${j}` : `${j}-${axis}`
      const value = board.get(key) ? board.get(key) + 1 : 1
      board.set(key, value)

      j += 1
    }
  }

  const drawDiagonal = ([x1, y1], [x2, y2]) => {
    let x = x1
    let y = y1

    const xCounter = Math.sign(x2 - x1)
    const yCounter = Math.sign(y2 - y1)

    while (x !== x2 + xCounter && y !== y2 + yCounter) {
      const key = `${x}-${y}`

      const value = board.get(key) ? board.get(key) + 1 : 1
      board.set(key, value)

      x += xCounter
      y += yCounter
    }
  }

  let i = 0

  while (i < input.length) {
    const [startCoords, endCoords] = input[i]

    const [x1, y1] = startCoords.split(",").map(n => parseInt(n, 10))
    const [x2, y2] = endCoords.split(",").map(n => parseInt(n, 10))

    if (x1 === x2) {
      drawLine(x1, y1, y2, true)
    }
    else if (y1 === y2) {
      drawLine(y1, x1, x2)
    }
    else if (includeDiagonals) {
      drawDiagonal([x1, y1], [x2, y2])
    }

    i += 1
  }

  return board
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const board = plotLines(input)

  return [...board.values()].filter(v => v > 1).length
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  const board = plotLines(input, { includeDiagonals: true })

  console.log([...board.entries()])

  return [...board.values()].filter(v => v > 1).length
}

run({
  part1: {
    tests: [
      {
        input: `
      0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
      `, expected: 5
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
      0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
      `, expected: 12
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
