'use strict';
import capitalize from 'lodash/capitalize';
import { distance, distanceY, positiveMod,
         gravitation } from '../util/util';

export default class OrganismsController {
  constructor(reproductionPeriod) {
    this.organisms = [];
    this.lastReproduced = Date.now();
    this.reproductionPeriod = reproductionPeriod;
  }

  moveOrganisms(panoramaSize, field) {
    this.updateDirections(field);
    this.organisms.forEach( organism => {
      organism.moveOrganism(panoramaSize);
    });
  }

  updateDirections(field) {
    this.organisms.forEach( organism => {
      organism.updateDirection(field);
    });
  }

  killOrganisms(condemnedList) {
    condemnedList.forEach( organism => {
      const condemnedIdx = this.organisms.indexOf(organism);
      this.organisms.splice(condemnedIdx, 1);
    });
  }
}
