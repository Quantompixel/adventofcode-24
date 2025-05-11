import * as fs from 'fs';
import * as os from 'os';

const path = './src/day_6/input/example.txt';
// const path = './src/day_6/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split(os.EOL);

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

let res = 0;

function traverseMap(
    [yPos, xPos]: [number, number],
    [yDir, xDir]: [number, number],
    map: string[][],
    obstacleUsed: boolean,
    step = 0,
    previousPositions: Array<{ position: [number, number], direction: [number, number] }> = [],
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

    const isPositionInArray = (position: { position: [number, number], direction: [number, number] }): boolean => {
        for (const previousPosition of previousPositions) {
            if (previousPosition.position[0] === position.position[0] &&
                previousPosition.position[1] === position.position[1] &&
                previousPosition.direction[0] === position.direction[0] &&
                previousPosition.direction[1] === position.direction[1]) {
                return true;
            }
        }
        return false;
    }

    map = structuredClone(map);
    previousPositions = structuredClone(previousPositions);

    if (map[yPos][xPos] !== '%') {
        map[yPos][xPos] = '%';
    }

    let nextPosition = [yPos + yDir, xPos + xDir];

    if (nextPosition[0] < 0 || nextPosition[0] > map.length - 1) {
        // console.log("no loop")
        // map.forEach(row => console.log(row.join('')));
        return;
    }
    if (nextPosition[1] < 0 || nextPosition[1] > map[nextPosition[0]].length - 1) {
        // console.log("no loop")
        // map.forEach(row => console.log(row.join('')));
        return;
    }

    if (!isPositionInArray({position: [yPos, xPos], direction: [yDir, xDir]})) {
        previousPositions.push({position: [yPos, xPos], direction: [yDir, xDir]});
    } else {
        // loop detected
        console.log('loop detected', {position: [yPos, xPos], direction: [yDir, xDir]});
        res++;
        map[yPos][xPos] = 'O';
        map.forEach(row => console.log(row.join('')));
        return;
    }

    if (map[nextPosition[0]][nextPosition[1]] === '#') {
        [yDir, xDir] = rotateClockwise([yDir, xDir]);
    } 
        
    
    traverseMap([yPos + yDir, xPos + xDir], [yDir, xDir], map, obstacleUsed, step + 1, structuredClone(previousPositions));
    
    if(map[nextPosition[0]][nextPosition[1]] === '#') {
        return;
    }
    
    if (!obstacleUsed && step > 0) {
        obstacleUsed = true;
        [yDir, xDir] = rotateClockwise([yDir, xDir]);
        map[nextPosition[0]][nextPosition[1]] = 'X';
        traverseMap([yPos + yDir, xPos + xDir], [yDir, xDir], map, obstacleUsed, step + 1, structuredClone(previousPositions));
    }
}

traverseMap(playerPosition, [-1, 0], map, false);

console.log(res);
