import Predator from './predator';

export default class PredatorsController {
  constructor({count, predatorParams}, ctx, panoramaWidth, panoramaHeight) {
    this.ctx = ctx;
    this.predators = [];
    for (let i = 0; i < count; i++) {
      this.createPredator(predatorParams, ctx, panoramaWidth, panoramaHeight);
    }
  }

  createPredator(predatorParams, ctx, panoramaWidth, panoramaHeight) {
    const predator = new Predator(predatorParams, ctx, panoramaWidth, panoramaHeight);
    this.predators.push(predator);
  }

  draw(dx) {
    this.predators.forEach( predator => {
      predator.draw(dx);
    });
  }
}
