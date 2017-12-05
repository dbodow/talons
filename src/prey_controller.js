import Prey from './prey';
import OrganismsController from './organisms_controller';

export default class PredatorsController extends OrganismsController {
  constructor(preysParams, ctx, panoramaWidth, panoramaHeight) {
    super(ctx, panoramaWidth, panoramaHeight, preysParams);
    this.preyParams = preysParams.preyParams;
    this.populatePreys(preysParams.count);
  }

  populatePreys(count) {
    for (let i = 0; i < count; i++) {
      this.createPrey();
    }
  }

  receivePredatorsField(field) {
    this.predatorsField = field;
  }

  createPrey(preyParams) {
    const prey = new Prey(this.preyParams, this.ctx, this.panoramaWidth, this.panoramaHeight);
    this.organisms.push(prey);
  }

  updateDirections() {
    this.organisms.forEach( organism => {
      organism.constructGradient(this.predatorsField, this.gravitationNbhd, this.fieldNetSize);
    });
  }
}
