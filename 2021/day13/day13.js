fs = require("fs");

const shouldLog = false;


function log(label, forcePrint = false) {
    if (forcePrint || shouldLog)
        console.log(label)
}

function getKey(x, y) {
    return [x, y].join(",");
}

function printBoard(maxY, maxX, mem, forcePrint = false) {
    let line = ""
    for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x <= maxX; x++) {
            const key = getKey(x, y);
            line = line.concat(mem.get(key) ? mem.get(key) : ".");
        }
        line = line.concat("\n");
    }
    log(line, forcePrint);
}

function getPart1And2(input) {
    const folds = input
        .filter(line => line.includes("fold along"))
        .map(line => line.split("fold along ")[1]);

    const dots = input.filter(line => !line.includes("fold along") && line).map(line => [line, '#']);
    let maxX = input.reduce((max, i) => i.split(",").map(Number)[0] > max ? i.split(",").map(Number)[0] : max, 0);
    let maxY = input.reduce((max, i) => i.split(",").map(Number)[1] > max ? i.split(",").map(Number)[1] : max, 0);
    const mem = new Map(dots);
    printBoard(maxY, maxX, mem);

    for (const [index, fold] of folds.entries()) {
        const [axis, foldValue] = fold.split("=");
        log("Fold along " + fold);

        for (let y = 0; y <= maxY; y++) {
            for (let x = 0; x <= maxX; x++) {
                const key = getKey(x, y);
                const value = mem.get(key);
                if (axis === "y" && y > foldValue && value) {
                    const newY = foldValue - (y - foldValue);
                    mem.set(getKey(x, newY), value);
                    mem.delete(key);
                } else if (axis === "x" && x > foldValue && value) {
                    const newX = foldValue - (x - foldValue);
                    mem.set(getKey(newX, y), value);
                    mem.delete(key);
                }
            }
        }

        maxX = axis === "x" ? maxX - foldValue - 1 : maxX;
        maxY = axis === "y" ? maxY - foldValue - 1 : maxY;
        if (index === 0) {
            console.log(`Part1 : ${mem.size}`)
        }
        printBoard(maxY, maxX, mem);
    }
    log("Part 2 :", true);
    printBoard(maxY, maxX, mem, true);
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(/\n/);
getPart1And2(arr);

