import { positiveMod } from '../util/util';

export default class Organism {
  constructor({speed, radius, color}, ctx, panoramaWidth, panoramaHeight) {
    this.ctx = ctx;
    this.speed = speed;
    this.radius = radius;
    this.color = color;
    this.panoramaWidth = panoramaWidth;
    this.panoramaHeight = panoramaHeight;
    this.initializeCenter();
    this.initializeDirection();
  }

  initializeCenter() {
    this.centerX = Math.random() * this.panoramaWidth;
    this.centerY = Math.random() * (this.panoramaHeight - 2 * this.radius) + this.radius;
  }

  initializeDirection() {
    // sample as an angle for a uniform radial distribution
    // i.e. don't bias directions to the diagonals via a cartesian ransom sample
    const radialDirection = Math.random() * 2 * Math.PI;
    this.direction = {
      x: Math.cos(radialDirection),
      y: Math.sin(radialDirection)
    };
  }

  draw(dx) {
    this.moveOrganism();
    this.renderOrganism(dx);
  }

  renderOrganism(dx) {
    // console.log('rendering organism');
    this.ctx.beginPath();
    this.ctx.arc(positiveMod(this.centerX - dx, this.panoramaWidth), this.centerY, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  moveOrganism() {
    this.centerX = positiveMod(this.centerX + this.xMovement(), this.panoramaWidth);
    this.centerY += this.yMovement();
    this.resolveBounces();
  }

  yMovement() {
    return this.speed * this.direction.y;
  }

  xMovement() {
    return this.speed * this.direction.x;
  }

  minHeight() {
    return this.radius;
  }

  maxHeight() {
    return this.panoramaHeight - this.radius;
  }

  resolveBounces() {
    if (this.centerY > this.maxHeight()) {
      const overflow = this.centerY - this.maxHeight();
      this.centerY -= overflow;
      this.direction.y = -1 * this.direction.y;
    } else if (this.centerY < this.minHeight()) {
      const underflow = this.minHeight() - this.centerY;
      this.centerY += underflow;
      this.direction.y = -1 * this.direction.y;
    }
  }
}
