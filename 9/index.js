{
  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const moves = data.split('\n').map(move => {
        const moveParts = move.split(' ')
        const direction = moveParts[0]
        const amount = +moveParts[1]

        return Array.from(Array(amount)).map(move => direction)
      }).flat()

      // PART 1
      // const rope1 = Array.from(Array(2)).map(knot => [0, 0])
      // const positionsPassed1 = moveRope(rope1, moves)
      // output(1, positionsPassed1.length)

      // PART 2
      const rope2 = Array.from(Array(10)).map(knot => [0, 0])
      const positionsPassed2 = moveRope(rope2, moves)
      output(2, positionsPassed2.length)
    })
  }

  const moveRope = (rope, moves) => {
    const positionsFinal = [[...rope[rope.length - 1]]]

    moves.forEach(direction => {
      rope[0] = movePoint(rope[0], direction)
      for (let i = 1; i < rope.length; i++) {
        distances = [rope[i - 1][0] - rope[i][0], rope[i - 1][1] - rope[i][1]]

        if ((Math.abs(distances[0]) > 0 && Math.abs(distances[1]) > 0) && (Math.abs(distances[0]) > 1 || Math.abs(distances[1]) > 1)) {
          rope[i][0] += distances[0] > 0 ? 1 : -1
          rope[i][1] += distances[1] > 0 ? 1 : -1
        } else {
          distances.forEach((distance, index) => {
            if (Math.abs(distance) > 1) {
              rope[i][index] += distance > 0 ? 1 : -1
            }
          })
        }
      }

      const finalPos = rope[rope.length - 1]
      if (positionsFinal.findIndex(pos => pos[0] === finalPos[0] && pos[1] === finalPos[1]) === -1) {
        positionsFinal.push([...finalPos])
      }
    })

    return positionsFinal
  }

  const movePoint = (point, direction) => {
    switch (direction) {
      case 'R':
        point[0]++
        break;
      case 'L':
        point[0]--
        break;
      case 'D':
        point[1]--
        break;
      case 'U':
        point[1]++
        break;
      default:
        break;
    }

    return point
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
