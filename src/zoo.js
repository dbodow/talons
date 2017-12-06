'use strict';

import PredatorsController from './predators_controller';
import PreysController from './preys_controller';
import Field from './field';

export default class Zoo {
  constructor(predatorsParams, preysParams, panoramaSize) {
    this.predatorsController = new PredatorsController(predatorsParams);
    this.preysController = new PreysController(preysParams);
    this.predatorsField = new Field(this.predatorsController);
    this.preysField = new Field(this.preysController);
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
