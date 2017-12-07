'use strict';

import Prey from './prey';
import OrganismsController from './organisms_controller';
import { fieldCellCoords } from '../util/util';

export default class PreysController extends OrganismsController {
  constructor(preysParams, panoramaSize) {
    super();
    this.populatePreys(preysParams, panoramaSize);
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

  // initializeLocations() {
  //   const rowCount = Math.ceil(this.panoramaHeight / this.fieldNetSize);
  //   const colCount = Math.ceil(this.panoramaWidth / this.fieldNetSize);
  //   this.locations = Array(rowCount).fill(0).map(el => (
  //     Array(colCount)
  //   ));
  // }
  //
  // resetLocations() {
  //   this.locations.forEach( row => {
  //     row.map( entry => null );
  //   });
  // }
  //
  // updateLocations() {
  //   // debugger;
  //   this.resetLocations();
  //   this.organisms.forEach( organism => {
  //     if (organism.fieldPosition === undefined) debugger;
  //     if (this.locations[organism.fieldPosition.y] === undefined ) debugger;
  //     // if (this.locations[organism.fieldPosition.y][organism.fieldPosition.x] !== null) console.log(organism);
  //     this.locations[organism.fieldPosition.y][organism.fieldPosition.x] = organism;
  //   });
  // }
}
