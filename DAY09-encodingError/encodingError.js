import { data } from "./encodingErrorData.js"

// STRATEGY
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
