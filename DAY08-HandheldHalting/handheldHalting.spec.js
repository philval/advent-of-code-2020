import { decode, handheld, flip } from "./handheldHalting.js"

// ==== PART 1 ====
describe("handheldHalting Part 1", () => {
  test("decodes single instruction", () => {
    expect(decode(`nop +1`)).toStrictEqual(["nop", 1, false])
    expect(decode(`jmp -3`)).toStrictEqual(["jmp", -3, false])
  })

  test("decodes list of instructions", () => {
    const data = `nop +1
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

    const instructions = data.split("\n").map((str) => decode(str))

    const result = [
      ["nop", 1, false],
      ["acc", 1, false],
      ["jmp", 4, false],
      ["acc", 3, false],
      ["jmp", -3, false],
      ["acc", -99, false],
      ["acc", 1, false],
      ["jmp", -4, false],
      ["acc", 6, false],
    ]

    expect(instructions).toStrictEqual(result)
  })

  test("infinite loop tiny", () => {
    const data = "jmp +0"

    const result = {
      result: "infinite loop",
      pnt: 0,
      acc: 0,
    }

    expect(handheld(data)).toStrictEqual(result)
  })

  test("infinite loop small", () => {
    const data = "nop +0\njmp -1"

    const result = {
      result: "infinite loop",
      pnt: 0,
      acc: 0,
    }

    expect(handheld(data)).toStrictEqual(result)
  })

  test("infinite loop accumulate", () => {
    const data = "acc +40\nacc +1\nacc +1\njmp -1"

    const result = {
      result: "infinite loop",
      pnt: 2,
      acc: 42,
    }

    expect(handheld(data)).toStrictEqual(result)
  })

  test("infinite loop jump", () => {
    const data = `jmp +3
acc 42
jmp -2
jmp -2`

    const result = {
      result: "infinite loop",
      pnt: 0,
      acc: 42,
    }

    expect(handheld(data)).toStrictEqual(result)
  })

  test("infinite loop testData", () => {
    const data = `nop +1
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

    const result = {
      result: "infinite loop",
      pnt: 1,
      acc: 5,
    }

    expect(handheld(data)).toStrictEqual(result)
  })
})

// ==== PART  2 ====
describe("handheldHalting Part 2", () => {
  test("terminates tiny", () => {
    const data = "nop +0"

    const result = {
      result: "terminated",
      pnt: 1,
      acc: 0,
    }

    expect(handheld(data)).toStrictEqual(result)
  })

  test("terminates small", () => {
    const data = `acc +42
jmp +2
nop +0`

    const result = {
      result: "terminated",
      pnt: 3,
      acc: 42,
    }

    expect(handheld(data)).toStrictEqual(result)
  })

  test("terminates testData", () => {
    // jmp -4 changed to nop-4
    const data = `nop +1
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
nop -4
acc +6`

    const result = {
      result: "terminated",
      pnt: 9,
      acc: 8,
    }

    expect(handheld(data)).toStrictEqual(result)
  })

  test("flips a single op correctly", () => {
    expect(flip("jmp +1")).toEqual(["nop +1"])
    expect(flip("nop +1")).toEqual(["jmp +1"])
    expect(flip("acc +42")).toEqual(["acc +42"])
  })

  test("flips two ops correctly", () => {
    expect(flip("jmp +1\nacc +2")).toEqual(["nop +1\nacc +2", "jmp +1\nacc +2"])
    expect(flip("nop +1\njmp +2")).toEqual(["jmp +1\njmp +2", "nop +1\nnop +2"])
    expect(flip("acc +1\nacc +2")).toEqual(["acc +1\nacc +2", "acc +1\nacc +2"])
  })
})
