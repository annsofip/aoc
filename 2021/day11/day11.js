fs = require("fs");

const shouldLog = false;


function log(label) {
    if (shouldLog)
        console.log(label)
}


function printBoard(octopuses) {
    return log(octopuses.map(o => o.join("")).join("\n"));
}

function getPart1(input) {
    function flash([x, y], octopuses) {
        if (octopuses[y][x] === 10) return;

        octopuses[y][x] += 1;

        if (octopuses[y][x] > 9) {

            const neighbors = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1], [x + 1, y - 1],
                [x + 1, y + 1], [x - 1, y - 1], [x - 1, y + 1]];

            for (const neighbor of neighbors) {
                if (neighbor[0] >= 0 && neighbor[0] < input[y].length &&
                    neighbor[1] >= 0 && neighbor[1] < input.length) {
                    flash(neighbor, octopuses);
                }
            }
        }
    }

    const octopuses = input.map(line => line.split("").map(Number));
    log(`Before any steps:`)
    printBoard(octopuses);
    let flashes = 0;
    for (let s = 0; s < 100; s++) {
        log("");
        for (let i = 0; i < octopuses.length; i++) {
            for (let j = 0; j < octopuses[i].length; j++) {
                flash([j, i], octopuses);
            }
        }

        for (let y = 0; y < octopuses.length; y++) {
            for (let x = 0; x < octopuses[y].length; x++) {
                if (octopuses[y][x] === 10) {
                    octopuses[y][x] = 0;
                    flashes++;
                }
            }
        }
        log(`After step ${s + 1}: `)
        printBoard(octopuses);
        log(`Number of flashes: ${flashes}`)
    }
    return flashes;
}


function getPart2(input) {
    function allFlashes(octopuses) {
        return octopuses.every(row => row.every(o => o === 10));
    }

    function flash([x, y], octopuses) {
        if (octopuses[y][x] === 10) return;

        octopuses[y][x] += 1;

        if (octopuses[y][x] > 9) {

            const neighbors = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1], [x + 1, y - 1],
                [x + 1, y + 1], [x - 1, y - 1], [x - 1, y + 1]];

            for (const neighbor of neighbors) {
                if (neighbor[0] >= 0 && neighbor[0] < input[y].length &&
                    neighbor[1] >= 0 && neighbor[1] < input.length) {
                    flash(neighbor, octopuses);
                }

            }
        }
    }

    const octopuses = input.map(line => line.split("").map(Number));
    log(`Before any steps:`)
    printBoard(octopuses);
    let flashes = 0;
    for (let s = 0; s < 10000; s++) {
        log("");
        for (let i = 0; i < octopuses.length; i++) {
            for (let j = 0; j < octopuses[i].length; j++) {
                flash([j, i], octopuses);
            }
        }
        if (allFlashes(octopuses)) {
            log(`all flashed at step ${s + 1}: `)
            printBoard(octopuses);
            return s + 1;
        }
        for (let y = 0; y < octopuses.length; y++) {
            for (let x = 0; x < octopuses[y].length; x++) {
                if (octopuses[y][x] === 10) {
                    octopuses[y][x] = 0;
                    flashes++;
                }
            }
        }
        log(`After step ${s + 1}: `)
        printBoard(octopuses);
        log(`Number of flashes: ${flashes}`)
    }
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(/\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));

