import { AdventOfCode } from "../AdventOfCode.js";

export class Solver extends AdventOfCode {
	static moves = {
		N: { x: 0, y: -1, direction: 'N' },
		E: { x: 1, y: 0, direction: 'E' },
		S: { x: 0, y: 1, direction: 'S' },
		W: { x: -1, y: 0, direction: 'W' }
	}
	static cornerShapes = ['L', 'J', 'F', '7']

	constructor(data) {
		super(10, data)
		const { N, E, S, W } = Solver.moves
		this.strData = this.data.map(line => line.split(''))
		this.data = this.data.map((line, y) => line.split('').map((cell, x) => {
			switch (cell) {
				case 'S':
					this.start = { x, y }
					return [ N, E, S, W ]
				case '|': return [ N, S ]
				case '-': return [ E, W ]
				case 'L': return [ N, E ]
				case 'J': return [ N, W ]
				case '7': return [ S, W ]
				case 'F': return [ E, S ]
				default: return []
			}
		}))
		this.replaceStart()
		this.size = {
			x: this.data[0].length,
			y: this.data.length
		}
	}

	partOne() {
		this.visited = []
		const queue = [this.start]
		while(queue.length) {
			const { x, y, distance } = queue.shift()
			const key = `${x}, ${y}`

			if (this.visited.includes(key)) continue
			this.visited.push(key)

			const moves = this.data[y][x]
			moves.forEach(move => {
				const newX = x + move.x
				const newY = y + move.y
	
				if (newX >= 0 &&
					newX < this.size.x &&
					newY >= 0 &&
					newY < this.size.y &&
					this.data[newY][newX].length &&
					!(newX === x && newY === y) &&
					this.isConnected(this.data[newY][newX].map(item => item.direction), move.direction)
				) {
					queue.push({ x: newX, y: newY, distance: distance + 1 })
				}
			})
		}

		this.output(Math.ceil((this.visited.length - 1) / 2))
	}

	partTwo() {
		let total = 0
		let inside = false
		let previousCorner = false
		for (let y = 0; y < this.size.y; y++) {
			for (let x = 0; x < this.size.x; x++) {
				if (this.visited.includes(`${x}, ${y}`)) {
					const pipeShape = this.strData[y][x]
					switch (pipeShape) {
						case '|':
							inside = !inside
							break;
						case 'L':
						case 'F':
							previousCorner = pipeShape
							break
						case '7':
							if (previousCorner === 'F') {
								previousCorner = false
							} else {
								inside = !inside
							}
							break
						case 'J':
							if (previousCorner === 'L') {
								previousCorner = false
							} else {
								inside = !inside
							}
							break
						default:
							break;
					}
					continue
				}

				if (inside) {
					total++
				}
			}
		}
		this.output(total)
	}

	formsU (shape1, shape2) {
		if (Solver.cornerShapes.indexOf(shape1) - Solver.cornerShapes.indexOf(shape2) === -1) {
			return true
		}
		return false
	}

	dfs (x, y, parent, count = 0) {
		if (this.start.x === x && this.start.y === y && this.visited.length) {
			this.loopLength = count
			return false
		}
		this.visited.push(`${x},${y}`)

		const moves = this.data[y][x]
		if (!parent || this.isConnected(moves.map(move => move.direction), parent.direction)) {
			moves.forEach(move => {
				const newX = x + move.x
				const newY = y + move.y
	
				if (newX >= 0 &&
					newX < this.size.x &&
					newY >= 0 &&
					newY < this.size.y &&
					this.data[newY][newX].length &&
					!(newX === parent?.x && newY === parent?.y)
				) {
					const result = this.dfs(newX, newY, { x, y, direction: move.direction }, count + 1)
					if (result) return result
				}
			})
		}

		return null
	}

	isConnected(connections, sourceDirection) {
		switch (sourceDirection) {
			case 'N': return connections.includes('S')
			case 'E': return connections.includes('W')
			case 'S': return connections.includes('N')
			case 'W': return connections.includes('E')
			default: return false;
		}
	}

	replaceStart() {
		const { x, y } = this.start
		let N = false
		let E = false
		let S = false
		let W = false

		const northConnections = ['|', 'F', '7']
		const eastConnections = ['-', 'J', '7']
		const southConnections = ['|', 'J', 'L']
		const westConnections = ['-', 'F', 'L']

		const northCell = this.strData[y - 1][x]
		const eastCell = this.strData[y][x + 1]
		const southCell = this.strData[y + 1][x]
		const westCell = this.strData[y][x - 1]
		
		if (northConnections.includes(northCell)) N = true
		if (eastConnections.includes(eastCell)) E = true
		if (southConnections.includes(southCell)) S = true
		if (westConnections.includes(westCell)) W = true

		let symbol = '.'
		if (N && S) symbol = '|'
		if (E && W) symbol = '-'
		if (N && E) symbol = 'L'
		if (E && S) symbol = 'F'
		if (S && W) symbol = '7'
		if (W && N) symbol = 'J'
		
		this.strData[y][x] = symbol
	}
}
