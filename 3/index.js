{
  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const report = data.split('\n')

      // STEP 1
      const range = [0, report[0].length]
      const gamma = getValue(report, true, range)
      const delta = getValue(report, false, range)

      console.log(gamma, delta, gamma * delta)

      // STEP 2
      const oxygen = getRating(report)
      const co2 = getRating(report, false)

      console.log(oxygen, co2, oxygen * co2)
    })
  }

  const getValue = (report, getHighest, range) => {
    let value = ''
    for (let i = range[0]; i < range[1]; i++) {
      const digits = report.map(binary => binary.slice(i, i + 1))
      const oneAmount = digits.reduce((total, digit) => +digit === 1 ? ++total : total, 0)
      const zeroAmount = digits.reduce((total, digit) => +digit === 0 ? ++total : total, 0)
      if (getHighest) {
        value += oneAmount >= zeroAmount ? '1' : '0'
      } else {
        value += zeroAmount <= oneAmount ? '0' : '1'
      }
    }

    return parseInt(value, 2)
  }

  const getRating = (report, getHighest = true) => {
    let filteredValues = [...report]
    let index = 0
    while (filteredValues.length > 1 && index < report[0].length) {
      const neededDigit = getValue(filteredValues, getHighest, [index, index + 1])
      filteredValues = filteredValues.filter(value => +value.slice(index, index + 1) === neededDigit)
      index++
    }

    return parseInt(filteredValues[0], 2)
  }

  init()
}
