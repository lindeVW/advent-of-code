{
  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const input = data.split('')
      // PART 1
      output(1, findMarker(input, 4))

      // PART 2
      output(2, findMarker(input, 14))
    })
  }

  const findMarker = (input, size) => {
    const markerGroup = Array(size)
    const doublesGroup = Array(size)
    let groupHasDouble = true
    let index = 0
    while (groupHasDouble && index < input.length) {
      markerGroup.shift()
      doublesGroup.shift()

      let hasDouble = false
      const doubleIndex = markerGroup.lastIndexOf(input[index])
      if (doubleIndex >= 0) {
        hasDouble = index - size - 1 + doubleIndex
      }

      doublesGroup.push(hasDouble)
      markerGroup.push(input[index])

      if (index > size - 2) {
        groupHasDouble = doublesGroup.reduce((hasDouble, i) => {
          if (hasDouble || ((i >= (index - size - 1)))) {
            return true
          } else {
            return false
          }
        }, false)
      }

      index++
    }
    return index
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
