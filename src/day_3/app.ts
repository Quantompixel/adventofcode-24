import * as fs from 'fs';

// const path = './src/day_3/input/example.txt';
const path = './src/day_3/input/input.txt';

const file = fs.readFileSync(path, 'utf8');

const mulRegex = /(mul\(\d{1,3},\d{1,3}\))|(don't\(\))|(do\(\))/g;

let result = 0;

const instructions = file.match(mulRegex);
console.log(instructions);

if (instructions) {
    let disabled = false;

    instructions.forEach(instruction => {
        console.log(instruction)
        if (instruction == `don't()`) disabled = true;
        if (instruction == 'do()') disabled = false;
        if (disabled) return;

        const numberRegex = /\d+/g;
        const matches = instruction.match(numberRegex);
        console.log(matches)

        if (!matches) return;

        result += parseInt(matches[0]) * parseInt(matches[1]);
    })
}

console.log(result);
