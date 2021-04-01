import { data } from "./passwordPhilosophyData.js"

// 4-6 b: bbbdbtbbbj
const parseRow = (d) => {
  const pos1 = /^\d{1,}/
  const pos2 = /\d{1,}\s/
  const letter = /[a-z]:/
  const password = /[a-z]{1,}$/

  const policy = {
    pos1: d.match(pos1)[0],
    pos2: d.match(pos2)[0],
    letter: d.match(letter)[0][0],
    password: d.match(password)[0],
  }

  return policy
}

const parsedData = data.split("\n").map((row) => parseRow(row))

const isValidPassword = (policy) => {
  const letters = policy.password.split("")
  const isValidPos1 = letters[policy.pos1 - 1] === policy.letter
  const isValidPos2 = letters[policy.pos2 - 1] === policy.letter
  // only one must be true
  return (isValidPos1 && !isValidPos2) || (!isValidPos1 && isValidPos2)
}

const countValidPasswords = (passwords) => {
  return passwords
    .map((password) => isValidPassword(password))
    .filter((bool) => bool === true).length
}

// 649
console.log(countValidPasswords(parsedData))
