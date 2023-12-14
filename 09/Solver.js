import { AdventOfCode } from "../AdventOfCode.js";

export class Solver extends AdventOfCode {
	constructor(data) {
		super(9, data)
		this.data = this.data.map(line => line.split(' ').map(str => +str))
	}

	partOne() {
		const nextValues = this.data.map(history => this.getNextInSequence(history))
		this.output(this.sum(nextValues))
	}

	partTwo() {
		const previousValues = this.data.map(history => this.getPreviousInSequence(history))
		this.output(this.sum(previousValues))
	}

	getNextInSequence(history) {
		const parsedHistory = this.parseHistory(history)
		let inc = 0
		for (let i = parsedHistory.length - 2; i >= 0; i--) {
			const previous = parsedHistory[i][parsedHistory[i].length - 1]
			inc += previous
		}
		return inc
	}

	getPreviousInSequence(history) {
		const parsedHistory = this.parseHistory(history)
		let dec = 0
		for (let i = parsedHistory.length - 2; i >= 0; i--) {
			const next = parsedHistory[i][0]
			dec = next - dec
		}
		return dec
	}

	parseHistory(history) {
		const differences = [history]
		
		let step = 0
		let sequenceAllZeroes = false
		while (step < 100 && !sequenceAllZeroes) {
			sequenceAllZeroes = true
			const currentStep = differences[step]
			const currentSequence = []
			for (let i = 1; i < currentStep.length; i++) {
				const diff = currentStep[i] - currentStep[i - 1]
				currentSequence.push(diff)
				if (sequenceAllZeroes && diff !== 0) {
					sequenceAllZeroes = false
				}
			}
			differences.push(currentSequence)
			step++
		}
		return differences
	}
}
