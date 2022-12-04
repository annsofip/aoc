fs = require("fs");


function getPart1(input) {
    return input.reduce((acc, word) => {
        var bad = ['ab', 'cd', 'pq', 'xy'];

        var containsVowel = word.match(/[aeiou]/gi);
        var containsBad = bad.filter(b => word.includes(b));
        var containsRepeat = word.substring(0, word.length - 1).split("")
            .filter((item, index, array) => item === array[index + 1]);

        console.log({word, containsVowel, containsOnlyGood: containsBad, containsRepeat})
        return acc + ((containsVowel && containsVowel.length === 3 && containsBad.length!=0 && containsRepeat) ? 1 : 0);
    }, 0);
}

function getPart2(input) {

}

const input = fs.readFileSync("./input.txt").toString('utf-8');

let arr = input.split(/\n/);
console.log(getPart1(arr));
//console.log(getPart2("iwrupvqb"));

