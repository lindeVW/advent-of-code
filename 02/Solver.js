import { AdventOfCode } from "../AdventOfCode.js";

export class Solver extends AdventOfCode {
	static R_LIMIT = 12;
	static G_LIMIT = 13;
	static B_LIMIT = 14;

	constructor(data) {
		super(1, data)
	}

	partOne() {
		this.output(this.possibleGamesAmount)
	}

	partTwo() {
		const powers = this.data.map(gameStr => {
		  const turns = this.parseTurns(gameStr);
		  const highestValues = turns.reduce((values, turn) => {
			  return {
				  R: turn.R > values.R ? turn.R : values.R,
				  G: turn.G > values.G ? turn.G : values.G,
				  B: turn.B > values.B ? turn.B : values.B,
			  }
		  }, { R: 0, G: 0, B: 0 })
		  return highestValues.R * highestValues.G * highestValues.B
		});
		const total = this.sum(powers);
		this.output(total);
	}

	get possibleGamesAmount () {
		return this.data.reduce((total, gameStr, index) => {
			const turns = this.parseTurns(gameStr)
	
			const impossibleTurns = turns.filter((turn) => turn.R > Solver.R_LIMIT || turn.G > Solver.G_LIMIT || turn.B > Solver.B_LIMIT);
			
			if (impossibleTurns.length === 0) {
				return total + index + 1;
			}
			
			return total;
		  }, 0);
	}

	parseTurns (gameStr) {
	  return gameStr
		  .split(': ')[1]
		  .split(';')
		  .map(turn => {
			  const R = this.getColorAmount('red', turn);
			  const G = this.getColorAmount('green', turn);
			  const B = this.getColorAmount('blue', turn);
			  return { R, G, B };
		  });
	}
  
	getColorAmount (colorName, turnStr) {
	  const colorStr = turnStr.match(new RegExp(`\\d+\\s${colorName}`));
	  if (!colorStr) {
		  return 0;
	  }
	  return +(colorStr[0].split(' ')[0]);
	}
}
