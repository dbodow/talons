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

  updateOrganisms({predatorsParams, preysParams}) {
    this.predatorsController.updatePredatorsParams(predatorsParams);
    this.preysController.updatePreysParams(preysParams);
  }

  updatePreysField(preyFieldParams) {
    this.preysField.updateFieldParams(preyFieldParams);
  }

  tick() {
    this.feed();
    this.starve();
    this.calculateFields();
    this.moveOrganisms();
    this.reproduce();
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

  // construct a hash of preys' locations on the field grid, with
  // coords pointing to the top prey on a given tile (O(preys) time)
  // Then, each predator can check the hash at its own location to
  // find food (O(predators) time). Total: O(predators + preys)
  feed() {
    const preysLocations = this.calculatePreysLocations();
    const eaten = this.predatorsController.feed(preysLocations, this.preysField.fieldNetSize);
    this.preysController.killOrganisms(eaten);
  }

  calculatePreysLocations() {
    return this.preysController.revealLocations(this.preysField.fieldNetSize);
  }

  starve() {
    this.predatorsController.starvePredators();
    this.preysController.starvePreys();
  }

  reproduce() {
    if (!this.unpauseTimestamp) {
      this.predatorsController.reproducePredators(this.panoramaSize);
      this.preysController.reproducePreys(this.panoramaSize);
    } else if (Date.now() > this.unpauseTimestamp) {
      delete this.unpauseTimestamp;
    }
  }

  unpause(pauseTimestamp) {
    this.unpauseTimestamp = 2 * Date.now() - pauseTimestamp;
    this.predatorsController.unpause(pauseTimestamp);
  }
}
