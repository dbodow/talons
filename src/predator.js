'use strict';

import Organism from './organism';

export default class Predator extends Organism {
  constructor(predatorParams, panoramaSize) {
    super(predatorParams, panoramaSize);
    this.lastAte = Date.now();
    this.efficiency = predatorParams.efficiency;
  }

  feed(preys) {
    this.lastAte = Date.now();
  }
}
