fs = require("fs");


function getPart1(input) {
    const lines = input.map(row => {
        const [_, x1, y1, x2, y2] = row.match(/([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)/);
        return {
            x1: parseInt(x1), y1: parseInt(y1), x2: parseInt(x2), y2: parseInt(y2)
        };
    }).filter(line => (line.x1 === line.x2 || line.y1 === line.y2))
        .map(line => ({
            x1: Math.min(line.x1, line.x2), x2: Math.max(line.x1, line.x2),
            y1: Math.min(line.y1, line.y2), y2: Math.max(line.y1, line.y2)
        }));

    var space = Array(1000).fill(null).map(() => Array(1000).fill(0));


    for (const line of lines) {
        for (let y = line.y1; y <= line.y2; y++) {
            for (let x = line.x1; x <= line.x2; x++) {
                space[y][x] = space[y][x] + 1;
            }
        }

    }


    //  console.log(space.reduce((string, row) => string + row.reduce((acc, cell) => acc + (cell === 0 ? "." : cell), "\n"), ""))

    return space.reduce((string, row) => string + row.reduce((acc, cell) => acc + (cell >= 2 ? 1 : 0), 0), 0)

}


function getPart2(input) {
    const lines = input.map(row => {
        const [_, x1, y1, x2, y2] = row.match(/([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)/);
        return {
            x1: parseInt(x1), y1: parseInt(y1), x2: parseInt(x2), y2: parseInt(y2)
        };
    });

    var space = Array(10).fill(null).map(() => Array(10).fill(0));


    for (const line of lines) {
        if (line.x1 === line.x2 && line.y1 < line.y2) {
            for (let y = line.y1; y <= line.y2; y++) {
                space[y][line.x1] = space[y][line.x1] + 1;
            }
        }
        if (line.x1 === line.x2 && line.y1 > line.y2) {
            for (let y = line.y2; y <= line.y1; y--) {
                space[y][line.x1] = space[y][line.x1] + 1;
            }
        }
        if (line.y1 === line.y2 && line.x1 < line.x2) {
            for (let x = line.x1; x <= line.x2; x++) {
                space[line.y1][x] = space[line.y1][x] + 1;
            }
        }
        if (line.y1 === line.y2 && line.x1 > line.x2) {
            for (let x = line.x2; x <= line.x1; x--) {
                space[line.y1][x] = space[line.y1][x] + 1;
            }
        }

        if (line.x1 === line.y2 || line.x2 === line.y1) {
            var x = line.x1;
            var y = line.y1;
            while (true) {
                space[y][x] = space[y][x] + 1;
                if (x === line.x2 && y === line.y2) {
                    break;
                }
                x++;
                y++;
            }//TODO decrease
        }
        if (line.x1 === line.x2 && line.y1 === line.y2) {
            var x = line.x1;
            var y = line.y1;
            while (true) {
                space[y][x] = space[y][x] + 1;
                if (x === line.x2 && y === line.y2) {
                    break;
                }
                x++;
                y++;
            }
        }


    }


    console.log(space.reduce((string, row) => string + row.reduce((acc, cell) => acc + (cell === 0 ? "." : cell), "\n"), ""))

    return space.reduce((string, row) => string + row.reduce((acc, cell) => acc + (cell >= 2 ? 1 : 0), 0), 0)

}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(/\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
