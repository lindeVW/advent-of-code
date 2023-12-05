import { DayFour } from "./DayFour.js"

{
  const init = () => {
    window.fetch('./data.txt').then(data => data.text()).then(data => {
		const solver = new DayFour(data)
		solver.partOne()
		solver.partTwo()
    })
  }

  init()
}
