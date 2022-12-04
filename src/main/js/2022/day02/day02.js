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


function calculateGameScore(input, roundScore) {
    return input.map(row => ({elf: row.split(" ")[0], me: row.split(" ")[1]}))
        .reduce((score, round) => score + roundScore[round.elf][round.me], 0);
}

function getPart1(input) {
    let win = 6
    let draw = 3
    let lost = 0;
    let scores = {"rock": 1, "paper": 2, "scissors": 3}
    var roundScore = {
        "A": {"X": scores.rock + draw, "Y": scores.paper + win, "Z": scores.scissors + lost},
        "B": {"X": scores.rock + lost, "Y": scores.paper + draw, "Z": scores.scissors + win},
        "C": {"X": scores.rock + win, "Y": scores.paper + lost, "Z": scores.scissors + draw}
    };
    return calculateGameScore(input, roundScore);

}


function getPart2(input) {
    let win = 6
    let draw = 3
    let lost = 0;
    let scores = {"rock": 1, "paper": 2, "scissors": 3}
    let roundScore = {
        "A": {"X": scores.scissors + lost, "Y": scores.rock + draw, "Z": scores.paper + win},
        "B": {"X": scores.rock + lost, "Y": scores.paper + draw, "Z": scores.scissors + win},
        "C": {"X": scores.paper + lost, "Y": scores.scissors + draw, "Z": scores.rock + win}
    };
    return calculateGameScore(input, roundScore);
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split("\n");
console.log("Part1:", getPart1(arr));
console.log("Part2:", getPart2(arr));