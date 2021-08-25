import { data } from "./binaryBoardingData.js"

// ==== PART A ====
const boardingPasses = data.split("\n")

// strategy: convert boarding passes to binary
// could use regex replace
const MAP = {
  F: 0,
  B: 1,
  L: 0,
  R: 1,
}

const seatIDs = boardingPasses.map((pass) => {
  const rowNumber = Number.parseInt(
    pass
      .slice(0, 7) // first 7 chars
      .split("")
      .map((letter) => MAP[letter])
      .join(""),
    2 // radix
  )

  const colNumber = Number.parseInt(
    pass
      .slice(7) // last 3 chars
      .split("")
      .map((letter) => MAP[letter])
      .join(""),
    2 // radix
  )

  // console.log(rowNumber, colNumber)
  const seatID = rowNumber * 8 + colNumber

  return seatID
})

const highestSeatID = Math.max(...new Set(seatIDs))

// 874
console.log("Highest Seat ID:", highestSeatID)

// ==== PART B ====

const sortedSeatIDS = seatIDs.sort((a, b) => a - b)

let previousSeatID = null
let mySeatID = 0

for (const seatID of sortedSeatIDS) {
  if (previousSeatID !== null && seatID !== previousSeatID + 1) {
    mySeatID = seatID - 1
  }
  previousSeatID = seatID
}

// 594
console.log("My Seat ID:", mySeatID)
