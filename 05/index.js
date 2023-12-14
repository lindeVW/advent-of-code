import { Solver } from './Solver.js'

{
	const init = () => {
	  window.fetch('./example.txt')
		.then(rawData => rawData.text())
		.then(data => {
			const solver = new Solver(data)

			// PART 1
			const lowestLocation = solver.lowest(solver.seedsList.map(seed => solver.parseSeed(seed)))
			solver.output(1, lowestLocation)
		  
			// PART 2
			const transformedRanges = solver.calculateTransformRanges()
			const lowestInRanges = solver.lowest(transformedRanges.map(range => range.start + range.transform))
			solver.output(2, lowestInRanges)
	  })
	}
  
	init()
  }
  