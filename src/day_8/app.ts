import * as fs from 'fs';
import * as os from 'os';

const path = './src/day_8/input/example.txt';
// const path = './src/day_8/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split(os.EOL);

const allAntennas: {[key: string]: Array<{id: number, y: number, x: number}>} = {};


lines.forEach((line, y) => {
    line.split('').forEach((character, x) => {
        if(character === '.') return;
        if(!allAntennas[character]) allAntennas[character] = [];

        allAntennas[character].push({
            id: y * line.length + x,
            y: y,
            x: x
        })
    });
});


console.log(allAntennas);
