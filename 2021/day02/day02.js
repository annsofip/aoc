fs = require("fs");


function getPart1(input) {
    var result = input.reduce((acc, value) => {
        const [direction, distance] = value.split(" ");
        if (direction === 'forward') {
            return {horizontal: acc.horizontal + parseInt(distance), depth: acc.depth}
        }
        if (direction === 'down') {
            return {horizontal: acc.horizontal, depth: acc.depth + parseInt(distance)}
        }
        if (direction === 'up') {
            return {horizontal: acc.horizontal, depth: acc.depth - parseInt(distance)}
        }
    }, {horizontal: 0, depth: 0});

    return result.horizontal * result.depth;
}

function getPart2(input) {
    var result = input.reduce((acc, value) => {
        const [direction, distance] = value.split(" ");
        if (direction === 'forward') {
            return {horizontal: acc.horizontal + parseInt(distance),  aim: acc.aim, depth: acc.depth + acc.aim * parseInt(distance)}
        }
        if (direction === 'down') {
            return {horizontal: acc.horizontal, aim: acc.aim + parseInt(distance), depth: acc.depth}
        }
        if (direction === 'up') {
            return {horizontal: acc.horizontal, aim: acc.aim - parseInt(distance), depth: acc.depth}
        }
    }, {horizontal: 0, depth: 0, aim: 0});
    return result.horizontal * result.depth;
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(/\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
