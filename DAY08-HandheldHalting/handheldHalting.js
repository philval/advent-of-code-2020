import { data } from "./handheldHaltingData.js"

function decode(str) {
  const [op, arg] = str.split(" ")
  return [op, Number(arg), false]
}

function handheld(data) {
  let instructions = data.split("\n").map((str) => decode(str))
  let pointer = 0
  let accumulator = 0

  function recurseInstruction([op, arg, executed]) {
    // part 1 BEFORE processing instruction
    if (executed === true) {
      return { result: "infinite loop", pnt: pointer, acc: accumulator } // exit
    }

    instructions[pointer][2] = true // instruction has executed

    if (op === "nop") {
      pointer += 1
    }
    if (op === "acc") {
      accumulator += arg
      pointer += 1
    }
    if (op === "jmp") {
      pointer += arg
    }

    // part 2 AFTER processing instruction
    if (pointer === instructions.length)
      return { result: "terminated", pnt: pointer, acc: accumulator } // exit

    return recurseInstruction(instructions[pointer])
  }
  return recurseInstruction(instructions[0]) // start
}

// { result: 'infinite loop', pnt: 469, acc: 1859 }
console.log("Day 8: Handheld Halting Part 1", handheld(data))

// PART TWO

// map over raw data
// returning arrays with one op changed
// string replace jmp to nop, OR nop to jmp
// run handheld...
// if the returned object is {result: terminated ...} then
// console.log the answer

const testData = `nop +1
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

// each returned array has one op flipped
function flip(data) {
  const flipped = data.split("\n").map((_, index, arr) => {
    const newArr = [...arr]
    let op = newArr[index]
    if (/^jmp/.test(op)) {
      op = op.replace("jmp", "nop")
    } else {
      if (/^nop/.test(op)) {
        op = op.replace("nop", "jmp")
      }
    }
    newArr[index] = op
    return newArr.join("\n")
  })
  return flipped
}

// { result: 'terminated', pnt: 683, acc: 1235 }
flip(data).forEach((data) => {
  if (handheld(data).result === "terminated") {
    console.log("Day 8: Handheld Halting Part 2", handheld(data))
  }
})

export { decode, handheld, flip }
