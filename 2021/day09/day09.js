fs = require("fs");

const shouldLog = true;


function log(label) {
    if (shouldLog)
        console.log(label)
}


function getKey(x, y) {
    return [x, y].join(",");
}

function getPart1(input) {
    const lines = input.map(line => line.split("").map(Number));
    const mem = new Map();
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            const key = [x, y].join(",");
            mem.set(key, lines[y][x]);
        }
    }

    function getNeighbors([x, y]) {
        const neighbors = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
        return neighbors.map(n => mem.get(getKey(...n))).filter(v => v >= 0);
    }


    const lowPoints = [];
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            const key = getKey(x, y);
            const current = mem.get(key);
            const neighbors = getNeighbors([x, y]);
            if (neighbors.every(n => n > current)) {
                lowPoints.push(current);
            }
        }
    }


    return lowPoints.map(l => l + 1).reduce((sum, riskLevel) => sum + riskLevel, 0);
}


function getPart2(input) {
    const lines = input.map(line => line.split("").map(Number));
    const mem = new Map();
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            const key = [x, y].join(",");
            mem.set(key, lines[y][x]);
        }
    }

    function getNeighbors([x, y]) {
        const neighbors = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
        return neighbors.map(n => mem.get(getKey(...n))).filter(v => v >= 0);
    }


    const lowPoints = [];
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            const key = getKey(x, y);
            const current = mem.get(key);
            const neighbors = getNeighbors([x, y]);
            if (neighbors.every(n => n > current)) {
                lowPoints.push(current);
            }
        }
    }


    return lowPoints.map(l => l + 1).reduce((sum, riskLevel) => sum + riskLevel, 0);
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(/\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
