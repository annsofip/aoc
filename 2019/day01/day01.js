fs = require("fs");


function getPart1(input) {
    return input.reduce((sum, module) => sum + Math.floor(module / 3) - 2, 0);
}


function getPart2(input) {
    function calculateFuel(mass) {
        const fuel = Math.floor(mass / 3) - 2;
        if (fuel <= 0) {
            return 0;
        }
        return fuel + calculateFuel(fuel);
    }

    return input.map(Number).reduce((sum, module) => sum + calculateFuel(module), 0);

}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(/\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
