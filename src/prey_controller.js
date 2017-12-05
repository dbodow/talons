import Prey from './prey';
import OrganismsController from './organisms_controller';

export default class PredatorsController extends OrganismsController {
  constructor(preysParams, ctx, panoramaWidth, panoramaHeight) {
    super(ctx, panoramaWidth, panoramaHeight);
    this.preyParams = preysParams.preyParams;
    this.populatePreys(preysParams.count);
  }

  populatePreys(count) {
    for (let i = 0; i < count; i++) {
      this.createPrey();
    }
  }

  createPrey(preyParams) {
    const prey = new Prey(this.preyParams, this.ctx, this.panoramaWidth, this.panoramaHeight);
    this.organisms.push(prey);
  }
}
