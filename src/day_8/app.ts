import * as fs from 'fs';
import * as os from 'os';

// const path = './src/day_8/input/example.txt';
const path = './src/day_8/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split(os.EOL);

const map = lines.map(line => line.split(''));
const allAntennas: { [key: string]: Array<{ id: number, y: number, x: number }> } = {};
const antinodePositions: Array<{ y: number, x: number }> = [];

function isPositionInPositionArray(position: { y: number, x: number }, positionArray: Array<{ y: number, x: number }>) {
    for (const positionOfArray of positionArray) {
        if (positionOfArray.y === position.y && positionOfArray.x === position.x) return true;
    }
}

map.forEach((row, y) => {
    row.forEach((character, x) => {
        if (character === '.') return;
        if (!allAntennas[character]) allAntennas[character] = [];

        allAntennas[character].push({
            id: y * map.length + x,
            y: y,
            x: x
        })
    });
});


for (const antennaGroupKey in allAntennas) {
    const antennaGroup = allAntennas[antennaGroupKey];
    for (const antenna of antennaGroup) {
        for (const neighborAntenna of antennaGroup) {
            if (neighborAntenna.id === antenna.id) continue;

            const yDiff = neighborAntenna.y - antenna.y;
            const xDiff = neighborAntenna.x - antenna.x;

            const antinodeY = antenna.y + 2 * yDiff;
            const antinodeX = antenna.x + 2 * xDiff;

            if (antinodeY < 0 || antinodeY > map.length - 1) continue;
            if (antinodeX < 0 || antinodeX > map[antinodeY].length - 1) continue;

            if (map[antinodeY][antinodeX] === '.') {
                map[antinodeY][antinodeX] = '#';
            }

            if (!isPositionInPositionArray({ y: antinodeY, x: antinodeX }, antinodePositions)) {
                antinodePositions.push({ y: antinodeY, x: antinodeX });
            }
        }
    }
}

map.forEach(row => console.log(row.join('')));
console.log(antinodePositions.length);
