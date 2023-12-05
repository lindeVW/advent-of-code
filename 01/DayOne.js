import { AdventOfCode } from "../AdventOfCode.js";

export class DayOne extends AdventOfCode {
	static strDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

	constructor(data) {
		super(1, data)
	}

	partOne() {
		this.output(this.getCalibrationTotal())
	}

	partTwo() {
		this.output(this.getCalibrationTotalWithStrings())
	}

	getCalibrationTotal() {
		const numbers = this.data.map(line => {
			const digits = [...line.matchAll(/\d/g)];
			return +(digits[0] + digits[digits.length - 1]) || 0;
		})
		return this.sum(numbers)
	}

	getCalibrationTotalWithStrings() {
		const numbers = this.data.map(line => {
			const regex = new RegExp(DayOne.strDigits.join('|') + '|\\d');
			const firstDigit = line.match(regex)[0];
			const regexReverse = new RegExp(DayOne.strDigits.map(str => str.split('').reverse().join('')).join('|') + '|\\d');
			const lastDigit = line.split('').reverse().join('').match(regexReverse)[0].split('').reverse().join('');
			return +(this.parseDigit(firstDigit) + this.parseDigit(lastDigit));
		})
		return this.sum(numbers)
	}

	parseDigit(digit) {
		const value = DayOne.strDigits.indexOf(digit);
		if (value >= 0) {
			return `${value + 1}`;
		}
		return digit;
	}
}
