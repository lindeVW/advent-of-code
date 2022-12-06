{
  const init = () => {
    window.fetch('./data.txt').then(data => data.text()).then(data => {
      const elves = data.split('\n\n').map(elf => elf.split('\n').map(calories => +calories))
      const totals = elves.map(elf => elf.reduce((total, current) => total + current))

      // PART 1
      const max = totals.reduce((max, current) => current > max ? current : max, 0)
      output(1, max)

      // PART 2
      const topThreeTotal = totals.sort((a, b) => b - a).slice(0, 3).reduce((total, current) => total + current, 0)
      output(2, topThreeTotal)
    })
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
