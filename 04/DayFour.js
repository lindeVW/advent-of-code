import { AdventOfCode } from "../AdventOfCode.js";

export class DayFour extends AdventOfCode {
	constructor(data) {
		super(4, data)
		this.data = this.data
		  .map((item, index) => {
			  const numbersStr = item.split(': ')[1]
			  const parts = numbersStr.split(' | ')
			  return {
				  index: index,
				  own: this.parseCardPart(parts[0]),
				  winning: this.parseCardPart(parts[1]),
				  count: 1
			  }
		  })
	}

	partOne() {
		const points = this.data.reduce((total, card) => total + this.calculateCardPoints(card), 0)
		this.output(points)
	}

	partTwo() {
		let totalRun = 0

		Object.keys(this.data).map(key => +key).forEach(key => {
		  const copies = this.getCardWinners(this.data[key]).length
		  for (let i = key + 1 ; i < copies + key + 1; i++) {
			  this.data[i].count += this.data[key].count
		  }
		  totalRun += this.data[key].count
		})
		this.output(totalRun)
	}

	parseCardPart (strPart) {
		return [...strPart.matchAll(/\d+/g)].map(num => +num[0])
	}
  
	getCardWinners (card) {
		return card.own.filter(number => card.winning.includes(number))
	}
  
	calculateCardPoints (card) {
		const points = this.getCardWinners(card).reduce((total, _) => total > 0 ? total * 2 : 1, 0)
		return points
	}
}
