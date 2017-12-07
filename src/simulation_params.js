'use strict';

// SimulationParams: controls the parameters for the simulation.
// Allows users to adjust input; manages event listeners to
// determine this input.
export default class SimulationParams {
  constructor() {
    //set defaults
    this.predatorCount = 10;
    this.predatorSpeed = 15;
    this.predatorRadius = 40;
    this.predatorGravitationNbhd = 10;
    this.predatorColor = '#bc482b';
    this.predatorEfficiency = 2000000;
    this.predatorPerception = 25; // lower is better; this is a 1/x weight
    this.preyCount = 20;
    this.preySpeed = 10;
    this.preyRadius = 20;
    this.preyGravitationNbhd = 10;
    this.preyColor = '#4c6ea5';
    this.preyPerception = 7; // lower is better; this is a 1/x weight
    this.fieldNetSize = 10; // Must be smaller than radius/sqrt(2)!
  }

  predatorsParams() {
    return {
      count: this.predatorCount,
      predatorParams: {
        speed: this.predatorSpeed,
        radius: this.predatorRadius,
        color: this.predatorColor,
        efficiency: this.predatorEfficiency,
        perception: this.predatorPerception
      }
    };
  }

  preysParams() {
    return {
      count: this.preyCount,
      preyParams: {
        speed: this.preySpeed,
        radius: this.preyRadius,
        color: this.preyColor,
        perception: this.preyPerception
      }
    };
  }

  predatorFieldParams() {
    return {
      fieldNetSize: this.fieldNetSize,
      gravitationNbhd: this.predatorGravitationNbhd
    };
  }

  preyFieldParams() {
    return {
      fieldNetSize: this.fieldNetSize,
      gravitationNbhd: this.preyGravitationNbhd
    };
  }
}
