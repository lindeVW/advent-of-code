import { AdventOfCode } from "../AdventOfCode.js";

export class DaySix extends AdventOfCode {
	constructor(data) {
		super(0, data)
	}

	partOne() {
		const times = [...this.data[0].matchAll(/\d+/g)]
		const distances = [...this.data[1].matchAll(/\d+/g)]
		const races = times.map((time, index) => ({
			time: +time[0],
			topDistance: +distances[index][0]
		}))
		const marginOfError = races.reduce((total, race) => {
			return total * this.calculateWaysToWin(race)
		}, 1)
		this.output(marginOfError)
	}

	partTwo() {
		const time = +this.data[0].replaceAll(' ', '').match(/\d+/)[0]
		const topDistance = +this.data[1].replaceAll(' ', '').match(/\d+/)[0]
		this.output(this.calculateWaysToWin({ time, topDistance }))
	}

	calculateWaysToWin(race) {
		// Time pressed needed to win is between the possible times used to get the max distance
		const minMax = this.getPossiblePressesForTopDistance(race)
		const minPressTime = minMax.min % 1 === 0 ? minMax.min + 1 : Math.ceil(minMax.min)
		const maxPressTime = minMax.max % 1 === 0 ? minMax.max - 1 : Math.floor(minMax.max)
		return maxPressTime - minPressTime + 1
	}

	getPossiblePressesForTopDistance(race) {
		// Solve quadratic equation for time pressed
		const sqrt = Math.sqrt(race.time * race.time - 4 * race.topDistance)
		return {
			min: (race.time - sqrt) / 2,
			max: (race.time + sqrt) / 2
		}
	}
}
