// OUTPUT ratings
import { data } from "./adapterArrayData.js"

console.log(data)

// STRATEGY
// three "objects":
// OUTLET 0 jolts
// ADAPTER
// DEVICE = highest rated ADAPTER + 3 jolts

// adapters have "output ratings" === puzzle input
// adapter can take input from other adaptors outputs
// adapter INPUT are 1,2,OR 3 lower than OUTPUT rating ( make a choice how ? )

// "If you use every adapter in your bag at once",
// "in a chain that uses all of the adapters",
// so we must do that, USE EVERY ADAPTER ONCE

// "However, in order to not skip any adapters"
// path finding problem ? AoC calls it a chain
// start of the path is the outlet, jolts out = 0

// need to capture number of jolt diffs = object ?

// DONT FORGET Device rating calc last.

// What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?

const DEVICE = Math.max(data.split("\n")) + 3

console.log(DEVICE)
