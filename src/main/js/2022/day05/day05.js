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
    let stacks = input[0].split('\n');
    let stackNumbers = stacks.splice(-1)[0];

    let moves = input[1];
    const stackDepth = stacks.length

    let crates = stacks.map((line, level) => {
        return [...line]
            .map((char, index) => {
                if (char.match(/[A-Z]/i))
                    return {
                        level: stackDepth - level,
                        crate: char,
                        stack: Number(stackNumbers[index]),
                        key: stackNumbers[index] + "," + (stackDepth - level),
                    };
            }).filter(x => x)
    }).flat();
    let numberOfStacks = crates.reduce((max, x) => {
        if (x.stack > max) {
            return x.stack;
        }
        return max;
    }, 0)

    let cratesMap = new Map();
    for (const crate of crates) {
        cratesMap.set(crate.key, crate.crate)
    }
    console.log(cratesMap)
    let [_, n, from, to] = moves.split("\n")[0].match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/);

    function move(cratesMap, from, to) {
        let crateToMove = Array.from(cratesMap).reduce((max, x) => {
            if (x.stack === Number(from) && x.level > max.level) {
                return x;
            }
            return max;
        }, {level: 0})

        let topLevelInTo = Array.from(cratesMap).reduce((max, x) => {
            if (x.stack === Number(to) && x.level > max) {
                return x.level;
            }
            return max;
        }, 0);
        cratesMap.delete(crateToMove.key)
        let levelTo = topLevelInTo + 1;
        let key = to + "," + levelTo;
        cratesMap.set(key, {
            level: levelTo,
            crate: crateToMove.crate,
            key, stack: to
        })
        return crates;
    }

    crates = move(crates, from, to)
}


function getPart2(input) {
    // return input;
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split("\n\n");
console.log("Part1:", getPart1(arr));
//console.log("Part2:", getPart2(arr));