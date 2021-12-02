{
  const init = () => {
    window.fetch('data.txt').then(data => data.text()).then(data => {
      const instructions = data.split('\n').map(instruction => ({
        direction: instruction.split(' ')[0],
        amount: +instruction.split(' ')[1]
      }))

      step1(instructions)
      step2(instructions)
    })
  }

  const step1 = instructions => {
    const pos = { horizontal: 0, depth: 0 }
    instructions.forEach(instruction => {
      switch (instruction.direction) {
        case 'forward':
          pos.horizontal += instruction.amount
          break
        case 'down':
          pos.depth += instruction.amount
          break
        case 'up':
          pos.depth -= instruction.amount
          break
      }
    })
    console.log(pos.horizontal * pos.depth)
  }

  const step2 = instructions => {
    const pos = { horizontal: 0, depth: 0, aim: 0 }
    instructions.forEach(instruction => {
      switch (instruction.direction) {
        case 'forward':
          pos.horizontal += instruction.amount
          pos.depth += pos.aim * instruction.amount
          break
        case 'down':
          pos.aim += instruction.amount
          break
        case 'up':
          pos.aim -= instruction.amount
          break
      }
    })
    console.log(pos.horizontal * pos.depth)
  }

  init()
}
