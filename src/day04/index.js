import run from "aocrunner"

const parseInput = (rawInput) => {
  const [input, ...boards] = rawInput.split(/\n\n/)
  return [input.split(","), boards.map(rawBoard => {
    const board = rawBoard.split("\n")
    return board.map(row => row.trim().split(/\s+/))
  })]
}

const isMarked = (num) => num[0] === "*"

const testHorizontal = (board) => {
  return board.some(row => row.every(isMarked))
}

const testVertical = (board) => {
  const flipped = board[0].map((__, colIndex) => board.map(row => row[colIndex]))
  return testHorizontal(flipped)
}

const hasBingo = (board) => {
  return testHorizontal(board) || testVertical(board)
}

const markNumber = (number, board) => {
  for (let i = 0; i < board.length; i++) {
    const row = board[i]
    const indexOfNumber = row.indexOf(number)
    if (indexOfNumber !== -1) {
      row[indexOfNumber] = `*${number}`
    }
  }

  return board
}

const findWinningBoard = (numbers, boards, index = 0) => {
  const target = numbers[index]
  let i = 0
  const marked = []
  let bingo = false

  while (i < boards.length) {
    const markedBoard = markNumber(target, boards[i])

    if (hasBingo(markedBoard)) {
      bingo = true
      markedBoard.finalNumber = target
      marked.push(markedBoard)
      break
    }

    marked.push(markedBoard)

    i += 1
  }

  return index < numbers.length && !bingo ? findWinningBoard(numbers, marked, index + 1) : marked[i]
}

const findLosingBoard = (numbers, boards, index = 0) => {
  const target = numbers[index]
  let remainingBoards = []

  for (let i = 0; i < boards.length; i++) {
    const markedBoard = markNumber(target, boards[i])

    if (!hasBingo(markedBoard)) {
      remainingBoards.push(markedBoard)
    }
    else {
      markedBoard.finalNumber = target
    }
  }

  const lastBoardHasBingo = boards.length === 1 && boards[0].finalNumber

  return (lastBoardHasBingo || index === numbers.length - 1) ? boards[0] : findLosingBoard(numbers, remainingBoards, index + 1)
}

const sumUnmarkedNumbers = (board) => board.reduce((totalUnmarked, curr) => {
  if (curr[0] === "*") return totalUnmarked

  return totalUnmarked + parseInt(curr, 10)
}, 0)

const part1 = (rawInput) => {
  const [input, boards] = parseInput(rawInput)

  const winningBoard = findWinningBoard(input, boards)

  const sumUnmarked = sumUnmarkedNumbers(winningBoard.flat())

  return winningBoard.finalNumber * sumUnmarked
}

const part2 = (rawInput) => {
  const [input, boards] = parseInput(rawInput)

  const losingBoard = findLosingBoard(input, boards)

  const sumUnmarked = sumUnmarkedNumbers(losingBoard.flat())

  return losingBoard.finalNumber * sumUnmarked
}

run({
  part1: {
    tests: [
      {
        input: `
      7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
      `, expected: 4512
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
      7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
      `, expected: 1924
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
