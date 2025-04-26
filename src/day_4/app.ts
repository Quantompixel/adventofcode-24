import * as fs from 'fs';

const path = './src/day_4/input/example.txt';
// const path = './src/day_4/input/input.txt';

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

        const searchXMas = (position: [number, number]): boolean => {
            let posY = position[0];
            let posX = position[1];

            /*
                M S
                 A
                M S

                M M
                 A
                S S

                S M
                 A
                S M

                S S
                 A
                M M

                From top left to bottom left
             */
            const XMasOrientations = ['MSSM', 'MMSS', 'SMMS', 'SSMM'];
            const directions = [[-1, -1], [-1, 1], [1, 1], [1, -1]];

            let XMasBuffer = '';
            for (let direction of directions) {
                const posYinDirection = posY + direction[0];
                const posXinDirection = posX + direction[1];

                if (posYinDirection < 0) return false;
                if (posXinDirection < 0) return false;
                if (posYinDirection > matrix.length - 1) return false;
                if (posXinDirection > matrix[posYinDirection].length - 1) return false;

                buffer.push([posYinDirection, posXinDirection]);
                XMasBuffer += matrix[posYinDirection][posXinDirection];
            }

            if (XMasOrientations.includes(XMasBuffer)) {
                positionsFound.push(...buffer);
                return true;
            }

            return false;
        }

        if (matrix[rowIndex][columnIndex] == 'A') {
            if (searchXMas([rowIndex, columnIndex])) {
                positionsFound.push([rowIndex, columnIndex]);
                res++;
            }
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