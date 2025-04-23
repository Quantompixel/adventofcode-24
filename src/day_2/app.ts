import * as fs from 'fs';

const path = './src/day_2/input/example.txt';
// const path = './src/day_2/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split('\r\n');

let reports: number[][] = []

let safeReports = 0;

lines.forEach((value) => reports.push(value.split(' ').map(value => parseInt(value))));

reports.forEach(report => {
    if (checkReport(report)) {
        safeReports++;
    }
});

function checkReport(report: number[]) {
    let isIncreasing: null | boolean = null;
    console.log(report);
    for (let index = 0; index < report.length; index++) {
        let currentValue = report[index];
        let previousValue = index === 0 ? null : report[index - 1];
        if (previousValue == null) continue;

        let diff = previousValue - currentValue;

        if (isIncreasing == null) {
            isIncreasing = diff > 0;
        }

        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            console.log('unsafe because diff not in boundaries');
            return false;
        }

        if (diff < 0 && isIncreasing) {
            console.log(previousValue, currentValue, 'unsafe not increasing');
            return false;
        }

        if (diff > 0 && !isIncreasing) {
            console.log(previousValue, currentValue, 'unsafe not decreasing');
            return false;
        }
    }

    return true;
}

console.log('safe reports: ', safeReports);

