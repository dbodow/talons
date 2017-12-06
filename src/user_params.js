// basically a reducer...
export default class Controls {
  constructor(backgroundImage) {
    //set defaults
    this.predatorCount = 0;
    this.predatorSpeed = 20;
    this.predatorRadius = 40;
    this.predatorColor = '#bc482b';
    this.predatorEfficiency = 2000000;
    this.preyCount = 1;
    this.preySpeed = 10;
    this.preyRadius = 20;
    this.preyColor = '#4c6ea5';
    this.backgroundImage = backgroundImage;
  }

  predatorsParams() {
    return {
      fieldNetSize: 10, // Must be smaller than radius/sqrt(2)!
      gravitationNbhd: 10,
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
      fieldNetSize: 10, // Must be smaller than radius/sqrt(2)!
      gravitationNbhd: 20,
      count: this.preyCount,
      preyParams: {
        speed: this.preySpeed,
        radius: this.preyRadius,
        color: this.preyColor
      }
    };
  }

  setListeners() {
    // will set several event listeners in document to grab user input
  }
}
