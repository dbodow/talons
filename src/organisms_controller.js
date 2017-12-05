import { distance, positiveMod, gravitation } from '../util/util';

export default class OrganismsController {
  constructor(ctx, panoramaWidth, panoramaHeight, {fieldNetSize, gravitationNbhd}) {
    this.ctx = ctx;
    this.panoramaWidth = panoramaWidth;
    this.panoramaHeight = panoramaHeight;
    this.organisms = [];
    this.fieldNetSize = fieldNetSize;
    this.gravitationNbhd = gravitationNbhd;
    this.initializeField();
  }



  draw(dx) {
    this.organisms.forEach( organism => {
      organism.draw(dx);
    });
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
    rows.forEach( row => {
      const cols = Object.keys(row);
      cols.forEach( col => {
        this.gravitationalField[row][col] = 0;
      });
    });
  }

  calculateField() {
    this.resetField();
    this.organisms.forEach( organism => {
      this.updateField(organism);
    });
    // console.log(this.gravitationalField);
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
}
