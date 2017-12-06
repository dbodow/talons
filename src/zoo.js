'use strict';

import PredatorsController from './predators_controller';
import PreysController from './preys_controller';
import Field from './field';

export default class Zoo {
  constructor(predatorsParams, preysParams, panoramaSize) {
    this.panoramaSize = panoramaSize;
    this.predatorsController = new PredatorsController(predatorsParams, panoramaSize);
    this.preysController = new PreysController(preysParams, panoramaSize);
    // this.predatorsField = new Field(panoramaSize, 1);
    // this.preysField = new Field(panoramaSize, -1);
  }

  tick() {
    this.moveOrganisms();
    // this.calculateFields();
  }

  moveOrganisms() {
    this.movePredators();
    this.movePrey();
  }

  movePredators() {
    this.predatorsController.moveOrganisms(this.panoramaSize, this.preysField);
  }

  movePrey() {
    this.preysController.moveOrganisms(this.panoramaSize, this.predatorsField);
  }

  calculateFields() {
    this.calculatePredatorsField();
    this.calculatePreysField();
  }

  calculatePredatorsFields() {
    this.predatorsField.calculateField(this.predatorsController);
  }

  calculatePreysFields() {
    this.preysField.calculateField(this.preysController);
  }
}

// this.preyController.calculateField();
// this.predatorsController.calculateField();
// this.preyController.updateDirections();
// this.preyController.draw(this.dx);
// this.predatorsController.draw(this.dx);
// this.predatorsController.updateDirections();
// this.preyController.updateLocations();
// const eaten = this.predatorsController.feed();
// this.preyController.killOrganisms(eaten);
// this.predatorsController.starvePredators();
