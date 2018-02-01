'use strict';

import { positiveMod, fieldCellCoords, gravitation,
         distance, distanceX, distanceY } from '../util/util';

export default class Organism {
  constructor({speed, radius, color, perception}, panoramaSize) {
    this.speed = speed;
    this.radius = radius;
    this.color = color;
    this.perception = perception;
    this.initializeCenter(panoramaSize);
    this.initializeDirection();
  }

  // Choose a random spot on the display for the organism to be placed
  initializeCenter({width, height}) {
    this.center = {
      x: Math.random() * width,
      y: (Math.random() * (height - (2 * this.radius))) + this.radius
    };
  }

  // Choose a random direction for the organism to move at its initialization
  initializeDirection() {
    // sample as an angle for a uniform radial distribution
    // i.e. don't bias directions to the diagonals via a cartesian ransom sample
    const radialDirection = Math.random() * 2 * Math.PI;
    this.direction = {
      x: Math.cos(radialDirection),
      y: Math.sin(radialDirection)
    };
  }

  // move the organism's position by one tick
  moveOrganism({width, height}) {
    this.center = {
      x: positiveMod(this.center.x + this.dxdt(), width),
      y: this.center.y + this.dydt()
    };
    this.resolveBounces(height);
  }

  // y-velocity
  dydt() {
    return this.speed * this.direction.y;
  }

  // x-velocity
  dxdt() {
    return this.speed * this.direction.x;
  }

  // minimum y-position the organism can fit on the display
  minHeight() {
    return this.radius;
  }

  // maximum y-position the organism can fit on the display
  maxHeight(height) {
    return height - this.radius;
  }

  // prevent rendering outside of the display and
  // flip y-velocity to "bounce" off of the display's edge
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

  // change the direction the organism is moving based on
  // the predator/prey interactions.
  updateDirection(field) {
    const gradient = field.constructGradient(this);
    const totalSpeed = Math.sqrt( Math.pow(this.direction.x + (gradient.x / this.perception), 2) +
                                  Math.pow(this.direction.y + (gradient.y / this.perception), 2) );
    const normalization = 1 / totalSpeed;
    this.direction.x = (this.direction.x + (gradient.x / this.perception)) * normalization;
    this.direction.y = (this.direction.y + (gradient.y / this.perception)) * normalization;
  }
}
