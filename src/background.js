import Organism from './organism';

export default class Background {
  constructor({ctx, backgroundPath, canvasWidth, canvasHeight}) {
    this.ctx = ctx;
    this.img = new Image;
    this.img.src = backgroundPath;
    this.imageWidth = this.img.width;
    this.imageHeight = this.img.height;
    this.canvasWidth = canvasWidth;
    this.cursorOffsetX = 0;
    this.dx = 0;
    this.dy = 0;
    this.isDampening = false;
    this.predators = [new Organism(50, this.imageWidth, this.imageHeight, ctx)];
    // this.prey = [new Organism(30, this.imageWidth, this.imageHeight, ctx)];
  }

  drawBackground() {
    // future optimization: only redraw if any scrolling has occured
    this.updateDx();
    this.ctx.drawImage(this.img, -this.dx, this.dy);
    // only perform second draw of stitched image when necessary
    if (this.doesImageNeedStitching()) {
      this.ctx.drawImage(this.img, this.imageWidth - this.dx, this.dy);
    }
  }

  doesImageNeedStitching() {
    return this.dx > (this.imageWidth - this.canvasWidth);
  }

  updateDx() {
    this.dampenStaleCursorInput();
    this.dx += this.cursorOffsetX * 0.075;
    this.dx = this.positiveMod(this.dx, this.imageWidth);
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

  positiveMod(n, m) {
    return ((n % m) + m) % m;
  }

  toggleDampening(bool) {
    this.isDampening = bool;
  }

  drawOrganisms() {
    this.predators.forEach( organism => {
      organism.drawOrganism();
    });
    // this.prey.forEach( organism => {
    //   organism.drawOrganism();
    // });
  }
}
