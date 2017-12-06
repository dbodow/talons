'use strict';

import { distance, distanceY, positiveMod, gravitation } from '../util/util';

export default class OrganismsController {
  constructor() {
    this.organisms = [];
  }

  moveOrganisms(panoramaSize, field) {
    // this.updateDirections(field);
    this.organisms.forEach( organism => {
      organism.moveOrganism(panoramaSize);
    });
  }

  // updateDirections(field) {
  //   this.organisms.forEach( organism => {
  //     // organism.constructGradient(this.preysField, this.gravitationNbhd, this.fieldNetSize);
  //     organism.updateDirection(field);
  //   });
  // }

  // killOrganisms(condemnedList) {
  //   condemnedList.forEach( organism => {
  //     const condemnedIdx = this.organisms.indexOf(organism);
  //     // debugger;
  //     this.organisms.splice(condemnedIdx, 1);
  //     // const survivors = this.organisms.slice(0, condemnedIdx).concat(this.organisms.slice(condemnedIdx + 1));
  //     // this.organisms = survivors;
  //   });
  // }
}
