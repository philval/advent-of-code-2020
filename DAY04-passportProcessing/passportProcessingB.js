import { data } from "./passportProcessingData.js"

// target data structure is an Array of Objects eg:
const examplePassport = [
  {
    pid: "087499704",
    hgt: "74in",
    ecl: "grn",
    iyr: "2012",
    eyr: "2030",
    byr: "1920",
    hcl: "#623a2f",
  },
]

const parseData = (data) => {
  const reg = /\n/g
  return data
    .split("\n\n")
    .map((d) => d.replace(reg, " "))
    .map((d) => Object.fromEntries(d.split(" ").map((e) => e.split(":"))))
}

const passports = parseData(data)

// "cid" is optional so exclude from tests
const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

const passportsAllFields = passports.filter(
  (passport) =>
    Object.keys(passport)
      .filter((key) => key !== "cid")
      .sort()
      .toString() === required.sort().toString()
)

// 208 as per Part A
console.log("All passport fields present:", passportsAllFields.length)

// =============== PART B ================== //

// a collection of functions
const tests = {
  // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  byr: (data) => Number.isInteger(+data) && data >= 1920 && data <= 2002,

  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  iyr: (data) => Number.isInteger(+data) && data >= 2010 && data <= 2020,

  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  eyr: (data) => Number.isInteger(+data) && data >= 2020 && data <= 2030,

  // hgt (Height) - a number followed by either cm or in:
  hgt: (data) => {
    const units = data.slice(-2)
    const value = data.slice(0, data.length - 2)
    // If in, the number must be at least 59 and at most 76.
    if (units === "in") {
      return value >= 59 && value <= 76
    }
    // If cm, the number must be at least 150 and at most 193.
    else if (units === "cm") {
      return value >= 150 && value <= 193
    } else return false
  },

  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  // assume all lowercase
  hcl: (data) => /^#[0-9a-f]{6}$/.test(data),

  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  ecl: (data) =>
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(data),
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  pid: (data) => data.length === 9 && Number.isInteger(+data),

  // "cid" is optional always returns true
  cid: (data) => true,
}

const passportsAllFieldsAllValid = passportsAllFields.filter((passport) => {
  const fields = Object.keys(passport)
  const valid = fields.map((property) => tests[property](passport[property]))
  return valid.every((test) => test === true) // filter all true
})

// 167
console.log(
  "All passport fields present and valid:",
  passportsAllFieldsAllValid.length
)
