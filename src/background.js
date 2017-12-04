export default class Background {
  constructor(ctx, imgPath, canvasWidth) {
    this.ctx = ctx;
    this.img = new Image;
    this.img.src = imgPath;
    this.width = this.img.width;
    this.canvasWidth = canvasWidth;
    this.cursorOffsetX = 0;
    this.dx = 0;
    this.dy = 0;
    this.isDampening = false;
  }

  drawBackground() {
    this.updateDx();
    this.ctx.drawImage(this.img, -this.dx, this.dy);
    // only perform second draw of stitched image when necessary
    if (this.hasImagePannedFarRight()) {
      this.ctx.drawImage(this.img, this.width - this.dx, this.dy);
    }
  }

  hasImagePannedFarRight() {
    return this.dx > (this.width - this.canvasWidth);
  }

  updateDx() {
    this.dampenStaleCursorInput();
    this.dx += this.cursorOffsetX * 0.075;
    this.dx = this.positiveMod(this.dx, this.width);
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
      console.log('live zone');
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
    console.log('toggling ', bool);
    this.isDampening = bool;
  }
}
