import Organism from './organism';

export default class Prey extends Organism {
  constructor(preyParams, ctx, panoramaWidth, panoramaHeight) {
    super(preyParams, ctx, panoramaWidth, panoramaHeight);
  }

  flipGradient() {
    // run from the predators, not to them
    this.gradient.x = -1 * this.gradient.x;
    this.gradient.y = -1 * this.gradient.y;
  }
}
