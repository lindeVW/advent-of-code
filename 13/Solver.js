import { AdventOfCode } from "../AdventOfCode.js";

export class Solver extends AdventOfCode {
	constructor(data) {
		super(13, data)
		this.data = data
			.split('\n\n')
			.map(pattern => pattern
				.split('\n')
				.map(line => line.split(''))
			)
	}

	partOne() {
		const reflectionLines = this.data.map(pattern => ({
			h: this.findHorizontalReflection(pattern),
			v: this.findVerticalReflection(pattern)
		}))

		const summary = reflectionLines.reduce((summaryObj, reflections) => {
			return {
				h: summaryObj.h + reflections.h,
				v: summaryObj.v + reflections.v
			}
		}, {h: 0, v: 0})
		this.output(summary.v + (100 * summary.h))
	}

	partTwo() {
		const cols = this.data.reduce((total, pattern) => total += this.findVerticalReflectionDifferences(pattern), 0)
		const rows = this.data.reduce((total, pattern) => total += this.findHorizontalReflectionDifferences(pattern), 0)
		this.output(cols + (100 * rows))
	}

	findHorizontalReflection(pattern) {
		let i = 0
		let mirrorLine = null
		while (mirrorLine === null && i < pattern.length - 1) {
			let top = i
			let bottom = i + 1
			let isMirrored = true
			
			while (isMirrored && top >= 0 && bottom < pattern.length) {
				if (!this.arrEqual(pattern[top], pattern[bottom])) {
					isMirrored = false
				}
				top--
				bottom++
			}

			if (isMirrored) {
				mirrorLine = i
			}

			i++
		}
		
		return mirrorLine === null ? null : mirrorLine + 1
	}

	findVerticalReflection(pattern) {
		let i = 0
		let mirrorLine = null
		while (mirrorLine === null && i < pattern[0].length - 1) {
			let left = i
			let right = i + 1
			let isMirrored = true

			while (isMirrored && left >= 0 && right < pattern[0].length) {
				if (!this.arr2dColEqual(pattern, left, right)) {
					isMirrored = false
				}

				left--
				right++
			}

			if (isMirrored) {
				mirrorLine = i
			}
		
			i++
		}

		return mirrorLine === null ? null : mirrorLine + 1
	}

	findHorizontalReflectionDifferences(pattern) {
		let i = 0
		let mirrorLine = null
		while (mirrorLine === null && i < pattern.length - 1) {
			let top = i
			let bottom = i + 1
			let differences = 0
			
			while (differences < 2 && top >= 0 && bottom < pattern.length) {
				for (let col = 0; col < pattern[top].length; col++) {
					if (pattern[top][col] !== pattern[bottom][col]) differences++
				}
				top--
				bottom++
			}

			if (differences === 1) {
				mirrorLine = i
			}

			i++
		}
		
		return mirrorLine === null ? null : mirrorLine + 1
	}

	findVerticalReflectionDifferences(pattern) {
		let i = 0
		let mirrorLine = null
		while (mirrorLine === null && i < pattern[0].length - 1) {
			let left = i
			let right = i + 1
			let differences = 0
			
			while (differences < 2 && left >= 0 && right < pattern[0].length) {
				for (let row = 0; row < pattern.length; row++) {
					if (pattern[row][left] !== pattern[row][right]) differences++
				}
				left--
				right++
			}

			if (differences === 1) {
				mirrorLine = i
			}

			i++
		}
		
		return mirrorLine === null ? null : mirrorLine + 1
	}
}
