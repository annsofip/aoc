fs = require("fs");

function mark(board, n) {
    for (const row of board) {
        for (const square of row) {
            if (square.n === n) {
                square.marked = true;
                return true;
            }
        }
    }

    return false;
}

function winner(board) {
    for (const row of board) {
        if (row.every(square => square.marked)) {
            return true;
        }
    }

    for (let i = 0; i < 5; i++) {
        var colMarked = true;
        for (let j = 0; j < 5; j++) {
            if (!board[j][i].marked) {
                colMarked = false;
                break;
            }
        }
        if (colMarked) {
            return colMarked;
        }
    }

    return false;
}

function allBoardsHaveWon(boards) {
    return boards.every(b => b);
}

function getPart1(input) {
    const numbers = input[0]
        .split(',')
        .map(n => parseInt(n));

    var boards = input.slice(1)
        .map(b => b.split('\n')
            .filter(l => l.length > 0)
            .map(row => Array.from(row.matchAll(/\d+/g))
                .map(square => ({
                    n: parseInt(square[0]),
                    marked: false
                }))));
    let winnerFound = {};
    let lastNumber = -1;
    numbers:
        for (const n of numbers) {
            for (const b of boards) {
                mark(b, n);
                if (winner(b)) {
                    winnerFound = b;
                    lastNumber = n;
                    break numbers;
                }
            }
        }

    const unmarkedSum = winnerFound.reduce((sum, row) =>
        sum + row.reduce((rowSum, square) => rowSum + (!square.marked ? square.n : 0), 0), 0)


    return unmarkedSum * lastNumber;
}

function getPart2(input) {
    const numbers = input[0]
        .split(',')
        .map(n => parseInt(n));

    var boards = input.slice(1)
        .map(b => b.split('\n')
            .filter(l => l.length > 0)
            .map(row => Array.from(row.matchAll(/\d+/g))
                .map(square => ({
                    n: parseInt(square[0]),
                    marked: false
                }))));
    let boardHasWon = new Array(boards.length).fill(false);
    let lastBoardToWin = 0;
    let lastNumber = -1;
    numbers:
        for (const n of numbers) {
            for (let i = 0; i < boards.length; i++) {
                if (!boardHasWon[i]) {
                    mark(boards[i], n);
                    if (winner(boards[i])) {
                        boardHasWon[i] = true;
                        lastNumber = n;
                        if (allBoardsHaveWon(boardHasWon)) {
                            lastBoardToWin = i;
                            break numbers;
                        }
                    }
                }
            }
        }
    const unmarkedSum = boards[lastBoardToWin].reduce((sum, row) =>
        sum + row.reduce((rowSum, square) => rowSum + (!square.marked ? square.n : 0), 0), 0)


    return unmarkedSum * lastNumber;
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(/\n\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
