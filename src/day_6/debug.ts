
import * as fs from 'fs';
import * as os from 'os';

// const path = './src/day_6/input/example.txt';
const path = './src/day_6/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split(os.EOL);
let res = 0;

const startTime = Date.now();

const map: string[][] = [];
const highlightPosition = [22, 80];
let playerPosition: [number, number] = [-1, -1];

lines.forEach((line, row) => {
    const seperatedLine = line.split('');
    seperatedLine.forEach((character, column) => {
        if (character === '^') {
            playerPosition = [row, column];
        }
    })
    map.push(seperatedLine);
});

function traverseMap([yPos, xPos]: [number, number], [yDir, xDir]: [number, number], map: string[][], step = 0) {
    const rotateClockwise = (currentDirection: [number, number]) => {
        const directions: Array<[number, number]> = [[-1, 0], [0, 1], [1, 0], [0, -1]];
        const index = directions.findIndex(value => value[0] === currentDirection[0] && value[1] === currentDirection[1]);
        if (index === -1) return [-1, 0];
        if (index === directions.length - 1) {
            return directions[0];
        }

        return directions[index + 1];
    }

    map[yPos][xPos] = '%';
    res++;

    // map.forEach(row => console.log(row.join('')));

    let nextPosition = [yPos + yDir, xPos + xDir];
    // console.log(nextPosition);

    if (nextPosition[0] < 0 || nextPosition[0] > map.length - 1) return;
    if (nextPosition[1] < 0 || nextPosition[1] > map[nextPosition[0]].length - 1) return;

    if (map[nextPosition[0]][nextPosition[1]] === '#') {
        [yDir, xDir] = rotateClockwise([yDir, xDir]);
        nextPosition = [yPos + yDir, xPos + xDir];
    }

    if (nextPosition[0] < 0 || nextPosition[0] > map.length - 1) return;
    if (nextPosition[1] < 0 || nextPosition[1] > map[nextPosition[0]].length - 1) return;

    traverseMap([nextPosition[0], nextPosition[1]], [yDir, xDir], map, step + 1);
    // console.log(yDir, xDir);
    // [yDir, xDir] = rotateClockwise([yDir, xDir]);
    // console.log(yDir, xDir);
    // [yDir, xDir] = rotateClockwise([yDir, xDir]);
    // console.log(yDir, xDir);
    // [yDir, xDir] = rotateClockwise([yDir, xDir]);
    // console.log(yDir, xDir);
    // [yDir, xDir] = rotateClockwise([yDir, xDir]);
    // console.log(yDir, xDir);
}

traverseMap(playerPosition, [-1, 0], map);

map[highlightPosition[0]][highlightPosition[1]] = 'X';

// map.forEach(row => console.log(row.join('')));

console.log(res);
console.log(Date.now() - startTime);
