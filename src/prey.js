'use strict';

import Organism from './organism';

export default class Prey extends Organism {
  constructor(preyParams, panoramaSize) {
    super(preyParams, panoramaSize);
  }

  // allow for parameters to be changed after the initialization
  // (e.g. based on user input on the slider)
  updatePreyParams({speed}) {
    this.speed = speed;
  }
}
