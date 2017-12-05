// basically a reducer...
export default class Controls {
  constructor(backgroundImage) {
    //set defaults
    this.predatorCount = 10;
    this.predatorSpeed = 20;
    this.predatorRadius = 40;
    this.predatorColor = 'red';
    this.preyCount = 5;
    this.preySpeed = 10;
    this.preyRadius = 20;
    this.preyColor = 'blue';
    this.backgroundImage = backgroundImage;
  }

  predatorsParams() {
    return {
      count: this.predatorCount,
      predatorParams: {
        speed: this.predatorSpeed,
        radius: this.predatorRadius,
        color: this.predatorColor
      }
    };
  }

  preyParams() {
    return {
      preyCount: this.preyCount,
      preySpeed: this.preySpeed,
      preyRadius: this.preyRadius,
      preyColor: this.preyColor
    };
  }

  setListeners() {
    // will set several event listeners in document to grab user input
  }
}
