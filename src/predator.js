'use strict';

import Organism from './organism';

export default class Predator extends Organism {
  constructor(predatorParams, panoramaSize) {
    super(predatorParams, panoramaSize);
    this.lastAte = Date.now();
    this.efficiency = predatorParams.efficiency;
  }

  // allow for parameters to be changed after the initialization
  // (e.g. based on user input on the slider)
  updatePredatorParams({speed, efficiency, perception}) {
    this.speed = speed;
    this.efficiency = efficiency;
    this.perception = perception;
  }

  // resets the countdown to starvation
  feed(preys) {
    this.lastAte = Date.now();
  }
}
