import * as fs from 'fs';
import * as os from 'os';

const path = './src/day_5/input/example.txt';
// const path = './src/day_4/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split(os.EOL);
const rules: Array<[number, number]> = [];
const pageNumbers: Array<Array<number>> = [];

function parseRules() {
    const data = lines.slice(0, lines.indexOf(''));

    data.forEach(line => {
        const seperatedLine = line.split('|');
        const pageNumber1 = parseInt(seperatedLine[0]);
        const pageNumber2 = parseInt(seperatedLine[1])

        rules.push([pageNumber1, pageNumber2]);
    })
}

function parsePageNumbers() {
    const data = lines.slice(lines.indexOf('') + 1, lines.length);
    data.forEach(value => {
        const numArr = value.split(',').map(num => parseInt(num));
        pageNumbers.push(numArr);
    })
}

parseRules();
parsePageNumbers();
