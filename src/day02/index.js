import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split("\n").map(instruction => instruction.split(" "))

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const navigation = {
    up: 0,
    down: 0,
    forward: 0,
  }

  for (let i = 0; i < input.length; i++) {
    const [direction, distance] = input[i]
    navigation[direction] += parseInt(distance, 10)
  }

  const { up, down, forward } = navigation

  return (down - up) * forward
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  const position = {
    x: 0,
    depth: 0,
    aim: 0,
  }

  const adjustAim = (direction) => (distance) => direction === "up" ? position.aim -= distance : position.aim += distance

  const navigation = {
    forward: (distance) => {
      position.x += distance
      position.depth += distance * position.aim
    },
    up: adjustAim("up"),
    down: adjustAim("down")
  }


  for (let i = 0; i < input.length; i++) {
    const [direction, distance] = input[i]
    navigation[direction](parseInt(distance, 10))
  }

  return position.x * position.depth
}

run({
  part1: {
    tests: [
      {
        input: `
        forward 5
        down 5
        forward 8
        up 3
        down 8
        forward 2
      `, expected: 150
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        forward 5
        down 5
        forward 8
        up 3
        down 8
        forward 2
      `, expected: 900
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
