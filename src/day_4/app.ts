import * as fs from 'fs';

// const path = './src/day_4/input/example.txt';
const path = './src/day_4/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split('\r\n');

const matrix: string[][] = [];
const positionsFound: Array<[number, number]> = [];

lines.forEach(line => matrix.push(line.split('')));

let res = 0;

for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    const row = matrix[rowIndex];

    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        let buffer: Array<[number, number]> = [];

        const searchWordInDirection = (position: [number, number], direction: [number, number], pointer: number) => {
            const word = 'XMAS';

            let positionVertical = position[0];
            let positionHorizontal = position[1];

            if (positionVertical < 0) return;
            if (positionHorizontal < 0) return;
            if (positionVertical > matrix.length - 1) return;
            if (positionHorizontal > matrix[positionVertical].length - 1) return;

            const current = matrix[positionVertical][positionHorizontal];
            // console.log(current);

            if (!current) return;
            if (current != word[pointer]) return;

            buffer.push([positionVertical, positionHorizontal]);

            if (current == word[pointer] && pointer == word.length - 1) {
                // console.log('XMAS', direction);
                positionsFound.push(...buffer);
                res++;
                return;
            }

            positionVertical += direction[0];
            positionHorizontal += direction[1];
            searchWordInDirection([positionVertical, positionHorizontal], direction, pointer + 1);
        }

        const directions: Array<[number, number]> = [
            [-1, 0], [-1, 1],
            [0, 1], [1, 1],
            [1, 0], [1, -1],
            [0, -1], [-1, -1]
        ];

        for (const direction of directions) {
            // console.log('search in direction:', direction)
            buffer = [];
            searchWordInDirection([rowIndex, columnIndex], direction, 0);
            // console.log('----------')
        }
    }
}

console.log(positionsFound);
let logRow = '';
matrix.forEach((row, rowIndex) => {
    logRow = '';
    row.forEach((value, columnIndex) => {
        let characterToAdd = '.';
        for (const position of positionsFound) {
            if (position[0] == rowIndex && position[1] == columnIndex) {
                characterToAdd = value;
                break;
            }
        }
        logRow += characterToAdd;
    });
    console.log(logRow);
});

console.log(res);