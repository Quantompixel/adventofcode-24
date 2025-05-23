import * as fs from 'fs';
import * as os from 'os';

// const path = './src/day_5/input/example.txt';
const path = './src/day_5/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split(os.EOL);
const rules: Array<[number, number]> = [];
const pageNumberGroups: Array<Array<number>> = [];
let res = 0;

function parseRules() {
    const data = lines.slice(0, lines.indexOf(''));

    data.forEach(line => {
        const seperatedLine = line.split('|');
        const pageNumber1 = parseInt(seperatedLine[0]);
        const pageNumber2 = parseInt(seperatedLine[1])

        rules.push([pageNumber1, pageNumber2]);
    })
}

function parsePageNumberGroups() {
    const data = lines.slice(lines.indexOf('') + 1, lines.length);
    data.forEach(value => {
        const numArr = value.split(',').map(num => parseInt(num));
        pageNumberGroups.push(numArr);
    })
}

parseRules();
parsePageNumberGroups();

for (const pageNumbers of pageNumberGroups) {
    const checkPageNumbers = (pageNumbers: number[], iteration = 0) => {
        let isIncorrect = false;

        for (const [pageNumber1, pageNumber2] of rules) {
            const index1 = pageNumbers.indexOf(pageNumber1);
            const index2 = pageNumbers.indexOf(pageNumber2);

            if (index1 === -1 || index2 === -1) {
                continue;
            }

            if (index1 > index2) {
                isIncorrect = true;

                // switches numbers into the correct order
                const part1 = pageNumbers.slice(0, index2);
                const part2 = pageNumbers.slice(index2, pageNumbers.length);

                part2.splice(part2.indexOf(pageNumber1), 1);
                pageNumbers = part1.concat(pageNumber1).concat(part2);
            }
        }
        if (isIncorrect) checkPageNumbers(pageNumbers, iteration + 1);
        else {
            console.log(pageNumbers, iteration);
            if (iteration > 0) {
                res += pageNumbers[Math.floor(pageNumbers.length / 2)];
            }
            return;
        }
    }

    checkPageNumbers(pageNumbers);
}

console.log(res);