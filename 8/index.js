{
  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const trees = data.split('\n').map(line => line.split('').map(tree => +tree))

      // PART 1
      const total = getVisibilities(trees).reduce((total, row) => total + row.reduce((rowTotal, tree) => rowTotal + tree, 0), 0)
      output(1, total)

      // PART 2
      const highestScore = calculateScenicScores(trees).reduce((highest, row) => {
        const highestInRow = row.reduce((highestInCurrentRow, score) => score > highestInCurrentRow ? score : highestInCurrentRow, 0)
        return highestInRow > highest ? highestInRow : highest
      }, 0)
      output('2', highestScore)
    })
  }

  const getVisibilities = trees => {
    const visibilityFromLeft = getVisibilityFromDirection(trees, trees.length - 1, 0)
    const visibilityFromTop = getVisibilityFromDirection(trees, 0, 0, true)
    const visibilityFromRight = getVisibilityFromDirection(trees, 0, trees[0].length - 1)
    const visibilityFromBottom = getVisibilityFromDirection(trees, trees.length - 1, 0, true)

    // Calculate total visibility
    const visibility = Array.from(Array(trees.length), () => new Array(trees[0].length))
    for (let rowIndex = 0; rowIndex < trees.length; rowIndex++) {
      for (let colIndex = 0; colIndex < trees[0].length; colIndex++) {
        visibility[rowIndex][colIndex] = visibilityFromLeft[rowIndex][colIndex] ||
          visibilityFromTop[rowIndex][colIndex] ||
          visibilityFromRight[rowIndex][colIndex] ||
          visibilityFromBottom[rowIndex][colIndex]
      }
    }

    return visibility
  }

  const getVisibilityFromDirection = (trees, startRow, startColumn, column = false) => {
    const visibilities = Array.from(Array(trees.length), () => new Array(trees[0].length))

    const rowIndexChange = startRow > 0 ? -1 : 1
    const columnIndexChange = startColumn > 0 ? -1 : 1
    if (column) {
      for (let colIndex = startColumn; colIndex < visibilities[0].length && colIndex >= 0; colIndex += columnIndexChange) {
        let maxHeight = -1
        for (let rowIndex = startRow; rowIndex < visibilities.length && rowIndex >= 0; rowIndex += rowIndexChange) {
          const tree = trees[rowIndex][colIndex]
          visibilities[rowIndex][colIndex] = tree > maxHeight
          if (tree > maxHeight) {
            maxHeight = tree
          }
        }
      }
    } else {
      for (let rowIndex = startRow; rowIndex < visibilities.length && rowIndex >= 0; rowIndex += rowIndexChange) {
        let maxHeight = -1
        for (let colIndex = startColumn; colIndex < visibilities[0].length && colIndex >= 0; colIndex += columnIndexChange) {
          const tree = trees[rowIndex][colIndex]
          visibilities[rowIndex][colIndex] = tree > maxHeight
          if (tree > maxHeight) {
            maxHeight = tree
          }
        }
      }
    }

    return visibilities
  }

  const calculateScenicScores = trees => {
    const scores = Array.from(Array(trees.length), () => new Array(trees[0].length))
    for (let rowIndex = 0; rowIndex < trees.length; rowIndex++) {
      for (let colIndex = 0; colIndex < trees[0].length; colIndex++) {
        if (rowIndex === 0 || colIndex === 0 || rowIndex === trees.length - 1 || colIndex == trees[0].length - 1) {
          // Trees at the outer border have a scenic score of 0
          scores[rowIndex][colIndex] = 0
        } else {
          scores[rowIndex][colIndex] = calculateDistance(trees, rowIndex, colIndex, 'top') * calculateDistance(trees, rowIndex, colIndex, 'right') * calculateDistance(trees, rowIndex, colIndex, 'bottom') * calculateDistance(trees, rowIndex, colIndex, 'left')
        }
      }
    }

    return scores
  }

  const calculateDistance = (trees, rowIndex, colIndex, direction) => {
    let distance = 1

    switch (direction) {
      case 'top':
        while (trees[rowIndex][colIndex] > trees[rowIndex - distance][colIndex] && (rowIndex - distance) > 0) {
          distance++
        }
        break
      case 'right':
        while (trees[rowIndex][colIndex] > trees[rowIndex][colIndex + distance] && (colIndex + distance) < trees.length - 1) {
          distance++
        }
        break
      case 'bottom':
        while (trees[rowIndex][colIndex] > trees[rowIndex + distance][colIndex] && (rowIndex + distance) < trees.length - 1) {
          distance++
        }
        break
      case 'left':
        while (trees[rowIndex][colIndex] > trees[rowIndex][colIndex - distance] && (colIndex - distance) > 0) {
          distance++
        }
        break
      default:
        break;
    }

    return distance
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
