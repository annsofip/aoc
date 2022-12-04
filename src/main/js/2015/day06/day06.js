fs = require("fs");

const shouldLog = false;


function log(label) {
    if (shouldLog)
        console.log(label)
}


function getPart1(input) {
    const instructions = input.map(line => {
        var [_, action, x1, y1, x2, y2] = line.match(/(toggle|turn on|turn off) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)/)
        return {
            action: action,
            x1: parseInt(x1), y1: parseInt(y1),
            x2: parseInt(x2), y2: parseInt(y2)
        };
    });

    const lightOn = new Map();

    function doAction(action, key) {
        if (action === "turn on") {
            lightOn.set(key, true);
        } else if (action === "turn off") {
            lightOn.set(key, false);
        } else {
            var light = lightOn.get(key);
            lightOn.set(key, !light);
        }
    }

    for (const i of instructions) {
        var current = {x: i.x1, y: i.y1};
        while (current.x < i.x2 || current.y < i.y2) {
            const key = [current.x, current.y].join(",");
            doAction(i.action, key);
            if (current.x < i.x2) {
                current.x++;
            } else {
                current.y++;
                current.x = i.x1;
            }
        }
        doAction(i.action, [i.x2, i.y2].join(","));

    }
    return [...lightOn.entries()].reduce((sum, [_, n]) => sum + (n ? 1 : 0), 0);
}


function getPart2(input) {
    const instructions = input.map(line => {
        var [_, action, x1, y1, x2, y2] = line.match(/(toggle|turn on|turn off) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)/)
        return {
            action: action,
            x1: parseInt(x1), y1: parseInt(y1),
            x2: parseInt(x2), y2: parseInt(y2)
        };
    });

    const lightOn = new Map();

    function doAction(action, key) {
        var light = lightOn.get(key);
        if (!light) {
            light = 0;
        }
        if (action === "turn on") {
            lightOn.set(key, ++light);
        } else if (action === "turn off") {
            lightOn.set(key, light >= 1 ? --light : 0);
        } else {
            light += 2;
            lightOn.set(key, light);
        }
    }

    for (const i of instructions) {
        var current = {x: i.x1, y: i.y1};
        while (current.x < i.x2 || current.y < i.y2) {
            const key = [current.x, current.y].join(",");
            doAction(i.action, key);
            if (current.x < i.x2) {
                current.x++;
            } else {
                current.y++;
                current.x = i.x1;
            }
        }
        doAction(i.action, [i.x2, i.y2].join(","));

    }
    return [...lightOn.entries()].reduce((sum, [_, n]) => sum + n, 0);

}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split(/\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
