import { AdventOfCode } from "../AdventOfCode.js";

export class Solver extends AdventOfCode {
	constructor(data) {
		super(7, data)
		this.data = this.data
			.map(line => line.split(' '))
			.map(parts => {
				const str = parts[0]
				const hand = {}
				str.split('').forEach(card => {
					if (!hand[card]) {
						hand[card] = 0
					}
	
					hand[card]++
				})
				return {
					str,
					hand,
					bid: +parts[1]
				}
			})
	}

	partOne() {
		const ordered = this.orderByHandType(this.data).map(handType => this.orderByHighCard(handType)).flat()
		this.output(this.sum(this.getCardBids(ordered)))
	}

	partTwo() {
		const ordered = this.orderByHandType(this.data, true).map(handType => this.orderByHighCard(handType, true)).flat()
		this.output(this.sum(this.getCardBids(ordered)))
	}

	orderByHandType(hands, jokers = false) {
		const handTypes = [...Array(7)].map(_ => [])
		hands.forEach(hand => {
			let jokersCount = 0
			const handCards = {...hand.hand}
			if (jokers && hand.str !== 'JJJJJ') {
				jokersCount = handCards.J || 0
				delete handCards.J
			}
			const handValues = Object.values(handCards).sort((val1, val2) => val2 - val1)
			if (jokers) {
				handValues[0] += jokersCount
			}
			const index = this.getHandType(handValues)
			handTypes[index].push(hand)
		})

		return handTypes
	}

	getHandType(values) {
		if (values[0] === 5) return 6
		if (values[0] === 4) return 5
		if (values[0] === 3)  {
			if (values[1] === 2) return 4
			return 3
		}
		if (values[0] === 2) {
			if (values[1] === 2) return 2
			return 1
		}
		return 0
	}

	orderByHighCard(hands, jokers = false) {
		const cardOptions = jokers
			? ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']
			: ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
		return hands.sort((hand1, hand2) => {
			const h1 = hand1.str.split('')
			const h2 = hand2.str.split('')
			let diff = 0
			while (diff === 0 && h1.length) {
				const card1 = h1.shift()
				const card2 = h2.shift()
				diff = cardOptions.indexOf(card1) - cardOptions.indexOf(card2)
			}
			return diff
		})
	}

	getCardBids(hands) {
		return hands.map((hand, index) => hand.bid * (index + 1))
	}
}
