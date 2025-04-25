import * as fs from 'fs';

// const path = './src/day_1/input/example.txt';
const path = './src/day_1/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split('\r\n');

let left: number[] = [];
let right: number[] = [];

lines.forEach(value => {
    const seperated = value.split('   ')
    left.push(parseInt(seperated[0].trim()));
    right.push(parseInt(seperated[1].trim()));
});

const duplicationCount: {[index: number]: number} = {};

left = left.sort((a, b) => a - b);
right = right.sort((a, b) => a - b );

right.forEach((value) => {
    if (!duplicationCount[value]) {
        duplicationCount[value] = 1;
    } else {
        duplicationCount[value] += 1;
    }
})

let res = 0;

left.forEach(value => {
    if (duplicationCount[value]) {
        res += value * duplicationCount[value];
    }
});

console.log(res);