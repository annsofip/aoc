fs = require("fs");
crypto = require('crypto');


function getPart1(input) {
    const md5 = data => crypto.createHash('md5').update(data).digest('hex');
    const isStartsWithFiveZeros = data => data.slice(0, 5) === '00000';

    let i = 0;
    while (!isStartsWithFiveZeros(md5(`${input}${i}`))) {
        i++;
    }
    return i;
}

function getPart2(input) {
    const md5 = data => crypto.createHash('md5').update(data).digest('hex');
    const isStartsWithFiveZeros = data => data.slice(0, 6) === '000000';

    let i = 346386;
    while (!isStartsWithFiveZeros(md5(`${input}${i}`))) {
        i++;
    }
    return i;
}


console.log(getPart1("iwrupvqb"));
console.log(getPart2("iwrupvqb"));

