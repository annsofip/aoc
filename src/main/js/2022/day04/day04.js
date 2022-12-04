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
Array.range = function (n) {
    // Array.range(5) --> [0,1,2,3,4]
    return Array.apply(null, Array(n)).map((x, i) => i)
};

Object.defineProperty(Array.prototype, 'chunk', {
    value: function (n) {

        // ACTUAL CODE FOR CHUNKING ARRAY:
        return Array.range(Math.ceil(this.length / n)).map((x, i) => this.slice(i * n, i * n + n));

    }
});


function getPart1(input) {
    return input.filter(line => {
        let [elf1, elf2] = line.split(",")
            .map(range => range.split("-").map(Number))
            .map(range => ({min: range[0], max: range[1]}));
        if (elf1.min >= elf2.min && elf1.max <= elf2.max ||
            elf1.min <= elf2.min && elf1.max >= elf2.max) {
            return true
        }
    }).length

}


function getPart2(input) {
    return input.filter(line => {
        let [elf1, elf2] = line.split(",")
            .map(range => range.split("-").map(Number))
            .map(range => ({min: range[0], max: range[1]}));
        return !((elf1.min < elf2.min && elf1.max < elf2.min) ||
            (elf2.min < elf1.min && elf2.max < elf1.min));
    }).length
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split("\n");
console.log("Part1:", getPart1(arr));
console.log("Part2:", getPart2(arr));