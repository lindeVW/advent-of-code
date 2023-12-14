import { AdventOfCode } from "../AdventOfCode.js";

export class Solver extends AdventOfCode {
	constructor(data) {
		super(8, data)
		this.instructions = this.data.shift().split('')
		this.data.shift()
		this.locations = {}
		this.data.forEach(line => {
			const parts = line.split(' = ')
			const location = parts[0]
			const locationParts = parts[1].replaceAll(/\(|\)/g, '').split(', ')
			this.locations[location] = { 
				L: locationParts[0],
				R: locationParts[1]
			 }
		})
	}

	partOne() {
		this.output(this.getPathLength('AAA'))
	}

	partTwo() {
		const startingLocations = Object.keys(this.locations).filter(loc => loc.slice(-1) === 'A')
		const steps = startingLocations.map(location => this.getPathLength(location, false))
		const lcm = this.findLCM(steps)
		this.output(lcm)
	}

	getPathLength(start, fullyZ = true) {
		let steps = 0
		let location = start
		while((fullyZ && location !== 'ZZZ') || (!fullyZ && location.slice(-1) !== 'Z')) {
			const direction = this.instructions[steps % this.instructions.length]
			location = this.locations[location][direction]
			steps++
		}

		return steps
	}

	findLCM(pathLengths) {
		return pathLengths.reduce((multiple, current) => {
			if (!multiple) return current

			return this.lcm(multiple, current)
		}, null)
	}
}
