'use strict';

import Organism from './organism';

export default class Prey extends Organism {
  constructor(preyParams, panoramaSize) {
    super(preyParams, panoramaSize);
  }

  updatePreyParams({speed}) {
    this.speed = speed;
  }
}
