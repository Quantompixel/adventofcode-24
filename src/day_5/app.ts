import * as fs from 'fs';

const path = './src/day_5/input/example.txt';
// const path = './src/day_4/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split('\r\n');

console.log(lines)
