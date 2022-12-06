{
  let letters = []
  const init = () => {
    letters = generateAlphabet()
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const rucksacks = data.split('\n').map(rucksack => rucksack.split(''))

      // PART 1
      output(1, partOne(rucksacks))

      // PART 2
      output(2, partTwo(rucksacks))
    })
  }

  const partOne = rucksacks => {
    const rucksackCompartments = rucksacks.map(rucksack => {
      const half = Math.ceil(rucksack.length / 2)
      return [
        rucksack.slice(0, half),
        rucksack.slice(half)
      ]
    })
    const commonTypes = rucksackCompartments.map(findCommon)
    const totalPriorities = commonTypes.reduce((total, currentType) => total + letters.indexOf(currentType) + 1, 0)

    return totalPriorities
  }

  const partTwo = rucksacks => {
    const groups = chunkRucksacks(rucksacks, 3)
    const commonTypes = groups.map(findCommonInGroup)
    return commonTypes.reduce((total, current) => total + letters.indexOf(current) + 1, 0)
  }

  const generateAlphabet = () => {
    const numbers = [...Array(26)]
    const lowerCase = numbers.map((_, i) => String.fromCharCode(i + 97))
    const upperCase = numbers.map((_, i) => String.fromCharCode(i + 65))
    return lowerCase.concat(upperCase)
  }

  const findCommon = rucksack => {
    return rucksack[0].filter(type => rucksack[1].includes(type))[0]
  }

  const findCommonInGroup = group => {
    let common = group[0]
    for (let i = 1; i < group.length; i++) {
      common = common.filter(type => group[i].includes(type))
    }
    return common[0]
  }

  const chunkRucksacks = (rucksacks, chunkSize) => {
    return rucksacks.reduce((chunked, rucksack, index) => {
      const currentChunk = Math.floor(index / chunkSize)
      if (! chunked[currentChunk]) {
        chunked[currentChunk] = []
      }

      chunked[currentChunk].push(rucksack)
      return chunked
    }, [])
  }

  /* Show output on html page and make it easy to copy */
  const output = (part, output) => {
    const $container = document.querySelector('.js-output')

    const $section = document.createElement('section')
    const $title = document.createElement('h2')
    const $output = document.createElement('pre')

    $title.textContent = `Part ${part}`
    $output.textContent = output

    $output.addEventListener('click', e => {
      window.navigator.clipboard.writeText(e.currentTarget.textContent)
    })

    $section.appendChild($title)
    $section.appendChild($output)

    $container.appendChild($section)
  }

  init()
}