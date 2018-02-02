'use strict';

// SimulationParams: controls the parameters for the simulation.
// Allows users to adjust input; manages event listeners to
// determine this input.
export default class SimulationParams {
  constructor() {
    //set defaults
    this.predatorCount = 20; // count at initialization or reset
    this.predatorSpeed = 15; // pixels moved per tick
    this.predatorRadius = 40; // radius of the graphical circle
    this.predatorGravitationNbhd = 10; // px size of neighborhood to detect prey
    this.predatorColor = '#354b6d';
    this.predatorEfficiency = 10000; // milliseconds a predator can survive without feeding
    this.predatorPerception = 25; // lower is better; this is a 1/x weight
    this.predatorReproductionPeriod = 12000; // ms; should be longer than predator efficiency to avoid explosion
    this.preyCount = 50; // count at initialization or reset
    this.preySpeed = 10; // pixels moved per tick
    this.preyRadius = 10; // radius of the graphical circle
    this.preyGravitationNbhd = 20; // px size of neighborhood to detect predators
    this.preyColor = '#efe092';
    this.preyPerception = 7; // lower is better; this is a 1/x weight
    this.preyCamoflage = 0.5; // weight on the 'gravitational field' for each prey; lower is less detectable
    this.preyReproductionPeriod = 10000; // ms
    this.preyCarryingCapacity = 200; // maximum number of prey
    this.fieldNetSize = 10; // grid size of the gravitational field; Must be smaller than both radii/sqrt(2)!
  }

  // normalize params for Predators / PredatorsController
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

  // normalize params for Preys / PreysController
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

  // normalize params for PredatorsField
  predatorFieldParams() {
    return {
      fieldNetSize: this.fieldNetSize,
      gravitationNbhd: this.predatorGravitationNbhd
    };
  }

  // normalize params for PreysField
  preyFieldParams() {
    return {
      fieldNetSize: this.fieldNetSize,
      gravitationNbhd: Math.round(this.preyGravitationNbhd * this.preyCamoflage)
    };
  }
}
