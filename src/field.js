'use strict';

export default class Field {
  constructor(sgn) {

  }

  initializeField() {
    const rowCount = Math.ceil(this.panoramaHeight / this.fieldNetSize);
    const colCount = Math.ceil(this.panoramaWidth / this.fieldNetSize);
    this.gravitationalField = Array(rowCount).fill(0).map(el => (
      Array(colCount).fill(0)
    ));
  }

  resetField() {
    // needs to be in the same object
    const rows = Object.keys(this.gravitationalField);
    const centerRow = rows[Math.floor(rows.length/2)];
    // console.log(centerRow);
    rows.forEach( row => {
      const cols = Object.keys(this.gravitationalField[row]);
      const dRowCenter = distanceY(centerRow, row);
      cols.forEach( col => {
        // prevent clustering on edges
        this.gravitationalField[row][col] = this.fieldEdgeSgn*(dRowCenter / centerRow)/1000;
      });
    });
    // debugger;
  }

  calculateField(organismsController) {
    this.resetField();
    organismsController.organisms.forEach( organism => {
      this.updateField(organism);
    });
  }

  updateField(organism) {
    organism.updateFieldPosition(this.fieldNetSize);
    const position = organism.fieldPosition;
    for(let row = position.y - this.gravitationNbhd; row < position.y + this.gravitationNbhd; row++) {
      for(let col = position.x - this.gravitationNbhd; col < position.x + this.gravitationNbhd; col++) {
        // JS will get mad if you try to change the iterator mid loop.
        let proxyCol = col;
        if (row < 0 || row >= this.panoramaHeight / this.fieldNetSize) continue;
        if (proxyCol < 0 || proxyCol >= this.panoramaWidth / this.fieldNetSize) proxyCol = positiveMod(proxyCol, Math.floor(this.panoramaWidth / this.fieldNetSize));
        const pointVector = gravitation(distance(position.x, position.y, proxyCol, row, this.panoramaWidth));
        this.gravitationalField[row][proxyCol] += pointVector;
      }
    }
  }

  // calculate the current position in the discrete field for an organism
  updateFieldPosition(fieldNetSize) {
    // debugger;
    this.fieldPosition = fieldCellCoords(this.centerX, this.centerY, fieldNetSize);
  }

  // use the field of other organisms to construct a gradient for an organism
  constructGradient(panoramaCenter) {
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
}
