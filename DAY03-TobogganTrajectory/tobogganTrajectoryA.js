import { data } from "./tobogganTrajectoryData.js"

// iterate over each row NB down always = 1
// iterate over each column
// check for tree, increment total

const treesCount = (data) => {
  let totalTrees = 0
  const moves = { right: 3, down: 1 }
  const rows = data.split("\n")

  rows.forEach((row, index) => {
    // rows repeat, so use modulus of length
    const currentColumn = (index * moves.right) % row.length
    if (row[currentColumn] === "#") {
      totalTrees++
    }
  })

  return totalTrees
}

// 178
console.log(treesCount(data))
