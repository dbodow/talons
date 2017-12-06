'use strict';

import Background from './background';
import { positiveMod, getMousePos } from '../util/util';

// handles all logic for the wrapping panorama and drawing all canvas items
// in particular, tracks offset for drawing based on user scroll
export default class Panorama {
  constructor(canvas) {
    this.background = new Background(canvas);
    this.ctx = canvas.getContext('2d');
    this.panoramaSize = this.background.imageSize;
    this.canvasSize = this.background.canvasSize;

    this.dx = 0;
    this.isDampening = false;
    this.cursorOffsetX = 0;

    this.setCanvasListeners(canvas);
  }

  draw(zoo) {
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    this.background.draw(this.dx);
    this.drawOrganisms(zoo.preysController);
    this.drawOrganisms(zoo.predatorsController);
  }

  drawOrganisms(controller) {
    controller.organisms.forEach( organism => {
      this.drawOrganism(organism);
    });
  }

  drawOrganism(organism) {
    // debugger;
    this.ctx.beginPath();
    this.ctx.arc(positiveMod(organism.center.x - this.dx, this.panoramaSize.width),
                 organism.center.y, organism.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = organism.color;
    this.ctx.fill();
  }

  updateDx() {
    this.dampenStaleCursorInput();
    this.dx += this.cursorOffsetX * 0.075;
    this.dx = positiveMod(this.dx, this.panoramaSize.width);
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
    if (Math.abs(this.canvasSize.width / 2 - x) > this.canvasSize.width / 3) {
      this.toggleDampening(false);
      this.cursorOffsetX = x - (this.canvasSize.width / 2);
    } else {
      this.toggleDampening(true);
    }
  }

  setCanvasListeners(canvas) {
    canvas.addEventListener('mousemove', e => {
      const mousePos = getMousePos(canvas, e);
      this.updateCursorOffset(mousePos);
    });

    canvas.addEventListener('mouseout', () => {
      this.toggleDampening(true);
    });
  }


}
