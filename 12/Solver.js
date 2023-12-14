import { AdventOfCode } from "../AdventOfCode.js";

export class Solver extends AdventOfCode {
	constructor(data) {
		super(12, data)
		this.data = this.data.map(line => {
			const parts = line.split(' ')
			
			return {
				springs: parts[0],
				groups: parts[1].split(',').map(str => +str)
			}
		})
	}

	partOne() {
		const lineOptions = this.data.map(line => this.memoizedCount(line))
		this.output(this.sum(lineOptions))
	}

	partTwo() {
		const lineOptions = this.data
			.map(line => ({
				springs: [...Array(5)].map(_ => line.springs).join('?'),
				groups: [...Array(5)].map(_ => line.groups).flat()
			}))
		let total = 0
		lineOptions.forEach(line => {
			total += this.memoizedCount(line)
		})
		this.output(total)
	}

	memoizedCount(line) {
		return this.memoize(this.countWays.bind(this))(line)
	}

	countWays(line) {
		const { springs, groups } = line
		if (springs.length === 0) {
			if (groups.length === 0) return 1 // no springs or groups left, all ? are .
			return 0 // no springs left to satisfy groups
		}

		if (groups.length === 0) {
			for (let i = 0; i < springs.length; i++) {
				if (springs[i] === '#') return 0 // too many broken springs
			}
			return 1 // no broken springs left, all ? are .
		}

		if (springs.length < this.sum(groups) + groups.length - 1) {
			// not enough springs to make the different groups + gaps
			return 0
		}

		if (springs[0] === '.') {
			// Starts with working spring, ignore first and count rest
			return this.memoizedCount({springs: springs.slice(1), groups })
		}

		if (springs[0] === '#') {
			// Starts with broken spring, check if it can match the first group
			const leftOverGroups = [...groups]
			const currentGroup = leftOverGroups.shift()

			for (let i = 0; i < currentGroup; i++) {
				if (springs[i] === '.') return 0 // can't have . in group
			}
			if (springs[currentGroup] === '#') return 0 // group too long

			return this.memoizedCount({
				springs: springs.slice(currentGroup + 1),
				groups: leftOverGroups
			})
		}

		// Starts with unkown, get possibilities for both working and broken
		return this.memoizedCount({
			springs: `.${springs.slice(1)}`,
			groups
		}) + this.memoizedCount({
			springs: `#${springs.slice(1)}`,
			groups
		})
	}
}
