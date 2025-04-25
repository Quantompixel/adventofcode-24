import * as fs from 'fs';

// const path = './src/day_2/input/example.txt';
const path = './src/day_3/input/input.txt';

const file = fs.readFileSync(path, 'utf8');

// const input = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';
const input = file;

const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;

let result = 0;

const multiplications = input.match(mulRegex);

if (multiplications) {
    multiplications.forEach(multiplication => {
        console.log(multiplication)
        const numberRegex = /\d+/g;
        const matches = multiplication.match(numberRegex);
        console.log(matches)

        if (!matches) return;

        result += parseInt(matches[0]) * parseInt(matches[1]);
    })
}

console.log(result);
