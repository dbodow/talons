import { distance, distanceY, positiveMod, gravitation } from '../util/util';

export default class OrganismsController {
  constructor(ctx, panoramaWidth, panoramaHeight, {fieldNetSize, gravitationNbhd}) {
    this.ctx = ctx;
    this.panoramaWidth = panoramaWidth;
    this.panoramaHeight = panoramaHeight;
    this.organisms = [];
    this.locations = [];
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

  calculateField() {
    this.resetField();
    this.organisms.forEach( organism => {
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

  killOrganisms(condemnedList) {
    condemnedList.forEach( organism => {
      const condemnedIdx = this.organisms.indexOf(organism);
      // debugger;
      this.organisms.splice(condemnedIdx, 1);
      // const survivors = this.organisms.slice(0, condemnedIdx).concat(this.organisms.slice(condemnedIdx + 1));
      // this.organisms = survivors;
    });
  }
}
