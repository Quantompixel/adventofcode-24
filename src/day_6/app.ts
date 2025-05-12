// node --require ts-node/register --stack-size=10000 --max_old_space_size=8192 .\src\day_6\app.ts
// input.txt 5253 steps are necessary
// example.txt 45 steps are necessary

import * as fs from 'fs';
import * as os from 'os';

const path = './src/day_6/input/example.txt';
// const path = './src/day_6/input/input.txt';

const stepsNeeded = 45
// const stepsNeeded = 5253

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split(os.EOL);

const startTime = Date.now();
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

function generateProgressBar(length: number, min: number, current: number,  max: number, isInverted: boolean): string {
    const percentage = current / (max - min);
    let progressDoneLength = Math.floor(percentage * length);
    let progressBar = '|';

    for(let i = 0; i < length; i++) {
        if(i < progressDoneLength) {
            progressBar += '#';
            continue;
        }

        progressBar += '-';
    }

    progressBar += '|';

    if(isInverted) {
        let arr = progressBar.split('').reverse();
        arr = arr.map(symbol => {
            if(symbol === '|') return symbol;
            return symbol === '#' ? '-' : '#';
        })

        return arr.join('');
    }
    
    return progressBar;
}

function traverseMap(
    [yPos, xPos]: [number, number],
    [yDir, xDir]: [number, number],
    map: string[][],
    obstacleUsed: boolean,
    step = 0,
    previousPositions: Array<{ position: [number, number], direction: [number, number] }> = [],
    stepOfObstaclePlaced = -1
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

    const checkForCollisions = (posY: number, posX: number, dirY: number, dirX: number): boolean => {
        while(true) {
            if(posY < 0 || posY > map.length) return false;
            if(posX < 0 || posX > map[posY].length) return false;

            if(map[posY][posX] === '#') return true;

            posY += dirY;
            posX += dirX;
        }
    }
    
    map.forEach(row => console.log(row.join('')));

    map = structuredClone(map);
    previousPositions = structuredClone(previousPositions);

    if (map[yPos][xPos] !== '%') {
        map[yPos][xPos] = '%';
    }

    let nextPosition = [yPos + yDir, xPos + xDir];

    if (nextPosition[0] < 0 || nextPosition[0] > map.length - 1) {
        console.log(step, 'no loop');
        // map.forEach(row => console.log(row.join('')));
        return;
    }
    if (nextPosition[1] < 0 || nextPosition[1] > map[nextPosition[0]].length - 1) {
        console.log(step, 'no loop');
        // map.forEach(row => console.log(row.join('')));
        return;
    }

    if (!isPositionInArray({position: [yPos, xPos], direction: [yDir, xDir]})) {
        previousPositions.push({position: [yPos, xPos], direction: [yDir, xDir]});
    } else {
        // loop detected
        console.log(generateProgressBar(20, 0, stepOfObstaclePlaced, stepsNeeded, true), `${stepOfObstaclePlaced}/${stepsNeeded}`, `${Math.floor((Date.now() - startTime) / 1000 / 60)} min`, {position: [yPos, xPos], direction: [yDir, xDir]});
        res++;
        map[yPos][xPos] = 'O';
        // map.forEach(row => console.log(row.join('')));
        return;
    }

    if (map[nextPosition[0]][nextPosition[1]] === '#') {
        [yDir, xDir] = rotateClockwise([yDir, xDir]);
    } 
        
    
    traverseMap([yPos + yDir, xPos + xDir], [yDir, xDir], map, obstacleUsed, step + 1, previousPositions, stepOfObstaclePlaced);
    
    if(map[nextPosition[0]][nextPosition[1]] === '#') {
        return;
    }
    
    if (!obstacleUsed && step > 0) {
        obstacleUsed = true;
        stepOfObstaclePlaced = step;
        [yDir, xDir] = rotateClockwise([yDir, xDir]);
        map[nextPosition[0]][nextPosition[1]] = '#';
        if(checkForCollisions(nextPosition[0], nextPosition[1], yDir, xDir)) return;
        traverseMap([yPos + yDir, xPos + xDir], [yDir, xDir], map, obstacleUsed, step + 1, previousPositions, stepOfObstaclePlaced);
    }
}

traverseMap(playerPosition, [-1, 0], map, false);

console.log(res);
