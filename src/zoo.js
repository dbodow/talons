'use strict';

import PredatorsController from './predators_controller';
import PreysController from './preys_controller';
import Field from './field';

export default class Zoo {
  constructor(predatorsParams, preysParams,
              predatorFieldParams, preyFieldParams, panoramaSize) {
    this.panoramaSize = panoramaSize;
    this.predatorsController = new PredatorsController(predatorsParams, panoramaSize);
    this.preysController = new PreysController(preysParams, panoramaSize);
    this.predatorsField = new Field(predatorFieldParams, panoramaSize, -1);
    this.preysField = new Field(preyFieldParams, panoramaSize, 1);
  }

  tick() {
    this.feed();
    this.calculateFields();
    this.moveOrganisms();
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

  calculatePredatorsField() {
    this.predatorsField.calculateField(this.predatorsController);
  }

  calculatePreysField() {
    this.preysField.calculateField(this.preysController);
  }

  feed() {
    const eaten = this.predatorsController.feed(this.preysController.organisms);
    this.preysController.killOrganisms(eaten);
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
