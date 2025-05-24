import * as fs from 'fs';

const path = './src/day_9/input/example.txt';
// const path = './src/day_9/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const data = file.trim();

const blocks = data.split('');
let uncompacted = '';

for (let pointer = 0; pointer < blocks.length; pointer++) {
    const block = blocks[pointer];
    const id = pointer / 2;
    let arr = new Array(parseInt(block));

    if (pointer % 2 === 0) {
        arr.fill(id.toString());
        uncompacted += arr.join('');
        continue;
    }

    uncompacted += arr.fill('.').join('');
}

let uncompactedArr = uncompacted.split('');

for(let index = uncompactedArr.length - 1; index > 0; index--) {
    if(!uncompactedArr.includes('.')) break;
    const blockToMove = uncompactedArr.splice(uncompactedArr.length - 1, 1)[0];
    if(blockToMove === '.') continue;
    const indexFirstEmptyBlock = uncompactedArr.findIndex((value) => {return value === '.'});

    uncompactedArr[indexFirstEmptyBlock] = blockToMove;
}

const compacted = uncompactedArr;
console.log(compacted);

let res = 0;
compacted.forEach((block, index) => {
    res += parseInt(block) * index;
})

console.log(res);
