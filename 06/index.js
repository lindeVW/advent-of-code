import { DaySix } from "./DaySix.js"

{
  const init = () => {
    window.fetch('./data.txt').then(data => data.text()).then(data => {
		const solver = new DaySix(data)
		solver.partOne();
		solver.partTwo()
    })
  }

  init()
}
