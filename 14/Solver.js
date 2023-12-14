import { AdventOfCode } from "../AdventOfCode.js";

export class Solver extends AdventOfCode {
	constructor(data) {
		super(0, data)
		this.data = this.data.map(line => line.split(''))
	}

	partOne() {
		let loadTotal = 0
		for (let x = 0; x < this.data[0].length; x++) {
			let lastFixed = -1
			for (let y = 0; y < this.data.length; y++) {
				const content = this.data[y][x]
				if (content === '#') lastFixed = y
				if (content === 'O') {
					lastFixed++
					loadTotal += this.data.length - lastFixed
				}
			}
		}
		this.output(loadTotal)
	}

	partTwo() {
		const spinned = this.runSpins(this.data, 1000000000)
		this.output(this.calculateLoad(spinned))
	}

	runSpins(grid, amount) {
		const cache = {}
		let i = 0
		let cycle = false
		while (i < amount && !cycle) {
			const key = this.stringifyGrid(grid)
			if (cache[key]) {
				cycle = cache[key]
			} else {
				grid = this.spinCycle(grid)
				cache[key] = i
				i++
			}
		}

		const rest = (amount - i) % (i - cycle)
		for (let run = 0; run < rest; run++) {
			grid = this.spinCycle(grid)
		}

		return grid
	}

	stringifyGrid(grid) {
		return grid.map(line => line.join('')).join(';')
	}

	spinCycle(grid) {
		grid = this.north(grid)
		grid = this.west(grid)
		grid = this.south(grid)
		grid = this.east(grid)

		return grid
	}

	north(grid) {
		for (let x = 0; x < grid[0].length; x++) {
			let lastFixed = -1
			for (let y = 0; y < grid.length; y++) {
				const content = grid[y][x]
				if (content === '#') lastFixed = y
				if (content === 'O') {
					lastFixed++
					grid[y][x] = '.'
					grid[lastFixed][x] = 'O'
				}
			}
		}
		return grid
	}

	east(grid) {
		for (let y = 0; y < grid.length; y++) {
			let lastFixed = grid[0].length
			for (let x = grid[0].length - 1; x >= 0; x--) {
				const content = grid[y][x]
				if (content === '#') lastFixed = x
				if (content === 'O') {
					lastFixed--
					grid[y][x] = '.'
					grid[y][lastFixed] = 'O'
				}
			}
		}
		return grid
	}

	south(grid) {
		for (let x = 0; x < grid[0].length; x++) {
			let lastFixed = grid.length
			for (let y = grid.length - 1; y >= 0; y--) {
				const content = grid[y][x]
				if (content === '#') lastFixed = y
				if (content === 'O') {
					lastFixed--
					grid[y][x] = '.'
					grid[lastFixed][x] = 'O'
				}
			}
		}
		return grid
	}

	west(grid) {
		for (let y = 0; y < grid.length; y++) {
			let lastFixed = -1
			for (let x = 0; x < grid[0].length; x++) {
				const content = grid[y][x]
				if (content === '#') lastFixed = x
				if (content === 'O') {
					lastFixed++
					grid[y][x] = '.'
					grid[y][lastFixed] = 'O'
				}
			}
		}
		return grid
	}

	calculateLoad(grid) {
		let load = 0
		grid.forEach((line, y) => {
			line.forEach(cell => {
				if (cell === 'O') {
					load += grid.length - y
				}
			})
		})
		return load
	}
}
