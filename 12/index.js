{
  // constants for row/column indexes
  const ROW = 0
  const COL = 1

  const init = () => {
    window.fetch('example.txt').then(data => data.text()).then(data => {
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
      const distancesFromStart = runAlgorithm(map, start)
      output(1, distancesFromStart[end[ROW]][end[COL]])

      // PART 2
      const distancesFromEnd = runAlgorithm(map, end, false)
      let shortestDistance = Number.POSITIVE_INFINITY
      distancesFromEnd.forEach((currentRow, x) => {
        currentRow.forEach((distance, y) => {
          if (distance < shortestDistance && map[x][y] === 0) {
            shortestDistance = distance
          }
        })
      })
      output(2, shortestDistance)
    })
  }

  const runAlgorithm = (heights, start, up = true) => {
    const distances = Array.from(Array(heights.length), () => Array.from(Array(heights[0].length), () => Number.POSITIVE_INFINITY))
    const visited = Array.from(Array(heights.length), () => Array.from(Array(heights[0].length), () => false))

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

    return distances
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

  init()
}
