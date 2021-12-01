fs = require("fs");


function getPart1(input) {
    return input.map((value) => {
        return parseInt(value);
    }).reduce((acc, value) => {
        return {
            inc: acc.inc + (value > acc.prev ? 1 : 0),
            prev: value
        };
    }, {inc: -1, prev: 0}).inc;
}

function getPart2(input) {
    return input.map((value, i) => {
        return i < input.length - 2 ? parseInt(value) + parseInt(input[i + 1]) + parseInt(input[i + 2]) : 0;
    }).reduce((acc, value) => {
        return {
            inc: acc.inc + (value > acc.prev ? 1 : 0),
            prev: value
        };
    }, {inc: -1, prev: 0}).inc;
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(/\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
