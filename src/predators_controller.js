'use strict';

import Predator from './predator';
import OrganismsController from './organisms_controller';
import { fieldCellCoords } from '../util/util';

export default class PredatorsController extends OrganismsController {
  constructor(predatorsParams, panoramaSize) {
    super();
    this.populatePredators(predatorsParams, panoramaSize);
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

  // starvePredators() {
  //   const starved = [];
  //   const currentTime = Date.now();
  //   this.organisms.forEach( predator => {
  //     if (currentTime - predator.lastAte > predator.efficiency) {
  //       starved.push(predator);
  //     }
  //   });
  //   this.killOrganisms(starved);
  // }
}
