fs = require("fs");


function getPart1(input) {
    return input.replace(/\n/g, "")
        .split('')
        .reduce((acc, value) => {
            return acc + (value === '(' ? 1 : -1)
        }, 0);
}

function getPart2(input) {
    return input.replace(/\n/g, "")
        .split('')
        .map((value) => {
            return (value === '(' ? 1 : -1)
        }).reduce((acc, value, index) => {

            acc.count += value;
            if (acc.count === -1 && acc.basementIndex === 0) {
                acc.basementIndex = index + 1;
            }
            return acc;
        }, {
            count: 0,
            basementIndex: 0
        }).basementIndex;
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input;
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
