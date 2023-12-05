import { DayOne } from './DayOne.js'

{
	const init = () => {
	  window.fetch('./example.txt')
		.then(rawData => rawData.text())
		.then(data => {
			const solver = new DayOne(data)
			solver.partOne()
		  
			// PART 2
			solver.partTwo()
	  })
	}
  
	init()
  }
  