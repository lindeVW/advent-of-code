{
  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const measurements = data.split('\n').map(el => +el)
      // const measurements = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

      // PART 1
      const total = countIncreases(measurements)
      console.log('PART 1: ', total)

      // PART 2
      const windows = []
      for (let i = 0; i < measurements.length - 2; i++) {
        windows.push(measurements[i] + measurements[i + 1] + measurements[i + 2])
      }
      const windowsIncreases = countIncreases(windows)
      console.log('PART 2: ', windowsIncreases)
    })
  }

  const countIncreases = measurements => {
    return measurements.reduce((total, value, index, array) => {
      return array[index] > array[index - 1] ? total + 1 : total
    }, 0)
  }

  init()
}
