fs = require("fs");


function countMoreThanTwo(mem) {
    return [...mem.entries()].reduce((sum, [_, n]) => sum + (n >= 2 ? 1 : 0), 0);
}



function addPoint(current, mem) {
    const key = [current.x, current.y].join(",");
    let count = mem.get(key);
    if (!count) {
        count = 0;
    }
    count++;
    mem.set(key, count);
}

function addPoints(lines) {
    const mem = new Map();
    for (const line of lines) {
        var current = {x: line.x1, y: line.y1};
        const isHorizontal = line.y1 === line.y2;
        const isVertical = line.x1 === line.x2;
        while (current.x !== line.x2 || current.y !== line.y2) {
            addPoint(current, mem);

            if (isHorizontal) {
                current.x += (current.x < line.x2) ? 1 : -1;
            } else if (isVertical) {
                current.y += (current.y < line.y2) ? 1 : -1;
            } else {
                current.x += (current.x < line.x2) ? 1 : -1;
                current.y += (current.y < line.y2) ? 1 : -1;
            }
        }
        addPoint({x: line.x2, y: line.y2}, mem);
    }
    return mem;
}

function getPart1(input) {
    const lines = input.map(row => {
        const [_, x1, y1, x2, y2] = row.match(/([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)/)
            .map(Number);
        return {
            x1, y1,
            x2, y2
        };
    }).filter(line => (line.x1 === line.x2 || line.y1 === line.y2));

    const mem = addPoints(lines);
    return countMoreThanTwo(mem);

}


function getPart2(input) {
    const lines = input.map(row => {
        const [_, x1, y1, x2, y2] = row.match(/([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)/)
            .map(Number);
        return {
            x1, y1,
            x2, y2
        };
    });
    const mem = addPoints(lines);
    return countMoreThanTwo(mem);
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(/\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
