import { data } from "./passwordPhilosophyData.js"

// 4-6 b: bbbdbtbbbj
const parseRow = (d) => {
  const min = /^\d{1,}/
  const max = /\d{1,}\s/
  const letter = /[a-z]:/
  const password = /[a-z]{1,}$/

  const policy = {
    min: d.match(min)[0],
    max: d.match(max)[0],
    letter: d.match(letter)[0][0],
    password: d.match(password)[0],
  }

  return policy
}

const parsedData = data.split("\n").map((row) => parseRow(row))

const isValidPassword = (policy) => {
  const lettersCount = policy.password
    .split("")
    .filter((letter) => letter === policy.letter).length
  return lettersCount >= policy.min && lettersCount <= policy.max
}

const countValidPasswords = (passwords) => {
  return passwords
    .map((password) => isValidPassword(password))
    .filter((bool) => bool === true).length
}

// 454
console.log(countValidPasswords(parsedData))
