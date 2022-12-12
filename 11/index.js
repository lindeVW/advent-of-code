{
  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const monkeys = data.split('\n\n')

      // PART 1
      const { monkeyActions } = run(monkeys.map(parseMonkey))
      monkeyActions.sort((a, b) => b - a)
      output(1, monkeyActions1[0] * monkeyActions1[1])

      // PART 2
      const monkeyActions2 = run(monkeys.map(monkey => parseMonkey(monkey, true)), false, 10000)
      monkeyActions2.sort((a, b) => b - a)
      output(2, monkeyActions2[0] * monkeyActions2[1])
    })
  }

  const parseMonkey = (data, big = false) => {
    data = data.split('\n').map(line => line.trim())

    const items = data[1].substring(16).split(', ').map(item => big ? BigInt(item): item)
    const operation = data[2].substring(17)
    const test = big ? BigInt(data[3].substring(19)) : +data[3].substring(19)
    const onTrue = +data[4].substring(25)
    const onFalse = +data[5].substring(26)

    monkey = { items, operation, test, onTrue, onFalse }

    return monkey
  }

  const run = (monkeys, decreaseWorry = true, maxRound = 20) => {
    const monkeyActions = Array.from(Array(monkeys.length)).map(_ => 0)
    const modulo = monkeys.map(monkey => monkey.test).reduce(lcm)

    for (let round = 0; round < maxRound; round++) {
      for (let index = 0; index < monkeys.length; index++) {
        const monkey = monkeys[index]
        monkeyActions[index] += monkey.items.length
        while (monkey.items.length) {
          let item = monkey.items.shift()
          item = doOperation(item, monkey.operation)
          if (decreaseWorry) {
            item = Math.floor(item / 3)
          }

          item %= modulo

          if (item % monkey.test == 0) {
            monkeys[monkey.onTrue].items.push(item)
          } else {
            monkeys[monkey.onFalse].items.push(item)
          }
        }
      }
    }
    return monkeyActions
  }

  const doOperation = (old, operation) => {
    if (typeof old === 'bigint') {
      operation = operation.replaceAll(/([0-9]+)/g, '$&n')
    }
    return eval(operation)
  }

  const lcm = (a, b) => a * b / (gcd(a, b)) // Least common multiple
  const gcd = (a, b) => a ? gcd( b % a, a) : b // Greatest common denominator

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
