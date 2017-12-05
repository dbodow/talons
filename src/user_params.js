// basically a reducer...
export default class Controls {
  constructor(backgroundImage) {
    //set defaults
    this.predatorCount = 100;
    this.predatorSpeed = 5;
    this.predatorRadius = 40;
    this.predatorColor = '#bc482b';
    this.preyCount = 100;
    this.preySpeed = 3;
    this.preyRadius = 20;
    this.preyColor = '#4c6ea5';
    this.backgroundImage = backgroundImage;
  }

  predatorsParams() {
    return {
      fieldNetSize: 50,
      gravitationNbhd: 3,
      count: this.predatorCount,
      predatorParams: {
        speed: this.predatorSpeed,
        radius: this.predatorRadius,
        color: this.predatorColor
      }
    };
  }

  preysParams() {
    return {
      fieldNetSize: 50, // todo: optimize based on pred/prey ratio
      gravitationNbhd: 3,
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
