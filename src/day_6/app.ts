// node --require ts-node/register --stack-size=10000 --max_old_space_size=8192 .\src\day_6\app.ts
// input.txt 5253 steps are necessary
// example.txt 45 steps are necessary

import * as fs from 'fs';
import * as os from 'os';

const path = './src/day_6/input/example.txt';
// const path = './src/day_6/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split(os.EOL);

let map: string[][] = [];
let playerPosition: [number, number] = [-1, -1];
const positionsOfPath: Array<{posY: number, posX: number, dirY: number, dirX: number}> = [];

lines.forEach((line, row) => {
    const seperatedLine = line.split('');
    seperatedLine.forEach((character, column) => {
        if (character === '^') {
            playerPosition = [row, column];
        }
    })
    map.push(seperatedLine);
});

function rotateClockwise (dirY:number, dirX:number) {
    const directions: Array<[number, number]> = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    const index = directions.findIndex(value => value[0] === dirY && value[1] === dirX);
    if (index === -1) return [-1, 0];
    if (index === directions.length - 1) {
        return directions[0];
    }

    return directions[index + 1];
}

function comparePositions(
    pos1: {posY: number, posX: number, dirY: number, dirX: number},
    pos2: {posY: number, posX: number, dirY: number, dirX: number}
):boolean {
     if(pos1.posY !== pos2.posY) return false;
     if(pos1.posX !== pos2.posX) return false;
     if(pos1.dirY !== pos2.dirY) return false;
     if(pos1.dirX !== pos2.dirX) return false;

     return true;
}

function positionArrayIncludesPosition(
    positionArray: Array<{posY: number, posX: number, dirY: number, dirX: number}>,
    posY: number, posX: number, dirY: number, dirX: number
):boolean {
    for(const position of positionArray) {
        if(comparePositions(position, {posY: posY, posX: posX, dirY: dirY, dirX: dirX})) return true;
    }
    
    return false;
}

function drawPath(
    posY:number, posX:number, dirY:number, dirX:number, map: string[][],
    positions: Array<{posY: number, posX: number, dirY: number, dirX: number}>
) {
    while(true) {
        if (posY + dirY < 0 || posY + dirY > map.length - 1) break;
        if (posX + dirX < 0 || posX + dirX > map[posY].length - 1) break;
        
        if (map[posY + dirY][posX + dirX] === '#') {
            const newDirection = rotateClockwise(dirY, dirX);
            dirY = newDirection[0];
            dirX = newDirection[1];
        }

        posY += dirY;
        posX += dirX;

        if(positionArrayIncludesPosition(positions, posY, posX, dirY, dirX)) {
            console.log('loop detected');
            return;
        }
        positions.push({posY: posY, posX: posX, dirY: dirY, dirX: dirX});

        map[posY][posX] = '%';
    }

}

drawPath(playerPosition[0], playerPosition[1], -1, 0, map, positionsOfPath);

let iterations = 0;
for(const {posY: posY, posX: posX, dirY: dirY, dirX: dirX} of positionsOfPath) {
    console.log(iterations);
    let positions: Array<{posY: number, posX: number, dirY: number, dirX: number}> = [];
    const mapWithObstacle = structuredClone(map);
    if (posY + dirY < 0 || posY + dirY > mapWithObstacle.length - 1) break;
    if (posX + dirX < 0 || posX + dirX > mapWithObstacle[posY].length - 1) break;
    mapWithObstacle[posY + dirY][posX + dirX] = '#';
    drawPath(posY, posX, dirY, dirX, mapWithObstacle, positions);
    iterations++;
}
