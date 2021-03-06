'use strict';

const backgroundPath = 'https://s3-us-west-1.amazonaws.com/talons-dev/final-background-cropped.jpeg';

export default class Background {
  // eventually refactor into background and panorama classes
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.img = new Image(3000, 750);
    this.img.onload = () => { this.loaded = true; };
    this.img.src = backgroundPath;
    this.loaded = false;
    this.imageSize = {
      width: this.img.width,
      height: this.img.height
    };
    console.log(this.imageSize);
    this.canvasSize = {
      width: canvas.width,
      height: canvas.height
    };
  }

  draw(dx) {
    this.ctx.drawImage(this.img, -dx, 0);
    // only perform second draw of stitched image when necessary
    if (this.doesImageNeedStitching(dx)) {
      this.ctx.drawImage(this.img, this.imageSize.width - dx, 0);
    }
  }

  doesImageNeedStitching(dx) {
    return dx > (this.imageSize.width - this.canvasSize.width);
  }
}
