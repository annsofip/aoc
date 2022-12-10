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
let moves = {
    U: {
        x: 0, y: 1
    }, D: {
        x: 0, y: -1
    }, L: {
        x: -1, y: 0
    }, R: {
        x: 1, y: 0
    },
}

function moveTail(h, t) {
    const distance = Math.max(Math.abs(h.x - t.x), Math.abs(h.y - t.y));
    let moveX = 0;
    let moveY = 0;
    if (distance > 1) {
        moveX = h.x - t.x;
        moveY = h.y - t.y;
    }
    t.x += (Math.abs(moveX) === 2 ? moveX / 2 : moveX);
    t.y += (Math.abs(moveY) === 2 ? moveY / 2 : moveY);
    return t;
}

function moveHead(h, instruction) {
    return {
        x: h.x + moves[instruction.move].x, y: h.y + moves[instruction.move].y
    };
}

function getPart1(input) {

    let visited = new Map();
    let headMap = new Map();
    let instructions = input.map(line => {
        let [move, length] = line.split(" ");
        return {move, length: Number(length)}
    })
    // Set start for H
    let key = "0,0"
    visited.set(key, "V")
    headMap.set(key, "H")

    let head = {x: 0, y: 0};
    let tail = {x: 0, y: 0}

    instructions.forEach(instruction => {
        for (let i = 0; i < instruction.length; i++) {
            head = moveHead(head, instruction)
           // console.log("head: ", head)
            tail = moveTail(head, tail);
           // console.log("tail: ", tail)
            visited.set(tail.x + "," + tail.y, "V")
            headMap.set(head.x + "," + head.y, "H")
        }
        //console.log(instruction)
       // printVisited(visited)
        //printVisited(headMap)

    })
    return visited.size;
}

function printVisited(visited) {
    for (let y = 6; y >= 0; y--) {
        let line = "";
        for (let x = 0; x < 6; x++) {
            line += (visited.has(x + "," + y) ? visited.get(x + "," + y) : ".")
        }
        console.log(line);
    }
}

function getPart2(input) {

    let tailVisited = new Map();
    let instructions = input.map(line => {
        let [move, length] = line.split(" ");
        return {move, length: Number(length)}
    })
    // Set start for H
    tailVisited.set("0,0", "V")

    let knots = new Array(10).fill(".")
        .map(_ => ({
            x: 0, y: 0
        }))

    instructions.forEach(instruction => {
        for (let i = 0; i < instruction.length; i++) {
            knots[0] = moveHead(knots[0], instruction);

            for (let j = 1; j < knots.length; j++) {
                knots[j] = moveTail(knots[j - 1], knots[j]);
            }
            tailVisited.set(knots[9].x + "," + knots[9].y, "V")
        }
        //printVisited(tailVisited)
    })
    return tailVisited.size;
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split("\n");
console.log("Part1:", getPart1(arr));
console.log("Part2:", getPart2(arr));