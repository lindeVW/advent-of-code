{
  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const lines = data.split('\n').map(item => item.split('->')
        .map(item => item.trim()
          .split(',')
          .map(number => +number)
        )
      )

      const min = lines.reduce((min, line) => {
        const minLine = line.reduce((minLine, point) => {
          const x = point[0] < minLine[0] ? point[0] : minLine[0]
          const y = point[1] < minLine[1] ? point[1] : minLine[1]
          return [x, y]
        }, min)
        return minLine
      }, [lines[0][0][0], lines[0][0][1]])

      const max = lines.reduce((max, line) => {
        const maxLine = line.reduce((maxLine, point) => {
          const x = point[0] > maxLine[0] ? point[0] : maxLine[0]
          const y = point[1] > maxLine[1] ? point[1] : maxLine[1]
          return [x, y]
        }, max)
        return maxLine
      }, [lines[0][0][0], lines[0][0][1]])

      const offsetX = min[0]
      const offsetY = min[1]

      const field = []
      for (let y = 0; y <= max[1] - min[1]; y++) {
        field.push([])
        for (let x = 0; x <= max[0] - min[0]; x++) {
          field[y][x] = 0
        }
      }

      lines.forEach(line => {
        const startX = line[0][0]
        const endX = line[1][0]
        const startY = line[0][1]
        const endY = line[1][1]

        let x = startX
        let y = startY

        field[y - offsetY][x - offsetX]++
        while (x !== endX || y !== endY) {
          x = x < endX ? x + 1 : x > endX ? x - 1 : x
          y = y < endY ? y + 1 : y > endY ? y - 1 : y
          field[y - offsetY][x - offsetX]++
        }
      })

      const dangerousPoints = field.reduce((total, row) => {
        return total + row.reduce((rowTotal, point) => {
          return point > 1 ? rowTotal + 1 : rowTotal
        }, 0)
      }, 0)
      console.log(dangerousPoints)
    })
  }

  init()
}
