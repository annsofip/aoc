fs = require("fs");


function getPart1(input) {
    return input.map((value) => {
        let dimensions = value.split('x')
            .map((dimension) => (parseInt(dimension)));
        return dimensions;
    }).reduce((acc, dimensions) => {

        let sides = [
            (dimensions[0] * dimensions[1]),
            (dimensions[1] * dimensions[2]),
            (dimensions[2] * dimensions[0])
        ];
        let total = 2 * sides[0] + 2 * sides[1] + 2 * sides[2] + Math.min(...sides);
        return acc + total;
    }, 0);
}

function getPart2(input) {
    return input.map((value) => {
        let dimensions = value.split('x')
            .map((dimension) => (parseInt(dimension)));
        return dimensions;
    }).reduce((acc, dimensions) => {

        dimensions.sort((a, b) => (a - b));

        let total = dimensions[0] + dimensions[0] +
            dimensions[1] + dimensions[1] +
            dimensions[0] * dimensions[1] * dimensions[2];
        return acc + total;
    }, 0);
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(/\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
