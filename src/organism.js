import { positiveMod, fieldCellCoords, gravitation,
         distance, distanceX, distanceY } from '../util/util';

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
    if (isNaN(this.centerX) || isNaN(this.centerY)) debugger;
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
    // if (isNaN(this.centerX) || isNaN(this.centerY)) debugger;
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

  // calculate the current position in the discrete field
  updateFieldPosition(fieldNetSize) {
    // debugger;
    this.fieldPosition = fieldCellCoords(this.centerX, this.centerY, fieldNetSize);
  }

  // use the field of other organisms to construct a gradient
  constructGradient(field, gravitationNbhd, fieldNetSize) {
    this.gradient = {
      x: 0,
      y: 0
    };
    for (let row = this.fieldPosition.y - gravitationNbhd; row < this.fieldPosition.y + gravitationNbhd; row++) {
      for (let col = this.fieldPosition.x - gravitationNbhd; col < this.fieldPosition.x + gravitationNbhd; col++) {
        let proxyCol = col;
        if (row < 0 || row >= this.panoramaHeight / fieldNetSize) continue;
        if (proxyCol < 0 || proxyCol >= this.panoramaWidth / fieldNetSize) proxyCol = positiveMod(proxyCol, Math.floor(this.panoramaWidth / fieldNetSize));
        if (col === this.fieldPosition.x || row === this.fieldPosition.y) continue;
        const dist = distance(col, row, this.fieldPosition.x, this.fieldPosition.y, this.panoramaWidth);
        const weight = gravitation(dist);
        const xDist = distanceX(this.fieldPosition.x, col, this.panoramaWidth);
        const yDist = distanceY(this.fieldPosition.y, row);
        const sin = yDist / dist;
        const cos = xDist / dist;
        const sgnX = (col > this.fieldPosition.x) ? 1 : -1 ;
        const sgnY = (row > this.fieldPosition.y) ? 1 : -1 ;
        this.gradient.x += field[row][proxyCol] * cos * weight * sgnX;
        this.gradient.y += field[row][proxyCol] * sin * weight * sgnY;
      }
    }
  }

  updateDirection() {
    const totalSpeed = Math.sqrt( Math.pow(this.direction.x + (this.gradient.x / 10), 2) +
                                  Math.pow(this.direction.y + (this.gradient.y / 10), 2));
    const normalization = 1 / totalSpeed;
    this.direction.x = (this.direction.x + (this.gradient.x / 10)) * normalization;
    this.direction.y = (this.direction.y + (this.gradient.y / 10)) * normalization;
  }
}
