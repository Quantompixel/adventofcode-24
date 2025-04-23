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

function checkReport(report: number[]): boolean {
    let isIncreasing: null | boolean = null;
    let problemDampenerAvailable = true;

    console.log(report);
    const check: () => boolean = () => {
        for (let index = 0; index < report.length; index++) {
            const useProblemDampener = () => {
                if (!problemDampenerAvailable) return false;

                console.log('old', report)
                report.splice(index, 1);
                console.log('new', report);
                return check();
            }

            let currentValue = report[index];
            let previousValue = index === 0 ? null : report[index - 1];
            if (previousValue == null) continue;

            let diff = previousValue - currentValue;

            if (isIncreasing == null) {
                isIncreasing = diff > 0;
            }

            if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
                if (useProblemDampener()) return true;
                console.log('unsafe because diff not in boundaries');
                return false;
            }

            if (diff < 0 && isIncreasing) {
                if (useProblemDampener()) return true;
                console.log(previousValue, currentValue, 'unsafe not increasing');
                return false;
            }

            if (diff > 0 && !isIncreasing) {
                if (useProblemDampener()) return true;
                console.log(previousValue, currentValue, 'unsafe not decreasing');
                return false;
            }


        }

        return true;
    }

    return check();
}

console.log('safe reports: ', safeReports);

