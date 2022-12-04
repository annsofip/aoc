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

function getPriority(char) {
    if (char === char.toUpperCase()) {
        return char.charCodeAt(0) - 38
    }
    return char.charCodeAt(0) - 96;
}

function getIntersection(com1, comp2) {
    return Array.from((com1))
        .filter((item) => JSON.stringify(Array.from((comp2)))
            .includes(JSON.stringify(item)));
}

function getPart1(input) {
    return input.map(rucksack => {

        let length = rucksack.length;
        let com1 = new Set(rucksack.substring(0, length / 2));
        let comp2 = new Set(rucksack.substring(length / 2));

        const intersection = getIntersection(com1, comp2)[0];

        return {
            com1,
            comp2,
            intersection,
            priority: getPriority(intersection)
        }
    }).map(rug => rug.priority).summed();

}


function getPart2(input) {
    return input.chunk(3).map(group => {

        let ruck1 = group[0];
        let ruck2 = group[1];
        let ruck3 = group[2];

        const intersection = getIntersection(new Set(getIntersection(ruck1, ruck2)), ruck3)[0]
        console.log({     ruck1,
            ruck2,
            ruck3, intersection})
        return {
            intersection,
            priority: getPriority(intersection)
        }
    }).map(group => group.priority).summed();
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split("\n");
console.log("Part1:", getPart1(arr));
console.log("Part2:", getPart2(arr));