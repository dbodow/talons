'use strict';

import Prey from './prey';
import OrganismsController from './organisms_controller';
import { fieldCellCoords } from '../util/util';

export default class PreysController extends OrganismsController {
  constructor({preyParams, count, reproductionPeriod, carryingCapacity},
              panoramaSize) {
    super(reproductionPeriod);
    this.preyParams = preyParams;
    this.carryingCapacity = carryingCapacity;
    this.populatePreys({count, preyParams}, panoramaSize);
  }

  populatePreys({count, preyParams}, panoramaSize) {
    for (let i = 0; i < count; i++) {
      this.createPrey(preyParams, panoramaSize);
    }
  }

  createPrey(preyParams, panoramaSize) {
    const prey = new Prey(preyParams, panoramaSize);
    this.organisms.push(prey);
  }

  revealLocations(fieldNetSize) {
    const locations = {};
    this.organisms.forEach( prey => {
      const preyCoords = fieldCellCoords(prey.center, fieldNetSize);
      locations[preyCoords.x] = locations[preyCoords.x] || [];
      locations[preyCoords.x][preyCoords.y] = prey;
    });
    return locations;
  }

  reproducePreys(panoramaSize) {
    if (Date.now() - this.lastReproduced > this.reproductionPeriod) {
      const populateParams = {
        count: this.organisms.length,
        preyParams: this.preyParams
      };
      this.populatePreys(populateParams, panoramaSize);
      this.lastReproduced = Date.now();
    }
  }

  starvePreys() {
    if (this.organisms.length > this.carryingCapacity) {
      const middleIdx = Math.floor(this.organisms.length / 2);
      this.organisms = this.organisms.slice(middleIdx);
    }
  }

  updatePreysParams({preyParams, reproductionPeriod, carryingCapacity}) {
    this.preyParams = preyParams;
    this.reproductionPeriod = reproductionPeriod;
    this.carryingCapacity = carryingCapacity;
    this.organisms.forEach( prey => {
      prey.updatePreyParams(preyParams);
    });
  }
}
