fs = require("fs");

const shouldLog = false;


function log(label, list, endLabel = "") {
    if (shouldLog)
        console.log(label + list.join(",") + endLabel)
}

function n(n) {
    return n > 9 ? "" + n : " " + n;
}

function getPart1(input) {
    var lanternFish = input.map(n => parseInt(n));
    log("Initial state: ", lanternFish);
    for (let i = 0; i < 80; i++) {
        var newLanternFish = [];
        for (let j = 0; j < lanternFish.length; j++) {
            if (lanternFish[j] === 0) {
                newLanternFish.push(8);
                lanternFish[j] = 6;
            } else {
                lanternFish[j] = --lanternFish[j];
            }
        }
        lanternFish = lanternFish.concat(newLanternFish);
        log(`After ${n(i + 1)} days: `, lanternFish, ` new: ${newLanternFish.length}`)
    }
    return lanternFish.length;
}


function getPart2(input) {
    var lanternFish = input.map(n => parseInt(n))
        .reduce((a, n) => {
            a[n] = ++a[n];
            return a;
        }, new Array(9).fill(0)); // count number of fish of each age
    log("Initial state: ", lanternFish);
    for (let i = 0; i < 256; i++) {
        const numberOfNewFish = lanternFish.shift(); // age all by shifting array and find number of new fish
        lanternFish[6] += numberOfNewFish; // the mothers start at 6
        lanternFish[8] = numberOfNewFish; //add the new children
        log(`After ${n(i + 1)} days: `, lanternFish, ` new: ${numberOfNewFish}`)
    }
    return lanternFish.reduce((a, i) => a + i, 0);
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(",");
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
