import Predator from './predator';
import OrganismsController from './organisms_controller';

export default class PredatorsController extends OrganismsController {
  constructor(predatorsParams, ctx, panoramaWidth, panoramaHeight) {
    super(ctx, panoramaWidth, panoramaHeight, predatorsParams);
    this.predatorParams = predatorsParams.predatorParams;
    this.populatePredators(predatorsParams.count);
  }

  populatePredators(count) {
    for (let i = 0; i < count; i++) {
      this.createPredator();
    }
  }

  receivePreysField(field) {
    this.preysField = field;
  }

  createPredator(predatorParams) {
    const predator = new Predator(this.predatorParams, this.ctx, this.panoramaWidth, this.panoramaHeight);
    this.organisms.push(predator);
  }

  updateDirections() {
    this.organisms.forEach( organism => {
      organism.constructGradient(this.preysField, this.gravitationNbhd, this.fieldNetSize);
      organism.updateDirection();
    });
  }

}
