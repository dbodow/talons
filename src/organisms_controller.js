'use strict';

import { distance, distanceY, positiveMod,
         gravitation } from '../util/util';

export default class OrganismsController {
  constructor() {
    this.organisms = [];
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
