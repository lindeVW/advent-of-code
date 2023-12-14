import { Solver } from './Solver.js'

{
	const init = () => {
	  window.fetch('./example.txt')
		.then(rawData => rawData.text())
		.then(data => {
			const solver = new Solver(data)
			solver.partOne()
			solver.partTwo()
	  })
	}
  
	init()
  }
  