import Predator from './predator';
import OrganismsController from './organisms_controller';

export default class PredatorsController extends OrganismsController {
  constructor(predatorsParams, ctx, panoramaWidth, panoramaHeight) {
    super(ctx, panoramaWidth, panoramaHeight, predatorsParams);
    this.predatorParams = predatorsParams.predatorParams;
    this.fieldEdgeSgn = 1;
    this.populatePredators(predatorsParams.count);
  }

  populatePredators(count) {
    for (let i = 0; i < count; i++) {
      this.createPredator();
    }
  }

  receivePreysData({preysField, preysLocations}) {
    this.preysField = preysField;
    this.preysLocations = preysLocations;
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

  feed() {
    const eaten = [];
    this.organisms.forEach( predator => {
      const food = predator.feed(this.preysLocations);
      if (food) eaten.push(food);
    });
    // console.log('eaten ', eaten);
    return Array.from(new Set(eaten));
  }

  starvePredators() {
    const starved = [];
    const currentTime = Date.now();
    this.organisms.forEach( predator => {
      if (currentTime - predator.lastAte > predator.efficiency) {
        starved.push(predator);
      }
    });
    this.killOrganisms(starved);
  }
}
