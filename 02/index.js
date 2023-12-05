import { DayTwo } from "./DayTwo.js";

{
  const init = () => {
    window.fetch('./data.txt').then(data => data.text()).then(data => {
		const solver = new DayTwo(data)
		solver.partOne()
		solver.partTwo()
    })
  }

  init()
}
