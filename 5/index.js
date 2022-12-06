{
  // indexes in parsed instructions
  const AMOUNT = 0
  const FROM = 1
  const TO = 2

  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const input = data.split('\n')
      const empty = input.findIndex(item => item == '')
      const stacks = formatStacks(input.slice(0, empty))
      const instructions = input.slice(empty + 1).map(instruction => {
        const parts = instruction.split(' ')
        return [
          +parts[1], // amount
          parts[3] - 1, // from
          parts[5] - 1 // to
        ]
      })

      // PART 1
      output(1, partOne(stacks, instructions))

      // PART 2
      output(2, partTwo(stacks, instructions))
    })
  }

  const formatStacks = data => {
    const lastIndex = data[data.length - 1].slice(-2) - 1
    const maxHeight = data.length - 1
    const stacks = []

    for (let stackIndex = 0; stackIndex <= lastIndex; stackIndex++) {
      stacks[stackIndex] = []
      for (let height = 0; height < maxHeight; height++) {
        const strPos = stackIndex * 4 + 1
        const content = data[maxHeight - height - 1].substring(strPos, strPos + 1)
        if (content.trim()) {
          stacks[stackIndex][height] = content
        }
      }
    }
    return stacks
  }

  const partOne = (stacksStart, instructions) => {
    let stacks = [...stacksStart]
    instructions.forEach(instruction => {
      const toMove = stacks[instruction[FROM]].slice(0 - instruction[AMOUNT]).reverse()
      stacks[instruction[FROM]].splice(0 - instruction[AMOUNT])
      stacks[instruction[TO]].push(...toMove)
    })

    const topItems = stacks.reduce((items, stack) => items + stack.slice(-1), '')

    return topItems
  }

  const partTwo = (stacksStart, instructions) => {
    let stacks = [...stacksStart]
    instructions.forEach(instruction => {
      const toMove = stacks[instruction[FROM]].slice(0 - instruction[AMOUNT])
      stacks[instruction[FROM]].splice(0 - instruction[AMOUNT])
      stacks[instruction[TO]].push(...toMove)
    })

    const topItems = stacks.reduce((items, stack) => items + stack.slice(-1), '')

    return topItems
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
