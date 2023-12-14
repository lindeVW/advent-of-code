import { AdventOfCode } from "../AdventOfCode.js";

export class Solver extends AdventOfCode {
	constructor(data) {
		super(11, data)
		
		const rowsWithGalaxies = []
		const colsWithGalaxies = []
		this.data = this.data.map((line, row) => {
			const splitLine = line.split('')
			splitLine.forEach((cell, col) => {
				if (cell === '#') {
					if (!rowsWithGalaxies.includes(row)) rowsWithGalaxies.push(row)
					if (!colsWithGalaxies.includes(col)) colsWithGalaxies.push(col)
				}
			})
			return splitLine
		})

		this.mapWidth = this.data[0].length - 1
		this.mapHeight = this.data.length - 1

		this.rowsWithoutGalaxies = this.reverseList(rowsWithGalaxies, 0, this.mapHeight)
		this.colsWithoutGalaxies = this.reverseList(colsWithGalaxies, 0, this.mapWidth)
	}

	partOne() {
		const expandedGalaxy = this.expandGalaxy([...this.rowsWithoutGalaxies], [...this.colsWithoutGalaxies])

		const galaxies = []
		const distances = []
		expandedGalaxy.forEach((row, y) => {
			row.forEach((cell, x) => {
				if (cell === '#') {
					galaxies.forEach(galaxy => {
						distances.push(this.calculateDistance([x, y], galaxy))
					})
					galaxies.push([x, y])
				}
			})
		})

		this.output(this.sum(distances))
	}

	partTwo() {
		const galaxies = []
		const distances = []
		this.rowsWithoutGalaxies.reverse()
		this.colsWithoutGalaxies.reverse()
		this.data.forEach((row, y) => {
			row.forEach((cell, x) => {
				if (cell === '#') {
					let galaxyX = x
					let galaxyY = y
					this.rowsWithoutGalaxies.forEach(emptyRow => {
						if (emptyRow < galaxyY) galaxyY += 999999
					})
					this.colsWithoutGalaxies.forEach(emptyCol => {
						if (emptyCol < galaxyX) galaxyX += 999999
					})
					galaxies.forEach(galaxy => {
						distances.push(this.calculateDistance([galaxyX, galaxyY], galaxy))
					})
					galaxies.push([galaxyX, galaxyY])
				}
			})
		})
		this.output(this.sum(distances))
	}

	reverseList(list, min, max) {
		const reverse = []
		for (let i = min; i <= max; i++) {
			if (!list.includes(i)) reverse.push(i)
		}
		return reverse
	}

	expandGalaxy(rows, columns) {
		let map = [...this.data]
		const emptyRow = [...Array(this.mapWidth + 1)].map(_ => '.')

		rows.reverse().forEach(index => {
			map = this.insertAtIndex(map, index, emptyRow)
		})
		
		columns.reverse().forEach(index => {
			map = map.map(row => {
				return this.insertAtIndex(row, index, '.')
			})
		})

		return map
	}

	calculateDistance (point1, point2) {
		const xDistance = point1[0] > point2[0] ? point1[0] - point2[0] : point2[0] - point1[0]
		const yDistance = point1[1] > point2[1] ? point1[1] - point2[1] : point2[1] - point1[1]

		return xDistance + yDistance
	}
}
