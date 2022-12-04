fs = require("fs");

const shouldLog = false;


function log(label) {
    if (shouldLog)
        console.log(label)
}


function getPart1(input) {

}


function getPart2(input) {


}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(/\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
