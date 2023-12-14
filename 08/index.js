import { Solver } from "./Solver.js"

{
  const init = () => {
    window.fetch('./data.txt').then(data => data.text()).then(data => {
		const solver = new Solver(data)
		// solver.partOne();
		solver.partTwo()
    })
  }

  init()
}
