{
  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const lines = data.split('\n')
      const dirSizes = parseFilesystem(lines)

      // PART 1
      totalSizesBelow100000 = Object.values(dirSizes).reduce((total, size) => {
        if (size <= 100000) {
          return total + size
        }
        return total
      }, 0)
      output(1, totalSizesBelow100000)

      // PART 2
      const currentSize = dirSizes['/']
      const unusedSpace = 70000000 - currentSize
      const neededSpace = 30000000 - unusedSpace

      const possibleDirectories = Object.values(dirSizes)
        .filter(size => size >= neededSpace)
        .sort((a, b) => a - b)
      output(2, possibleDirectories[0])
    })
  }

  const parseFilesystem = lines => {
    const posInSystem = []
    const dirSizes = {'/': 0}

    lines.forEach(line => {
      if (line.slice(0, 4) === '$ cd') {
        /* CHANGE DIRECTORY */
        const dirName = line.slice(5)
        if (dirName === '..') {
          posInSystem.pop()
        } else {
          posInSystem.push(dirName)
        }
      } else if (line.slice(0, 1) !== '$') {
        /* LISTING CONTENT OF DIRECTORY */
        const parts = line.split(' ')
        const name = parts[1]
        const value = parts[0] === 'dir' ? {} : +parts[0]

        if (parts[0] === 'dir') {
          dirSizes[(posInSystem.join('') + name)] = 0
        } else {
          let key = ''
          for (let i = 0; i < posInSystem.length; i++) {
            key += posInSystem[i]
            dirSizes[key] += value
          }
        }
      }
    })

    return dirSizes
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
