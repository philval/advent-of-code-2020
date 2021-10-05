import { data } from "./encodingErrorData.js"

// STRATEGY PART ONE
// loop over data to capture i) preamble data ii) "next number" to validate against XMAS cypher
// loop over preamble data, eliminate duplicates, generate all possible sums of any two numbers
// test nextNumber againt all possible sums of any two numbers, break if not found & log answer
// beware off-by-one errors

const parsedData = data.split("\n").map((n) => Number.parseInt(n, 10))

const preambleLength = 25

for (
  let start = 0, end = start + preambleLength;
  start < parsedData.length - preambleLength;
  start++, end++
) {
  const preambleData = [...parsedData.slice(start, end)]
  const nextNumber = parsedData[end]

  let sumAnyTwoNumbers = []

  // generate Array of all possible totals of 2 numbers
  for (const num1 of preambleData) {
    for (const num2 of preambleData) {
      // no duplicates
      if (num1 !== num2) {
        sumAnyTwoNumbers.push(num1 + num2)
      }
    }
  }

  // does sums of any two numbers include next number ?
  if (sumAnyTwoNumbers.some((num) => num === nextNumber)) {
    continue
  } else {
    // 133015568
    console.log("Day 9: Encoding Error Part 1", nextNumber)
    break
  }
}

// STRATEGY PART TWO
// loop over all data, get contigiousSet
// if sum of contigiousSet = magic number
// then discard sets < length === 2
// then add lowest number + highest number of contigiousSet
// log answer
// break

for (let start = 0; start < parsedData.length; start++) {
  for (let end = start; end < parsedData.length; end++) {
    let contigiousSet = []
    let contigiousSum = 0

    contigiousSet = parsedData.slice(start, end)

    // at least 2 numbers, calc sum
    if (contigiousSet.length > 1) {
      contigiousSum = contigiousSet.reduce((acc, total) => acc + total)
    }
    // magic number from Part 1
    if (contigiousSum === 133015568) {
      // 16107959
      console.log(
        "Day 9: Encoding Error Part 2",
        Math.min(...contigiousSet) + Math.max(...contigiousSet)
      )
      break
    }
  }
}
