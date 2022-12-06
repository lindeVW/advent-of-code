{
  // OPTION VALUES
  const ROCK = 0
  const PAPER = 1
  const SCISSORS = 2

  const WIN = 2
  const DRAW = 1
  const LOSS = 0

  /* PART 1 */
  // const VALUES = {A: ROCK, X: ROCK, B: PAPER, Y: PAPER, C: SCISSORS, Z: SCISSORS}

  /* PART 2 */
  const VALUES = {A: ROCK, B: PAPER, C: SCISSORS, X: LOSS, Y: DRAW, Z: WIN}

  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const turns = data.split('\n').map(turn => turn.split(' ').map(variable => VALUES[variable]))

      // PART 1
      const scorePartOne = turns.reduce((total, current) => total + calculateTurn(current), 0)
      output(1, scorePartOne)

      // PART 2
      const scorePartTwo = turns.reduce((total, current) => total + calculateNeededShape(current), 0)
      output(2, scorePartTwo)
    })
  }

  const calculateTurn = turn => {
    const opponent = turn[0]
    const own = turn[1]

    let result = own === opponent ? DRAW : (opponent + 1 % 3) === own ? WIN : LOSS
    const winPoints = result * 3
    const totalPoints = winPoints + (own + 1)

    return totalPoints
  }

  const calculateNeededShape = turn => {
    const opponent = turn[0]
    const result = turn[1]

    let points = result * 3

    let own = opponent
    if (result === WIN) {
      own = (opponent + 1) % 3
    } else if (result === LOSS) {
      own = (opponent + 2) % 3
    }

    points += own + 1
    return points
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
