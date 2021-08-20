import { data } from "./passportProcessingData.js"

// target data structure is an Array of Strings eg:
const examplePassport = [
  "iyr:2013 hcl:#ceb3a1 hgt:151cm eyr:2030 byr:1943 ecl:grn",
]

const parseData = (data) => {
  const reg = /\n/g
  return data.split("\n\n").map((d) => d.replace(reg, " "))
}

const passports = parseData(data)

// excludes "cid"
const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

const passportsAllFields = passports
  // does passport String include all fields ?
  .map((passport) => fields.map((field) => passport.includes(`${field}:`)))
  // results do not include false
  .filter((results) => !results.includes(false))

// 208
console.log("All passport fields present:", passportsAllFields.length)
