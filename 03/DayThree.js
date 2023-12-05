import { AdventOfCode } from "../AdventOfCode.js";

export class DayThree extends AdventOfCode {
	constructor(data) {
		super(3, data)
		this.padSchematic()
	}

	padSchematic() {
		this.data = this.data.map(item => `.${item}.`)
		const emptyRow = [...Array(this.data[0].length)].map(_ => '.').join('')
		this.data.push(emptyRow)
		this.data.unshift(emptyRow)
	}

	partOne() {
		this.numbers = this.data.reduce((parsedNumbers, line, lineIndex) => {
		  const regex = /\d+/g
		  let match
		  while(match = regex.exec(line)) {
			  // store number as string and it's x-y position
			  parsedNumbers.push({
				  pos: [match.index, lineIndex],
				  value: match[0]
			  })
		  }
		  return parsedNumbers
		}, [])
		const partNumbers = this.numbers.filter((number) => (
			!!this.hasSymbolAround(number.pos, number.value.length, this.data, /[^\w\s\d.]/)
		))
		const total = partNumbers.reduce((sum, nr) => sum + +(nr.value), 0)
		this.output(total)
	}

	partTwo() {
		const starPositions = this.data.reduce((positions, line, lineIndex) => {
		  const regex = /\*/g;
		  let match
		  while (match = regex.exec(line)) {
			  // store an x-y array of the star position
			  positions.push([match.index, lineIndex])
		  }
		  return positions
		}, [])
		const gearRatios = starPositions.reduce((ratios, star) => {
		  const numbersAround = this.numbers.filter(num => {
			  // Star position
			  const x = star[0]
			  const y = star[1]
  
			  // Rectangle around num
			  const xStart = num.pos[0] - 1
			  const xEnd = xStart + num.value.length + 1
			  const yStart = num.pos[1] - 1
			  const yEnd = num.pos[1] + 1
			  
			  return (x <= xEnd && x >= xStart && y <= yEnd && y >= yStart) 
		  })
		  if (numbersAround.length === 2) {
			  ratios.push(numbersAround[0].value * numbersAround[1].value)
		  }
		  return ratios;
		}, [])
  
		this.output(this.sum(gearRatios))
	}

	hasSymbolAround (pos, length, schematic, match) {
	  const x = pos[0]
	  const y = pos[1]
  
	  const xStart = x - 1
	  const xEnd = x + length
  
	  const above = y > 0 ? schematic[y - 1].slice(xStart, xEnd + 1) : null;
	  const below = y < schematic.length - 1 ? schematic[y + 1].slice(xStart, xEnd + 1) : null;
	  const left = xStart !== x ? schematic[y][xStart] : null;
	  const right = xEnd < schematic[y].length - 1 ? schematic[y][xEnd] : null;
  
	  const matchesSymbol = `${above}.${below}.${left}.${right}`.match(match)
	  return matchesSymbol
	}
}
