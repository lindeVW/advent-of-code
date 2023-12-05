import { DayZero } from "./DayZero.js"

{
  const init = () => {
    window.fetch('./data.txt').then(data => data.text()).then(data => {
		const solver = new DayZero(0, data)
		solver.partOne();
		solver.partTwo()
    })
  }

  init()
}
