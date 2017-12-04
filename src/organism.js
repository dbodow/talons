export default class Organism {
  constructor(radius, imageWidth, imageHeight, ctx) {
    this.ctx = ctx;
    this.radius = radius;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    // this.centerX = Math.floor(Math.random() * (imageWidth - 2*radius))+radius;
    // this.centerY = Math.floor(Math.random() * (imageHeight - 2*radius))+radius;
    this.centerX = 500;
    this.centerY = 500;
    this.speed = 20;
    // sample as an angle for a uniform distribution of angles
    // i.e. don't bias directions to the diagonals via a cartesian ransom sample
    const radialDirection = Math.random() * 2 * Math.PI;
    this.direction = {
      x: Math.cos(radialDirection),
      y: Math.sin(radialDirection)
    };
  }

  drawOrganism() {
    this.moveOrganism();
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
  }

  moveOrganism() {
    this.centerX += this.xMovement();
    this.centerY += this.yMovement();
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
    return this.imageHeight - this.radius;
  }

  positiveMod(n, m) {
    return ((n % m) + m) % m;
  }
}
