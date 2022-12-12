{
  // constants for row/column indexes
  const ROW = 0
  const COL = 1

  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      let start
      let end

      const map = data.split('\n').map((line, row) => line.split('').map((letter, column) => {
        if (letter === 'S') {
          start = [row, column]
          return 0
        }
        if (letter === 'E') {
          end = [row, column]
          return 25
        }

        return letter.charCodeAt(0) - 97
      }))

      // PART 1
      const resultsFromStart = runAlgorithm(map, start)
      output(1, resultsFromStart.distances[end[ROW]][end[COL]])

      // PART 2
      const resultsFromEnd = runAlgorithm(map, end, false)
      let shortestDistance = Number.POSITIVE_INFINITY
      let closestStart = false
      resultsFromEnd.distances.forEach((currentRow, x) => {
        currentRow.forEach((distance, y) => {
          if (distance < shortestDistance && map[x][y] === 0) {
            shortestDistance = distance
            closestStart = [x, y]
          }
        })
      })
      output(2, shortestDistance)

      // VISUALIZE
      visualize(map, 0, 25, getPath(resultsFromStart.previousSpots, start, end))
      visualize(map, 0, 25, getPath(resultsFromEnd.previousSpots, end, closestStart), false)
    })
  }

  const runAlgorithm = (heights, start, up = true) => {
    const distances = Array.from(Array(heights.length), () => Array.from(Array(heights[0].length), () => Number.POSITIVE_INFINITY))
    const visited = Array.from(Array(heights.length), () => Array.from(Array(heights[0].length), () => false))
    const previousSpots = Array.from(Array(heights.length), () => Array.from(Array(heights[0].length), () => false))

    let current = start
    distances[current[ROW]][current[COL]] = 0

    while (current && visited.filter(row => row.filter(pos => !pos).length > 0).length > 0) {
      const neighbours = getNeighbours(current, heights.length, heights[0].length)
      const currentHeight = heights[current[ROW]][current[COL]]
      const distance = distances[current[ROW]][current[COL]] + 1

      if (neighbours.length) {
        neighbours.forEach(point => {
          const height = heights[point[ROW]][point[COL]]
          if ((up && height - currentHeight <= 1) || (!up && height - currentHeight >= -1)) {
            if (distances[point[ROW]][point[COL]] > distance) {
              distances[point[ROW]][point[COL]] = distance
              previousSpots[point[ROW]][point[COL]] = current
            }
          }
        })
      }

      visited[current[ROW]][current[COL]] = true

      let lowest
      let lowestDistance = Number.POSITIVE_INFINITY
      distances.forEach((currentRow, x) => {
        currentRow.forEach((distance, y) => {
          if (distance < lowestDistance && !visited[x][y]) {
            lowest = [x, y]
            lowestDistance = distance
          }
        })
      })
      current = lowest
    }

    return { distances, previousSpots }
  }

  const getPath = (pathVars, start, end) => {
    const path = []
    let current = end
    let fallbackCount = 1000

    while (!(current[ROW] === start[ROW] && current[COL] === start[COL]) && fallbackCount > 0) {
      path.push(current)
      current = pathVars[current[ROW]][current[COL]]
      fallbackCount--
    }

    return path
  }

  const getLocationId = location => `${location[ROW]}-${location[COL]}`

  const getNeighbours = (current, maxRow, maxCol) => {
    const x = current[ROW]
    const y = current[COL]
    const neighbours = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]

    const filtered = neighbours.filter(neighbour => {
      if (neighbour[ROW] < 0) return false
      if (neighbour[ROW] >= maxRow) return false
      if (neighbour[COL] < 0) return false
      if (neighbour[COL] >= maxCol) return false
      return true
    })

    return filtered
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

  const mapNumber = (number, startRange, endRange) => (number - startRange[0]) * (endRange[1] - endRange[0]) / (startRange[1] - startRange[0]) + endRange[0]

  const visualize = (map, lowest, highest, marked, reversePath = true) => {
    const $container = document.querySelector('.js-visualize')
    const $map = document.createElement('section')

    map.forEach((row, x) => {
      const $row = document.createElement('div')
      $row.classList.add('row')

      row.forEach((tile, y) => {
        const $pixel = document.createElement('div')
        $pixel.classList.add('pixel')

        const hue = Math.round(mapNumber(tile, [lowest, highest], [100, 0]))
        const saturation = Math.round(mapNumber(tile, [lowest, highest], [70, 85]))
        // const saturation = 0
        const lightness = Math.round(mapNumber(tile, [lowest, highest], [30, 50]))

        $pixel.classList.add('range')
        $pixel.style.setProperty('--background', `hsl(${hue}, ${saturation}%, ${lightness}%)`)

        const markedIndex = marked.findIndex(point => point[ROW] === x && point[COL] === y)
        if (markedIndex > -1) {
          window.setTimeout(() => {
            $pixel.classList.add('marked')
          }, reversePath ? 50 * (marked.length - markedIndex) : 50 * markedIndex)
          if ((markedIndex === 0) || (markedIndex === marked.length - 1)) {
            $pixel.classList.add('marked')
            $pixel.classList.add('big')
          }
        }

        $row.appendChild($pixel)
      })

      $map.appendChild($row)
    })

    $container.appendChild($map)
  }

  init()
}
