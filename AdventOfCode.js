export class AdventOfCode {
	outputsRendered = 0

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

	lowest (arr) {
		return arr.reduce((lowest, current) => current < lowest ? current : lowest, arr[0])
	}

	highest (arr) {
		return arr.reduce((highest, current) => current > lowest ? current : lowest, arr[0])
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