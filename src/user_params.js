// basically a reducer...
export default class Controls {
  constructor(backgroundImage) {
    //set defaults
    this.predatorCount = 10;
    this.predatorSpeed = 20;
    this.predatorRadius = 40;
    this.predatorColor = 'red';
    this.preyCount = 200;
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

  preysParams() {
    return {
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
