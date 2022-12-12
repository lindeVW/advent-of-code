{
  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const instructions = data
        .split('\n')
        .map(instruction => instruction.split(' ').map((part, index) => index === 1 ? +part : part))

      // PART 1
      const interestingSignalStrengths = run(instructions)
      output('1', interestingSignalStrengths.reduce((total, current) => total + current, 0))

      // PART 2
      const pixels = draw(instructions)
      visualize(pixels)
    })
  }

  const run = instructions => {
    let cycle = 0
    let x = 1

    let signalStrengths = []
    let interesting = 20

    instructions.forEach(instruction => {
      cycle += instruction[0] === 'noop' ? 1 : 2
      if (cycle >= interesting) {
        signalStrengths.push(interesting * x)
        interesting += 40
      }

      if (instruction[0] === 'addx') {
        x += instruction[1]
      }
    })

    return signalStrengths
  }

  const draw = instructions => {
    const ROW_LENGTH = 40

    let wait = 0 // Time until an instruction finishes executing
    let instruction // Instruction currently executing

    let drawX = -1
    let drawY = 0
    let spriteX = 1

    let pixels = [[]]

    while (instructions.length > 0) {
      // START EXECUTING INSTRUCTION
      if (!instruction) {
        instruction = instructions.shift()
        wait = instruction[0] === 'noop' ? 1 : 2
      }

      // DRAW
      drawX++

      if (drawX >= ROW_LENGTH) { // start new row when at the end of the current one
        drawY++
        drawX = 0
        pixels.push([])
      }

      const pixel = drawX - spriteX <= 1 && drawX - spriteX >= -1
      pixels[drawY].push(pixel)

      // FINISH EXECUTING INSTRUCTION
      wait--

      if (wait <= 0) {
        if (instruction[0] === 'addx') {
          spriteX += instruction[1]
        }

        instruction = false
      }
    }

    return pixels
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

  const visualize = pixels => {
    const $container = document.querySelector('.js-output')
    const $display = document.createElement('section')

    pixels.forEach(row => {
      const $row = document.createElement('div')
      $row.classList.add('row')

      row.forEach(pixel => {
        const $pixel = document.createElement('div')
        $pixel.classList.add('pixel')

        if (pixel) {
          $pixel.classList.add('lit')
        }

        $row.appendChild($pixel)
      })

      $display.appendChild($row)
    })

    $container.appendChild($display)
  }

  init()
}
