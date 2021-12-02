import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split("\n").map(num => parseInt(num, 10))

const detectNumberOfIncreases = (arr) => arr.reduce((totalIncreases, current, i, array) => current > array[i - 1] ? totalIncreases + 1 : totalIncreases, 0)

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return detectNumberOfIncreases(input)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  const windowTotals = input.reduce((windows, current, i, array) => [...windows, current + array[i - 1] + array[i - 2]], [])

  return detectNumberOfIncreases(windowTotals)
}

run({
  part1: {
    tests: [
      {
        input: `
      1
      2
      3`, expected: 2
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
      1
      2
      3
      4
      5
      6`, expected: 3
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
