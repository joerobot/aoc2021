import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split("\n")

const binaryArrayToDecimal = (arr) => parseInt(arr.join(""), 2)

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const { length } = input
  const target = length / 2

  const gamma = []
  const epsilon = []

  const loop = (targetIndex) => {
    let i = 0
    let total0 = 0
    let total1 = 0

    while (i < length) {
      const current = input[i][targetIndex]
      if (current === "0") {
        total0 += 1
      }
      else {
        total1 += 1
      }

      if (total0 > target) {
        gamma.push(0)
        epsilon.push(1)
        break
      }

      if (total1 > target) {
        gamma.push(1)
        epsilon.push(0)
        break
      }

      i += 1
    }
  }

  const [tmp] = input

  for (let i = 0; i < tmp.length; i++) {
    loop(i)
  }

  return binaryArrayToDecimal(gamma) * binaryArrayToDecimal(epsilon)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  const parseData = (type, array, targetIndex = 0,) => {
    const target = array.length / 2

    let i = 0
    let total0 = 0
    let total1 = 0

    const payload = {
      oxygen: null,
      C02: null,
    }

    while (i < array.length) {
      const current = array[i][targetIndex]

      if (current === "0") {
        total0 += 1
      }
      else {
        total1 += 1
      }

      if (total0 > target) {
        payload.oxygen = "0"
        payload.C02 = "1"
        break
      }

      if (total1 > target) {
        payload.oxygen = "1"
        payload.C02 = "0"
        break
      }

      if (total0 === total1 && i === array.length - 1) {
        payload.oxygen = "1"
        payload.C02 = "0"
        break
      }

      i += 1
    }

    const filtered = array.filter(d => d[targetIndex] === payload[type])

    return filtered.length === 1 ? filtered[0] : parseData(type, filtered, targetIndex + 1)
  }

  const oxygen = parseInt(parseData("oxygen", input), 2)
  const C02 = parseInt(parseData("C02", input), 2)

  return oxygen * C02
}

run({
  part1: {
    tests: [
      {
        input: `
      00100
      11110
      10110
      10111
      10101
      01111
      00111
      11100
      10000
      11001
      00010
      01010
      `, expected: 198
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
      00100
      11110
      10110
      10111
      10101
      01111
      00111
      11100
      10000
      11001
      00010
      01010`, expected: 230
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
