fs = require("fs");


function getBitCount(input) {
    return input.reduce((acc, value) => {
        return value.split("").map((c, i) => acc[i] + parseInt(c));
    }, new Array(input[0].length).fill(0));
}

function getMostCommon(bitCount, length) {
    return bitCount.map(val => val >= (length / 2) ? 1 : 0).join("");
}

function getLeastCommon(bitCount, length) {
    return bitCount.map(val => val >= (length / 2) ? 0 : 1).join("");
}

function getPart1(input) {
    const bitCount = getBitCount(input);
    const gammaRate = getMostCommon(bitCount, input.length);
    const epsilonRate = getLeastCommon(bitCount, input.length);

    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

function getPart2(input) {

    function getOxygenRating(input, index = 0) {
        const bitCount = getBitCount(input);
        const mostCommon = getMostCommon(bitCount, input.length);
        const filteredInput = input.filter(line => line[index] === mostCommon[index]);
        if (filteredInput.length === 1) {
            return filteredInput[0];
        }
        return getOxygenRating(filteredInput, ++index);
    }

    function getCo2ScrubberRating(input, index = 0) {
        const bitCount = getBitCount(input);
        const leastCommon = getLeastCommon(bitCount, input.length);
        const filteredInput = input.filter(line => line[index] === leastCommon[index]);
        if (filteredInput.length === 1) {
            return filteredInput[0];
        }
        return getCo2ScrubberRating(filteredInput, ++index);
    }

    const oxygenRating = getOxygenRating(input);
    const co2ScrubberRating = getCo2ScrubberRating(input);
    return parseInt(oxygenRating, 2) * parseInt(co2ScrubberRating, 2);
}


const input = fs.readFileSync("./input.txt").toString('utf-8');

let arr = input.split(/\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
