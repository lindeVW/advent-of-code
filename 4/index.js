{
  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const info = data.split('\n').map(item => item.replace(/\s+/g, ' ').trim())
      const draws = info[0].split(',').map(draw => +draw)
      info.shift()
      const boards = []
      for (let i = 0; i < info.length; i += 6) {
        boards.push([...info].splice(i + 1, 5).map(row => row.split(' ').map(num => +num)))
      }

      const boardScores = []
      boards.forEach(board => {
        const arr = []
        for (let i = 0; i < board.length; i++) {
          const row = []
          for (let j = 0; j < board[0].length; j++) {
            row.push(0)
          }
          arr.push(row)
        }
        boardScores.push(arr)
      })

      // partOne(boards, boardScores, draws)

      partTwo(boards, boardScores, draws)
    })
  }

  const partOne = (boards, boardScores, draws) => {
    let boardCorrect = false
    let drawCorrect = false
    let drawEnd = draws.length
    let foundCorrect = false
    for (let drawIndex = 0; drawIndex < draws.length; drawIndex++) {
      const draw = draws[drawIndex]

      for (let board = 0; board < boards.length; board++) {
        for (let i = 0; i < boards[board].length; i++) {
          for (let j = 0; j < boards[board][0].length; j++) {
            if (boards[board][i][j] === draw) {
              boardScores[board][i][j] = 1
            }
          }
        }

        foundCorrect = true
        for (let i = 0; i < boards[board].length; i++) {
          foundCorrect = true
          for (let j = 0; j < boards[board][0].length; j++) {
            if (boardScores[board][i][j] === 0) {
              foundCorrect = false
            }
          }

          if (foundCorrect) {
            break
          }
        }

        if (foundCorrect) {
          boardCorrect = boards[board]
          drawCorrect = draw
          drawEnd = drawIndex + 1
          break
        }

        for (let j = 0; j < boards[board][0].length; j++) {
          foundCorrect = true
          for (let i = 0; i < boards[board].length; i++) {
            if (boardScores[board][i][j] === 0) {
              foundCorrect = false
            }
          }

          if (foundCorrect) {
            break
          }
        }

        if (foundCorrect) {
          boardCorrect = boards[board]
          drawCorrect = draw
          drawEnd = drawIndex + 1
          break
        }
      }

      if (foundCorrect) {
        console.log('final draw', draw)
        console.log(calculateNonCalledSum(boardCorrect, draws.slice(0, drawEnd)) * drawCorrect)
        break
      } else {
        console.log('draw', draw)
      }
    }
  }

  const partTwo = (boards, boardScores, draws) => {
    let boardsNotWon = boards.length
    const boardsWon = []
    let boardLost = false
    let drawFinal = false
    let drawEnd = draws.length
    for (let drawIndex = 0; drawIndex < draws.length; drawIndex++) {
      const draw = draws[drawIndex]

      for (let board = 0; board < boards.length; board++) {
        let boardCorrect = true

        for (let i = 0; i < boards[board].length; i++) {
          for (let j = 0; j < boards[board][0].length; j++) {
            if (boards[board][i][j] === draw) {
              boardScores[board][i][j] = 1
            }
          }
        }

        for (let i = 0; i < boards[board].length; i++) {
          boardCorrect = true
          for (let j = 0; j < boards[board][0].length; j++) {
            if (boardScores[board][i][j] === 0) {
              boardCorrect = false
            }
          }

          if (boardCorrect && !boardsWon.includes(board)) {
            boardsWon.push(board)
            boardsNotWon--
            break
          }
        }

        if (boardsNotWon === 0) {
          boardLost = boards[board]
          drawFinal = draw
          drawEnd = drawIndex + 1
          break
        }

        for (let j = 0; j < boards[board][0].length; j++) {
          boardCorrect = true
          for (let i = 0; i < boards[board].length; i++) {
            if (boardScores[board][i][j] === 0) {
              boardCorrect = false
            }
          }

          if (boardCorrect && !boardsWon.includes(board)) {
            boardsNotWon--
            boardsWon.push(board)
            break
          }
        }

        if (boardsNotWon === 0) {
          boardLost = boards[board]
          drawFinal = draw
          drawEnd = drawIndex + 1
          break
        }
      }

      console.log(boardsNotWon)
      if (boardsNotWon === 0) {
        console.log('final draw', draw, boardLost)
        console.log(calculateNonCalledSum(boardLost, draws.slice(0, drawEnd)) * drawFinal)
        break
      } else {
        console.log('draw', draw)
      }
    }
  }

  const calculateNonCalledSum = (board, drawn) => {
    const sum = board.reduce((sum, row, rowIndex) => {
      return sum + row.reduce((sum, number, colIndex) => {
        if (!drawn.includes(number)) {
          return sum + number
        }
        return sum
      }, 0)
    }, 0)

    return sum
  }

  init()
}
