{
  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const measurements = data.split('\n').map(el => +el)
      // const measurements = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

      // PART 1
      const increases = countIncreases(measurements)
      console.log('PART 1: ', increases)

      // PART 2
      const groups = []
      for (let i = 0; i < measurements.length - 2; i++) {
        groups.push(measurements[i] + measurements[i + 1] + measurements[i + 2])
      }
      const groupIncreases = countIncreases(groups)
      console.log('PART 2: ', groupIncreases)
    })
  }

  const countIncreases = measurements => {
    return measurements.reduce((total, current, index, array) => {
      return current > array[index - 1] ? total + 1 : total
    }, 0)
  }

  init()
}
