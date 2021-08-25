import { data } from "./customCustomsData.js"

// ==== PART A ====
const reg = /\n/g

const anyoneAnswerYes = data
  .split("\n\n")
  .map((group) => group.replace(reg, ""))
  .map((group) => [...new Set(group.split(""))].length)
  .reduce((acc, total) => acc + total, 0)

// 6748
console.log("Sum of counts anyone answered yes:", anyoneAnswerYes)

// ==== PART B ====

// target data structure
/*
[
  { players: 1, counts: { a: 1, b: 1, c: 1 } },
  { players: 3, counts: { a: 1, b: 1, c: 1 } },
  { players: 2, counts: { a: 2, b: 1, c: 1 } },
  { players: 4, counts: { a: 4 } },
  { players: 1, counts: { b: 1 } },
]
*/

// helper
const tally = function (acc, curr) {
  if (typeof acc[curr] == "undefined") {
    acc[curr] = 1
  } else {
    acc[curr] += 1
  }
  return acc
}

const everyoneAnswerYes = data
  .split("\n\n")
  .map((group) => group.split("\n"))
  .map((answers) => {
    const counts = answers.join("").split("").reduce(tally, {})
    return { players: answers.length, counts } // data structure
  })
  .map((data) => {
    // all answered yes ?
    return Object.values(data.counts).filter((val) => val === data.players)
      .length
  })
  .reduce((acc, total) => acc + total, 0)

// 6748
console.log("Sum of counts everyone answered yes:", everyoneAnswerYes)
