// STRATEGY PART ONE

// three "objects":
// OUTLET 0 jolts
// ADAPTERS
// DEVICE = highest rated ADAPTER + 3 jolts

// adapters have "output ratings" === puzzle input
// adapters can take input from other adaptors outputs
// adapters INPUT are 1,2,OR 3 lower than OUTPUT rating ( make a choice how ? )

// "If you use every adapter in your bag at once",
// "in a chain that uses all of the adapters",
// so we must do that, USE EVERY ADAPTER ONCE, a hint...

// need to always pick lowest rating for next adapter when there are several adapters
// insight is to sort the adapters!
// then calc diff versus previous adapter ( 1 or 3 ) and count diffs

// dont forget DEVICE rating calc last.

// FINALLY What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?

import { data } from "./adapterArrayData.js"

const parsedData = data.split("\n").map((n) => Number.parseInt(n, 10))

const outletRating = 0

const deviceRating = Math.max(...parsedData) + 3

const chain = parsedData.sort((a, b) => a - b)

chain.unshift(outletRating)

chain.push(deviceRating)

// accumulators
let diff1 = 0
let diff3 = 0

for (let i = 0; i < chain.length; i++) {
  if (chain[i + 1] - chain[i] === 1) diff1++
  if (chain[i + 1] - chain[i] === 3) diff3++
}

// 1690
console.log("Day 10: Adapter Array Part 1 ", diff1 * diff3)

// STRATEGY PART TWO

// need calculate all valid PATHS through the chain
// do NOT need to use all Adaptors...
// do need to "follow" the rules

// there is a chain where we always pick the next lowest rated adaptor i.e. longest chain
// there is a chain where we always pick the next highest rated adaptor i.e. shortest chain
// and all the combinations in between

// hint "there must be an efficient way to count the arrangements."
// example answer is 19208 ... it compounds ( not additive )

// insight: for each adapter, how many new paths are possible... 2 or 3

/*
example given:
chain | paths

0
1   
4   3 // six possible paths
5   2 // two possible paths - is this double counting ?
6
7   
10  2 // two possible paths
11  
12
15
16
19
22

total 8 paths

*/
