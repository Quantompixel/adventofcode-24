import * as fs from 'fs';

// const path = './src/day_1/input/example.txt';
const path = './src/day_1/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split('\r\n');

let left: number[] = [];
let right: number[] = [];

lines.forEach(value => {
    let seperated = value.split('   ')
    left.push(parseInt(seperated[0].trim()));
    right.push(parseInt(seperated[1].trim()));
})

left = left.sort((a, b) => a - b);
right = right.sort((a, b) => a - b );

console.log(left, right);

let res = 0;

left.forEach((value, index) => res += Math.abs(value - right[index]));

console.log(res);