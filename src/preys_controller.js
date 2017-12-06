'use strict';

import Prey from './prey';
import OrganismsController from './organisms_controller';
import { fieldCellCoords } from '../util/util';


export default class PreysController extends OrganismsController {
  constructor(preysParams, ctx, panoramaWidth, panoramaHeight) {
    super(ctx, panoramaWidth, panoramaHeight, preysParams);
    this.preyParams = preysParams.preyParams;
    this.populatePreys(preysParams.count);
    this.fieldEdgeSgn = -1;
    this.initializeLocations();
  }

  populatePreys(count) {
    for (let i = 0; i < count; i++) {
      this.createPrey();
    }
  }

  initializeLocations() {
    const rowCount = Math.ceil(this.panoramaHeight / this.fieldNetSize);
    const colCount = Math.ceil(this.panoramaWidth / this.fieldNetSize);
    this.locations = Array(rowCount).fill(0).map(el => (
      Array(colCount)
    ));
  }

  resetLocations() {
    this.locations.forEach( row => {
      row.map( entry => null );
    });
  }

  updateLocations() {
    // debugger;
    this.resetLocations();
    this.organisms.forEach( organism => {
      if (organism.fieldPosition === undefined) debugger;
      if (this.locations[organism.fieldPosition.y] === undefined ) debugger;
      // if (this.locations[organism.fieldPosition.y][organism.fieldPosition.x] !== null) console.log(organism);
      this.locations[organism.fieldPosition.y][organism.fieldPosition.x] = organism;
    });
  }

  receivePredatorsData({predatorsField}) {
    this.predatorsField = predatorsField;
  }

  createPrey(preyParams) {
    const prey = new Prey(this.preyParams, this.ctx, this.panoramaWidth, this.panoramaHeight);
    this.organisms.push(prey);
  }

  updateDirections() {
    this.organisms.forEach( organism => {
      organism.constructGradient(this.predatorsField, this.gravitationNbhd, this.fieldNetSize);
      organism.flipGradient();
      organism.updateDirection();
    });
  }
}
