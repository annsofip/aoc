fs = require("fs");


function getPart1(input) {
    const opcodes = input.split(",").map(Number);
    opcodes[1] = 12;
    opcodes[2] = 2;

    var current = 0;
    while (opcodes[current] !== 99) {
        if (opcodes[current] === 1) {
            opcodes[opcodes[current + 3]] = opcodes[opcodes[current + 1]] + opcodes[opcodes[current + 2]];
        } else if (opcodes[current] === 2) {
            opcodes[opcodes[current + 3]] = opcodes[opcodes[current + 1]] * opcodes[opcodes[current + 2]];
        }
        current += 4;
    }
    return opcodes[0];
}


function getPart2(input) {
    const opcodes = input.split(",").map(Number);
    opcodes[1] = 12;
    opcodes[2] = 2;

    var instructionPointer = 0;
    while (opcodes[instructionPointer] !== 99) {
        if (opcodes[instructionPointer] === 1) {
            opcodes[opcodes[instructionPointer + 3]] = opcodes[opcodes[instructionPointer + 1]] + opcodes[opcodes[instructionPointer + 2]];
        } else if (opcodes[instructionPointer] === 2) {
            opcodes[opcodes[instructionPointer + 3]] = opcodes[opcodes[instructionPointer + 1]] * opcodes[opcodes[instructionPointer + 2]];
        }
        instructionPointer += 4;
    }
    return opcodes[0];
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input;
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
