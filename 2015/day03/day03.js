fs = require("fs");


function getPart1(input) {
    return new Set(input.replace(/\n/g, "")
        .split('')
        .reduce((acc, value) => {
            let newPos = acc.santaHouse;
            switch (value) {
                case '^':
                    newPos.x++;
                    break;
                case '>':
                    newPos.y++;
                    break;
                case 'v':
                    newPos.x--;
                    break;
                case '<':
                    newPos.y--;
                    break;
            }
            acc.santaHouse = newPos;
            acc.visitedHouses.push(`${newPos.x},${newPos.y}`)
            return acc;
        }, {visitedHouses: ["0,0"], santaHouse: {x: 0, y: 0}}).visitedHouses)
        .size;
}

function getPart2(input) {
    return new Set(input.replace(/\n/g, "")
        .split('')
        .reduce((acc, value) => {
            let newPos = acc.toMove === 0 ? acc.santaHouse : acc.roboSantaHouse;
            switch (value) {
                case '^':
                    newPos.x++;
                    break;
                case '>':
                    newPos.y++;
                    break;
                case 'v':
                    newPos.x--;
                    break;
                case '<':
                    newPos.y--;
                    break;
            }
            acc.santaHouse = acc.toMove === 0 ? newPos : acc.santaHouse;
            acc.roboSantaHouse = acc.toMove === 1 ? newPos : acc.roboSantaHouse;
            acc.toMove = (acc.toMove + 1) % 2;
            acc.visitedHouses.push(`${newPos.x},${newPos.y}`);
            return acc;
        }, {
            visitedHouses: ["0,0"],
            santaHouse: {x: 0, y: 0},
            roboSantaHouse: {x: 0, y: 0},
            toMove: 0
        }).visitedHouses)
        .size;
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input;
//console.log(arr);
//console.log(getPart2("^v"));
//console.log("---------------------")
//console.log(getPart2("^>v<"));
//console.log("---------------------")
//console.log(getPart2("^v^v^v^v^v"));
//console.log("--------------------")
console.log(getPart1(arr));
console.log(getPart2(arr));
