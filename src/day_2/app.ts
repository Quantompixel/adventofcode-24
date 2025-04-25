import * as fs from 'fs';

// const path = './src/day_2/input/example.txt';
const path = './src/day_2/input/input.txt';

const file = fs.readFileSync(path, 'utf8');
const lines = file.trim().split('\r\n');

const reports: number[][] = []

let safeReports = 0;

lines.forEach((value) => reports.push(value.split(' ').map(value => parseInt(value))));

reports.forEach(report => {
    if (checkReport(report)) {
        safeReports++;
    }
});

function checkReport(report: number[]): boolean {
    let problemDampenerAvailable = true;
    let isIncreasing: null | boolean = null;

    const check = (report: number[]) => {

        for (let index = 0; index < report.length - 1; index++) {
            const useProblemDampener = () => {
                if (!problemDampenerAvailable) return false;
                problemDampenerAvailable = false;

                for (let i = 0; i < report.length; i++) {
                    isIncreasing = null;
                    const sliced = report.slice(0, i).concat(report.slice(i + 1, report.length));
                    if (check(sliced)) return true;
                }

                return false;
            }

            const currentValue = report[index];
            const nextValue = report[index + 1];

            const diff = currentValue - nextValue;

            if (isIncreasing == null) {
                isIncreasing = diff > 0;
            }

            if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
                console.log(report, currentValue, nextValue, 'unsafe because diff', Math.abs(currentValue - nextValue) ,'not in boundaries');
                return useProblemDampener();

            }

            if (diff < 0 && isIncreasing) {
                console.log(report, currentValue, nextValue, 'unsafe not decreasing');
                return useProblemDampener();

            }

            if (diff > 0 && !isIncreasing) {
                console.log(report, currentValue, nextValue, 'unsafe not increasing');
                return useProblemDampener();

            }
        }

        console.log(report, 'save')
        return true;
    }

    return check(report);
}

console.log('safe reports: ', safeReports);

