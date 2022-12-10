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

    for (let i = 0; i < input.length - 3; i++) {
        let set = new Set();
        for (let j = 0; j < 4; j++) {
            set.add(input[i + j]);
        }

        if (set.size === 4) {
            return i + 4;
        }
    }
}


function getPart2(input) {
    for (let i = 0; i < input.length - 13; i++) {
        let set = new Set();
        for (let j = 0; j < 14; j++) {
            set.add(input[i + j]);
        }

        if (set.size === 14) {
            return i + 14;
        }
    }
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input;
console.log("Part1:", getPart1("mjqjpqmgbljsphdztnvjfqwrcgsmlb"));
console.log("Part1:", getPart1("bvwbjplbgvbhsrlpgdmjqwftvncz"));
console.log("Part1:", getPart1("nppdvjthqldpwncqszvftbrmjlhg"));
console.log("Part1:", getPart1("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"));
console.log("Part1:", getPart1("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"));
console.log("Part1:", getPart1(arr));
console.log("Part2:", getPart2("mjqjpqmgbljsphdztnvjfqwrcgsmlb"));
console.log("Part2:", getPart2("bvwbjplbgvbhsrlpgdmjqwftvncz"));
console.log("Part2:", getPart2("nppdvjthqldpwncqszvftbrmjlhg"));
console.log("Part2:", getPart2("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"));
console.log("Part2:", getPart2("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"));
console.log("Part2:", getPart2(arr));