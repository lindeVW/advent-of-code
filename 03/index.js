import { DayThree } from "./DayThree.js";

{
  const init = () => {
    window.fetch('./data.txt').then(data => data.text()).then(data => {
		const solver = new DayThree(data)
		solver.partOne()
		solver.partTwo()
    })
  }

  init()
}
