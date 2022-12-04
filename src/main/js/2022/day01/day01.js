fs = require("fs");

Array.prototype.summed = function () {
    return this.reduce(function (i, acc) {
        return acc + i;
    });
};
Array.prototype.sortDec = Array.prototype.sum = function () {
    return this.sort(function (a, b) {
        return b - a;
    });
}

Array.prototype.sortAsc = Array.prototype.sum = function () {
    return this.sort(function (a, b) {
        return a - b;
    });
}


function getPart1(elves) {
    return elves
        .map(elf => elf.split("\n").map(Number).summed())
        .sortDec()
        .slice(0, 1)
        .summed()
}

function getPart2(elves) {
    return elves
        .map(elf => elf.split("\n").map(Number).summed())
        .sortDec()
        .slice(0, 3)
        .summed()
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split("\n\n");
console.log("Part1:", getPart1(arr));
console.log("Part2:", getPart2(arr));