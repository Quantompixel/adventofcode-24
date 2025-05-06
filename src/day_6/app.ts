import * as fs from 'fs';
import * as os from 'os';

const path = './src/day_6/input/example.txt';
// const path = './src/day_6/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split(os.EOL);
let res = 0;

const map: string[][] = [];
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

function traverseMap(
    [yPos, xPos]: [number, number],
    [yDir, xDir]: [number, number],
    map: string[][],
    step = 0,
    previousPositions: Array<{position: [number, number], direction: [number, number]}> = []
) {
    const rotateClockwise = (currentDirection: [number, number]) => {
        const directions: Array<[number, number]> = [[-1, 0], [0, 1], [1, 0], [0, -1]];
        const index = directions.findIndex(value => value[0] === currentDirection[0] && value[1] === currentDirection[1]);
        if (index === -1) return [-1, 0];
        if (index === directions.length - 1) {
            return directions[0];
        }

        return directions[index + 1];
    }

    const isPositionInArray = (position: {position: [number, number], direction: [number, number]}): boolean => {
        for (let previousPosition of previousPositions) {
            if (previousPosition.position[0] === position.position[0] &&
                previousPosition.position[1] === position.position[1] &&
                previousPosition.direction[0] === position.direction[0] &&
                previousPosition.direction[1] === position.direction[1]) {
                return true;
            }
        }
        return false;
    }

    if (map[yPos][xPos] !== '%') {
        map[yPos][xPos] = '%';
        res++;
    }

    // map.forEach(row => console.log(row.join('')));

    let nextPosition = [yPos + yDir, xPos + xDir];

    if (nextPosition[0] < 0 || nextPosition[0] > map.length - 1) return;
    if (nextPosition[1] < 0 || nextPosition[1] > map[nextPosition[0]].length - 1) return;

    if (map[nextPosition[0]][nextPosition[1]] === '#') {
        [yDir, xDir] = rotateClockwise([yDir, xDir]);
        nextPosition = [yPos + yDir, xPos + xDir];
    }

    if (nextPosition[0] < 0 || nextPosition[0] > map.length - 1) return;
    if (nextPosition[1] < 0 || nextPosition[1] > map[nextPosition[0]].length - 1) return;

    if (isPositionInArray({position: [yPos, xPos], direction: [yDir, xDir]})) {
        previousPositions.push({position: [yPos, xPos], direction: [yDir, xDir]});
        console.log({position: [yPos, xPos], direction: [yDir, xDir]});
        console.log(previousPositions);
        return;
    }

    traverseMap([nextPosition[0], nextPosition[1]], [yDir, xDir], map, step + 1, previousPositions);
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

map.forEach(row => console.log(row.join('')));

console.log(res);