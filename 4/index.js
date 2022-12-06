{
  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const assignments = data.split('\n').map(pair => pair.split(',').map(assignment => assignment.split('-').map(spot => +spot)))

      // PART 1
      output(1, partOne(assignments))

      // PART 2
      output(2, partTwo(assignments))
    })
  }

  const partOne = assignments => {
    const amountContaining = assignments.reduce((amountContaining, pair) => {
      const containing = doAssignmentsContainTheOther(pair)

      if (containing) {
        return amountContaining + 1
      }
      return amountContaining
    }, 0)
    return amountContaining
  }

  const doAssignmentsContainTheOther = pair => {
    return (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) ||
      (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][1])
  }

  const partTwo = assignments => {
    const amountOverlapping = assignments.reduce((amountOverlapping, pair) => {
      const overlapping = doAssignmentsOverlap(pair)

      if (overlapping) {
        return amountOverlapping + 1
      }
      return amountOverlapping
    }, 0)
    return amountOverlapping
  }

  const doAssignmentsOverlap = pair => {
    return !((pair[0][0] < pair[1][0] && pair[0][1] < pair[1][0]) || (pair[1][0] < pair[0][0] && pair[1][1] < pair[0][0]))
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
