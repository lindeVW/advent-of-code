{
  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const fishes = data.split(',').map(fish => +fish)

      const partOne = passDays([...fishes], 80)
      console.log(partOne.length)
    })
  }

  const passDays = (fishes, days) => {
    for (let i = 1; i <= days; i++) {
      for (let fish = 0; fish < fishes.length; fish++) {
        if (fishes[fish] === 0) {
          fishes.push(9)
          fishes[fish] = 6
        } else {
          fishes[fish]--
        }
      }
    }

    return fishes
  }

  init()
}
