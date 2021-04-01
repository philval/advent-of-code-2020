import { data } from "./reportRepairData.js"

const parsedData = data.split("\n").map((d) => Number.parseInt(d, 10))

function find2020(expenses) {
  for (let i = 0; i < expenses.length; i++) {
    for (let j = 0; j < expenses.length; j++) {
      const sum = expenses[i] + expenses[j]
      const product = expenses[i] * expenses[j]
      if (sum === 2020) {
        return product
      }
    }
  }
  return "not found"
}

// 935419
console.log(find2020(parsedData))
