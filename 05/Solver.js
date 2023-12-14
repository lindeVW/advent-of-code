import { AdventOfCode } from "../AdventOfCode.js";

export class Solver extends AdventOfCode {
	constructor(data) {
		super(5, data)
		this.data = data // Work with the source string to more easily find start and end of maps
	}

	get seedsList() {
		return this.data
			.match(/seeds: (\d+\ *)+/)[0]
			.split(': ')[1]
			.split(' ')
			.map(str => +str)
	}

	get maps() {
		return [...this.data.matchAll(/\w+-to-\w+ map:(\n(\d+ *)+)+/g)]
			.map(mapStr => {
				return mapStr[0]
					.split(':\n')[1]
					.split('\n')
					.map(str => {
						const parts = str.split(' ')
						return {
							start: +parts[1],
							end: +parts[1] + +parts[2] - 1,
							transform: +parts[0] - +parts[1]
						}
					})
			})
	}

	get seedsRange() {
		const seedsRange = [...this.data.match(/seeds: (\d+\ *)+/)[0].split(': ')[1].matchAll(/\d+ \d+/g)]
			.map(arr => arr[0])
			.map(rangeStr => rangeStr.split(' ').map(num => +num))
			.map(rangeArr => ({
				start: rangeArr[0],
				end: rangeArr[0] + rangeArr[1] - 1,
				transform: 0
			}))

		return seedsRange
	}

	calculateTransformRanges() {
		let ranges = [...this.seedsRange]

		this.maps.forEach(map => {
			let splitRanges = []
			ranges.forEach(range => {
				const overlappingMaps = map.filter(mapRange => {
					// get maps intersecting with the transformed range
					return range.start + range.transform <= mapRange.end
						&& range.end + range.transform >= mapRange.start
				})
	
				let currentSplitRanges = [range]
				while (overlappingMaps.length) {
					const overlappingMap = overlappingMaps.shift()
					currentSplitRanges.forEach(currentRange => {
						const overlapRange = {
							start: Math.max(currentRange.start, overlappingMap.start - currentRange.transform),
							end: Math.min(currentRange.end, overlappingMap.end - currentRange.transform),
							transform: currentRange.transform + overlappingMap.transform
						}
						splitRanges.push(overlapRange)
			
						if (overlapRange.start > currentRange.start) {
							// If there's a part of the range remaining below the overlap start,
							// make a new range ending before the overlap start and keeping the transform
							currentSplitRanges.push({
								start: currentRange.start,
								end: overlapRange.start - 1,
								transform: currentRange.transform
							})
						}
			
						if (overlapRange.end < currentRange.end) {
							// If there's a part of the range remaining above the overlap start,
							// make a new range start after the overlap end and keeping the transform
							currentSplitRanges.push({
								start: overlapRange.end + 1,
								end: currentRange.end,
								transform: currentRange.transform
							})
						}
						
						currentSplitRanges.shift()
					})
				}
				splitRanges.push(...currentSplitRanges)
			})
			ranges = [...splitRanges]
		})

		return ranges
	}

	parseSeed(seed) {
		let value = seed
		this.maps.forEach(map => {
			value = this.retrieveMappedValue(value, map)
		})
		return value
	}

	retrieveMappedValue(source, map) {
		const destinationMap = map.filter(mapEntry => {
			return mapEntry.start <= source && mapEntry.end >= source
		})
		return destinationMap.length ? source + destinationMap[0].transform : source
	}

	parseMap(destination) {
		const regex = new RegExp(`\\w+-to-${destination} map:(\\n(\\d+ *)+)+`)
		return this.data
			.match(regex)[0]
			
	}
}
