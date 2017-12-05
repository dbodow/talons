import Prey from './prey';

export default class PredatorsController {
  constructor() {
    this.preyList = [];
  }

  createPrey(preyParams) {
    const prey = new Prey(preyParams);
    this.preyList.push(prey);
  }
}
