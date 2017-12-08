'use strict';

import Predator from './predator';
import OrganismsController from './organisms_controller';
import { fieldCellCoords } from '../util/util';

export default class PredatorsController extends OrganismsController {
  constructor({predatorParams, count, reproductionPeriod}, panoramaSize) {
    super(reproductionPeriod);
    this.predatorParams = predatorParams;
    this.populatePredators({predatorParams, count}, panoramaSize);
  }

  populatePredators({count, predatorParams}, panoramaSize) {
    for (let i = 0; i < count; i++) {
      this.createPredator(predatorParams, panoramaSize);
    }
  }

  createPredator(predatorParams, panoramaSize) {
    const predator = new Predator(predatorParams, panoramaSize);
    this.organisms.push(predator);
  }

  feed(preysLocations, fieldNetSize) {
    const eaten = [];
    this.organisms.forEach( predator => {
      const predatorCoords = fieldCellCoords(predator.center, fieldNetSize);
      const food = preysLocations[predatorCoords.x] ?
        preysLocations[predatorCoords.x][predatorCoords.y] : null;
      if (food) {
        eaten.push(food);
        predator.feed();
      }
    });
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

  reproducePredators(panoramaSize) {
    if (Date.now() - this.lastReproduced > this.reproductionPeriod) {
      const populateParams = {
        count: this.organisms.length,
        predatorParams: this.predatorParams
      };
      this.populatePredators(populateParams, panoramaSize);
      this.lastReproduced = Date.now();
    }
  }

  updatePredatorsParams({predatorParams, reproductionPeriod}) {
    this.predatorParams = predatorParams;
    this.reproductionPeriod = reproductionPeriod;
    this.organisms.forEach( predator => {
      predator.updatePredatorParams(predatorParams);
    });
  }
}
