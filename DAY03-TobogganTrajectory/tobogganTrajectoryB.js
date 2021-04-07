import { data } from "./tobogganTrajectoryData.js"

// iterate over each move
// iterate over each row, check for current row against moves.down
// iterate over each column
// check for tree, increment trees total
// increment *= total trees

const moves = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
]

const getTreeCount = (data, move) => {
  const grid = data.split("\n")

  let colIndex = 0
  let rowIndex = 0
  let treeCount = 0

  while (rowIndex < grid.length) {
    const row = grid[rowIndex]
    // rows repeat, so use modulus of length
    if (row.charAt(colIndex % row.length) === "#") {
      treeCount++
    }
    colIndex += move.right
    rowIndex += move.down
  }

  return treeCount
}

function treesCountFiveSlopes(data, moves) {
  let total = 1

  for (let move of moves) {
    // multiply each slope's answer
    total *= getTreeCount(data, move)
  }
  return total
}

// 3492520200
console.log(treesCountFiveSlopes(data, moves))
