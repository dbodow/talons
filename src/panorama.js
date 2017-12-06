import Background from './background';
import PredatorsController from './predators_controller';
import PreyController from './prey_controller';
import { positiveMod } from '../util/util';

export default class Panorama {
  constructor(backgroundParams, userParams) {
    // inputs
    this.userParams = userParams;
    this.background = new Background(backgroundParams);
    this.ctx = backgroundParams.canvas.getContext('2d');
    this.img = backgroundParams.backgroundImage;
    this.panoramaWidth = this.img.width;
    this.panoramaHeight = this.img.height;
    this.canvasWidth = backgroundParams.canvas.width;
    this.canvasHeight = backgroundParams.canvas.height;
    this.predatorsController = new PredatorsController(userParams.predatorsParams(), this.ctx, this.panoramaWidth, this.panoramaHeight);
    this.preyController = new PreyController(userParams.preysParams(), this.ctx, this.panoramaWidth, this.panoramaHeight);
    this.predatorsController.receivePreysData({
      preysField: this.preyController.gravitationalField,
      preysLocations: this.preyController.locations
    });
    this.preyController.receivePredatorsData({
      predatorsField: this.predatorsController.gravitationalField
    });
    // defaults
    this.dx = 0;
    this.isDampening = false;
    this.cursorOffsetX = 0;
  }

  draw(dx) {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.background.draw(this.dx);
    this.preyController.calculateField();
    this.predatorsController.calculateField();
    this.preyController.updateDirections();
    this.preyController.draw(this.dx);
    this.predatorsController.draw(this.dx);
    this.predatorsController.updateDirections();
    this.preyController.updateLocations();
    const eaten = this.predatorsController.feed();
    this.preyController.killOrganisms(eaten);
    this.predatorsController.starvePredators();
  }

  updateDx() {
    this.dampenStaleCursorInput();
    this.dx += this.cursorOffsetX * 0.075;
    this.dx = positiveMod(this.dx, this.panoramaWidth);
  }

  toggleDampening(bool) {
    this.isDampening = bool;
  }

  dampenStaleCursorInput() {
    if (this.isDampening) {
      this.cursorOffsetX = this.cursorOffsetX * 0.8;
      if (Math.abs(this.cursorOffsetX) < 1) {
        this.cursorOffsetX = 0;
      }
    }
  }

  updateCursorOffset({x}) {
    if (Math.abs(this.canvasWidth / 2 - x) > this.canvasWidth / 3) {
      this.toggleDampening(false);
      this.cursorOffsetX = x - (this.canvasWidth / 2);
    } else {
      this.toggleDampening(true);
    }
  }
}
