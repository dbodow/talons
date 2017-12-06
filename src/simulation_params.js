'use strict';

// SimulationParams: controls the parameters for the simulation.
// Allows users to adjust input; manages event listeners to
// determine this input.
export default class SimulationParams {
  constructor() {
    //set defaults
    this.predatorCount = 0;
    this.predatorSpeed = 20;
    this.predatorRadius = 40;
    this.predatorGravitationNbhd = 10;
    this.predatorColor = '#bc482b';
    this.predatorEfficiency = 2000000;
    this.preyCount = 1;
    this.preySpeed = 10;
    this.preyRadius = 20;
    this.preyGravitationNbhd = 20;
    this.preyColor = '#4c6ea5';
    this.fieldNetSize = 10; // Must be smaller than radius/sqrt(2)!
  }

  predatorsParams() {
    return {
      fieldNetSize: this.fieldNetSize,
      gravitationNbhd: this.predatorGravitationNbhd,
      count: this.predatorCount,
      predatorParams: {
        speed: this.predatorSpeed,
        radius: this.predatorRadius,
        color: this.predatorColor,
        efficiency: this.predatorEfficiency
      }
    };
  }

  preysParams() {
    return {
      fieldNetSize: this.fieldNetSize,
      gravitationNbhd: this.preyGravitationNbhd,
      count: this.preyCount,
      preyParams: {
        speed: this.preySpeed,
        radius: this.preyRadius,
        color: this.preyColor
      }
    };
  }
}
