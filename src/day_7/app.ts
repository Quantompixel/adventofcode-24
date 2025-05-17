import * as fs from 'fs';
import * as os from 'os';

// const path = './src/day_7/input/example.txt';
const path = './src/day_7/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split(os.EOL);

const results: number[] = [];
const coefficientList: number[][] = [];

function bruteforceOperaters(coefficients: number[], result: number, current: number = -1, index = 0) {
    // console.log(current, coefficients[index], index, index > coefficients.length, coefficients.length);
    if (!coefficients[index]) return current === result;
    if (index === 0) return bruteforceOperaters(coefficients, result, coefficients[0], index + 1);


    if (bruteforceOperaters(coefficients, result, current * coefficients[index], index + 1)) return true;
    else if (bruteforceOperaters(coefficients, result, current + coefficients[index], index + 1)) return true;
    else if (bruteforceOperaters(coefficients, result, parseInt(current.toString() + coefficients[index].toString()), index + 1)) return true;
    else return false;
}

lines.forEach((line, index) => {
    const seperated = line.split(':');
    results.push(parseInt(seperated[0]));

    coefficientList.push([]);
    seperated[1].trim().split(' ').forEach(value => {
        coefficientList[index].push(parseInt(value.trim()));
    })
});

let res = 0;

results.forEach((result, index) => {
    console.log(bruteforceOperaters(coefficientList[index], results[index]));
    if(bruteforceOperaters(coefficientList[index], results[index])) {
        res += result;
    }
})

console.log(res);

