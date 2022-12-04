fs = require("fs");

const shouldLog = false;


function log(label) {
    if (shouldLog)
        console.log(label)
}

function getPart1(input) {
    var positions = input.map(Number);
    return Array(Math.max(...positions)).fill(1).reduce((smallest, _, goal) => {
        const fuel = positions.reduce((cost, pos) => cost + Math.abs(pos - goal), 0);
        log({smallest, goal, fuel})
        return Math.min(smallest, fuel);
    }, Number.MAX_SAFE_INTEGER);
}


function getPart2(input) {
    function fuelCost(n) {
        return (n * (n + 1)) / 2;
    }

    const positions = input.map(Number);
    return Array(Math.max(...positions)).fill(1).reduce((smallest, _, goal) => {
        const fuel = positions.reduce((cost, pos) => cost + fuelCost(Math.abs(pos - goal)), 0);
        log({smallest, goal, fuel})
        return Math.min(smallest, fuel);
    }, Number.MAX_SAFE_INTEGER);
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(",");
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
