fs = require("fs");

const shouldLog = false;

function log(label) {
    if (shouldLog)
        console.log(label)
}

function getPart1(input) {
    const signalPatterns = input.map(line => {
        const [first, second] = line.split(" | ");
        return second.split(" ");
    }).flat();
    return signalPatterns.reduce((sum, signal) => signal.length === 2 || signal.length === 3 || signal.length === 4 || signal.length === 7
        ? ++sum : sum, 0);
}


function getPart2(input) {
    function sort(signal) {
        return signal.split("").sort().join("");
    }

    const letterTranslations = {
        "abcefg": 0,
        "cf": 1,
        "acdeg": 2,
        "acdfg": 3,
        "bcdf": 4,
        "abdfg": 5,
        "abdefg": 6,
        "acf": 7,
        "abcdefg": 8,
        "abcdfg": 9,
    };

    const signalPatterns = input.map(line => {
        const [uniqueSignalPatterns, outputValue] = line.split(" | ");
        return {
            uniqueSignalPatterns: uniqueSignalPatterns.split(" ").map(sort),
            outputValue: outputValue.split(" ").map(sort)
        };
    });
    var matcher;
    return signalPatterns.reduce((sum, signalPattern) => {

        const one = signalPattern.uniqueSignalPatterns.filter(v => v.length === 2)[0];
        const four = signalPattern.uniqueSignalPatterns.filter(v => v.length === 4)[0];
        const seven = signalPattern.uniqueSignalPatterns.filter(v => v.length === 3)[0];
        const eight = signalPattern.uniqueSignalPatterns.filter(v => v.length === 7)[0];
        matcher = new RegExp(one[0], 'g');
        var a = seven.replace(matcher, "");
        var bd = four.replace(matcher, "");

        matcher = new RegExp(one[1], 'g');
        a = a.replace(matcher, "");
        bd = bd.replace(matcher, "");


        const letters = signalPattern.uniqueSignalPatterns.reduce((concat, signal) => {
            concat = concat.concat(signal);
            return concat;
        }, "").split("").sort().join("");

        const counts = {
            a: (letters.match(/a/g) || []).length,
            b: (letters.match(/b/g) || []).length,
            c: (letters.match(/c/g) || []).length,
            d: (letters.match(/d/g) || []).length,
            e: (letters.match(/e/g) || []).length,
            f: (letters.match(/f/g) || []).length,
            g: (letters.match(/g/g) || []).length
        };
        const f = Object.keys(counts).filter(function (key) {
            return counts[key] === 9
        })[0];
        matcher = new RegExp(f, 'g');
        const c = one.replace(matcher, "");
        const e = Object.keys(counts).filter(function (key) {
            return counts[key] === 4
        })[0];

        const g = eight.split("").filter(letter => letter !== a && letter !== c && letter !== e && letter !== f && letter !== bd[0] && letter !== bd[1])[0];
        const d = Object.keys(counts).filter(function (key) {
            return counts[key] === 7 && bd.includes(key);
        })[0];
        matcher = new RegExp(d);
        const b = bd.replace(matcher, "");
        if (bd.length > 2) {
            log("error")
        }
        log({a, b, c, d, e, f, g, counts});

        const mappings = {a, b, c, d, e, f, g};
        const reverse = Object.assign({}, ...Object.entries(mappings).map(([a, b]) => ({[b]: a})));
        const number = signalPattern.outputValue.map(val => {
            const result = val.split("").map(letter => {
                log(`letter ${letter} mapped to ${reverse[letter]}`)
                return reverse[letter];
            }).sort().join("");
            log(`val ${val} mapped to ${result} which will be ${letterTranslations[result]}`)
            return letterTranslations[result];
        }).join("");

        log("number: "+ parseInt(number))
        return sum + parseInt(number);
    }, 0)
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(/\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
