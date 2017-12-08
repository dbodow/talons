'use strict';

// SimulationParams: controls the parameters for the simulation.
// Allows users to adjust input; manages event listeners to
// determine this input.
export default class SimulationParams {
  constructor() {
    //set defaults
    this.predatorCount = 20;
    this.predatorSpeed = 15;
    this.predatorRadius = 40;
    this.predatorGravitationNbhd = 10;
    this.predatorColor = '#354b6d';
    this.predatorEfficiency = 10000;
    this.predatorPerception = 25; // lower is better; this is a 1/x weight
    this.predatorReproductionPeriod = 12000; // should be longer than efficiency
    this.preyCount = 50;
    this.preySpeed = 10;
    this.preyRadius = 10;
    this.preyGravitationNbhd = 20;
    this.preyColor = '#efe092';
    this.preyPerception = 7; // lower is better; this is a 1/x weight
    this.preyCamoflage = 0.5;
    this.preyReproductionPeriod = 10000; // should be longer than efficiency
    this.preyCarryingCapacity = 200;
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
      },
      reproductionPeriod: this.predatorReproductionPeriod
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
      },
      reproductionPeriod: this.preyReproductionPeriod,
      carryingCapacity: this.preyCarryingCapacity
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
      gravitationNbhd: Math.round(this.preyGravitationNbhd * this.preyCamoflage)
    };
  }
}
