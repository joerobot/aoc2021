import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split("\n").map(row => row.split(" -> "))

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

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

  let i = 0

  while (i < input.length) {
    const [startCoords, endCoords] = input[i]

    const [x1, y1] = startCoords.split(",")
    const [x2, y2] = endCoords.split(",")

    if (x1 === x2) {
      drawLine(parseInt(x1, 10), parseInt(y1, 10), parseInt(y2, 10), true)
    }
    else if (y1 === y2) {
      drawLine(parseInt(y1, 10), parseInt(x1, 10), parseInt(x2, 10))
    }

    i += 1
  }

  return [...board.values()].filter(v => v > 1).length
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
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
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
