export default class Background {
  // eventually refactor into background and panorama classes
  constructor({canvas, backgroundImage}) {
    this.ctx = canvas.getContext('2d');
    this.img = backgroundImage;
    this.imageWidth = this.img.width;
    this.imageHeight = this.img.height;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.cursorOffsetX = 0;
    this.dx = 0; // mainly for graceful error handling
  }

  draw(dx) {
    // console.log('rendering bg');
    this.dx = dx;
    // future optimization: only redraw if any scrolling has occured
    this.ctx.drawImage(this.img, -this.dx, 0);
    // only perform second draw of stitched image when necessary
    if (this.doesImageNeedStitching()) {
      // console.log('rendering stitch');
      this.ctx.drawImage(this.img, this.imageWidth - this.dx, 0);
    }
  }

  doesImageNeedStitching() {
    return this.dx > (this.imageWidth - this.canvasWidth);
  }
}
