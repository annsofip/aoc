fs = require("fs");

const shouldLog = true;


function log(label) {
    if (shouldLog)
        console.log(label)
}

function getPart1(input) {
    const closingBracket = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">"
    };
    const points = {")": 3, "]": 57, "}": 1197, ">": 25137};

    function validate(chunk, startingBrackets = []) {
        const checking = chunk[0];
        const restOfChunk = chunk.slice(1);
        if (Object.keys(closingBracket).includes(checking)) {
            startingBrackets.push(checking);
            if (restOfChunk.length) {
                return validate(restOfChunk, startingBrackets);
            } else {
                return 0;
            }
        } else {
            const lookingFor = startingBrackets.pop();
            if (closingBracket[lookingFor] === checking) {
                if (restOfChunk.length) {
                    return validate(restOfChunk, startingBrackets);
                } else {
                    return 0;
                }
            } else {
                return points[checking];
            }
        }
    }

    return input.map(l => validate(l)).reduce((sum, score) => sum + score, 0);
}


function getPart2(input) {
    const closingBracket = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">"
    };
    const points = {")": 1, "]": 2, "}": 3, ">": 4};

    function validate(chunk, startingBrackets = []) {
        const checking = chunk[0];
        const restOfChunk = chunk.slice(1);
        if (Object.keys(closingBracket).includes(checking)) {
            startingBrackets.push(checking);
            if (restOfChunk.length) {
                return validate(restOfChunk, startingBrackets);
            } else {
                return startingBrackets;
            }
        } else {
            const lookingFor = startingBrackets.pop();
            if (closingBracket[lookingFor] === checking) {
                if (restOfChunk.length) {
                    return validate(restOfChunk, startingBrackets);
                } else {
                    return startingBrackets;
                }
            } else {
                return null;
            }
        }
    }

    const scores = input.map(l => (validate(l)))
        .filter(l => l)
        .map(result => result.map(char => closingBracket[char]).reverse())
        .map((line) =>
            line.reduce((sum, char) => {
                return sum * 5 + points[char];
            }, 0)).sort((a, b) => b - a);
    return scores[Math.floor(scores.length / 2)];
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(/\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));

