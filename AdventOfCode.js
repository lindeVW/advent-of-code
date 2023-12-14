export class AdventOfCode {
	outputsRendered = 0
	cache = {}

	constructor(day, data) {
		this.data = data.split('\n')
		this.day = day

		const $titles = document.querySelectorAll('title, h1')
		$titles.forEach($title => {
			$title.textContent = $title.textContent + ' | Day ' + day
		})
	}

	/* Adds up all numbers in an array */
	sum (arr) {
		return arr.reduce((total, current) => total + current, 0)
	}

	/* Returens the lowest number in an array of numbers */
	lowest (arr) {
		return arr.reduce((lowest, current) => current < lowest ? current : lowest, arr[0])
	}

	/* Returens the highest number in an array of numbers */
	highest (arr) {
		return arr.reduce((highest, current) => current > lowest ? current : lowest, arr[0])
	}

	arrEqual (arr1, arr2) {
		if (arr1.length !== arr2.length) return false
		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i] !== arr2[i]) return false
		}
		return true
	}

	arr2dColEqual (arr, col1, col2) {
		for (let row = 0; row < arr.length; row++) {
			if (arr[row][col1] !== arr[row][col2]) return false
		}
		return true
	}

	lcm(a, b) {
		return (a * b) / this.gcd(a, b)
	}

	gcd (a, b) {
		while (b) {
			const temp = b
			b = a % b
			a = temp
		}
		return a
	}

	/* Inserts an element in an array at a specifix index */
	insertAtIndex (arr, index, insert) {
		return [
			...arr.slice(0, index),
			insert,
			...arr.slice(index)
		]
	}

	memoize (func) {
		return (...args) => {
			const key = JSON.stringify(args)
			if (key in this.cache) {
				return this.cache[key]
			} else {
				const result = func(...args)
				this.cache[key] = result
				return result
			}
		}
	}

	/* Show output on html page and make it easy to copy */
	output (output) {
		this.outputsRendered++
		const $container = document.querySelector('.js-output')

		const $section = document.createElement('section')
		const $title = document.createElement('h2')
		const $output = document.createElement('pre')

		$title.textContent = `Part ${this.outputsRendered}`
		$output.textContent = output

		$output.addEventListener('click', e => {
			window.navigator.clipboard.writeText(e.currentTarget.textContent)
		})

		$section.appendChild($title)
		$section.appendChild($output)

		$container.appendChild($section)
	}
}