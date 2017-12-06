'use strict';

import { positiveMod, fieldCellCoords, gravitation,
         distance, distanceX, distanceY } from '../util/util';

export default class Organism {
  constructor({speed, radius, color}, panoramaSize) {
    this.speed = speed;
    this.radius = radius;
    this.color = color;
    this.initializeCenter(panoramaSize);
    this.initializeDirection();
  }

  initializeCenter({width, height}) {
    this.center = {
      x: Math.random() * width,
      y: (Math.random() * (height - (2 * this.radius))) + this.radius
    };
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

  moveOrganism({width, height}) {
    this.center = {
      x: positiveMod(this.center.x + this.dxdt(), width),
      y: this.center.y + this.dydt()
    };
    this.resolveBounces(height);
  }

  dydt() {
    return this.speed * this.direction.y;
  }

  dxdt() {
    return this.speed * this.direction.x;
  }

  minHeight() {
    return this.radius;
  }

  maxHeight(height) {
    return height - this.radius;
  }

  resolveBounces(height) {
    if (this.center.y > this.maxHeight(height)) {
      const overflow = this.center.y - this.maxHeight(height);
      this.center.y -= overflow;
      this.direction.y = -1 * this.direction.y;
    } else if (this.center.y < this.minHeight()) {
      const underflow = this.minHeight() - this.center.y;
      this.center.y += underflow;
      this.direction.y = -1 * this.direction.y;
    }
  }

  // updateDirection(field) {
  //   const gradient = field.constructGradient(this.center);
  //   const totalSpeed = Math.sqrt( Math.pow(this.direction.x + (gradient.x / 10), 2) +
  //                                 Math.pow(this.direction.y + (gradient.y / 10), 2) );
  //   const normalization = 1 / totalSpeed;
  //   this.direction.x = (this.direction.x + (gradient.x / 10)) * normalization;
  //   this.direction.y = (this.direction.y + (gradient.y / 10)) * normalization;
  // }
}
