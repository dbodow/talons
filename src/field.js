'use strict';

import { distanceY, distanceX, distance,
         fieldCellCoords, positiveMod, gravitation } from '../util/util';

export default class Field {
  constructor({fieldNetSize, gravitationNbhd}, {height, width}, sgn) {
    this.fieldSize = {
      rowCount: Math.ceil(height / fieldNetSize),
      colCount: Math.ceil(width / fieldNetSize)
    };
    this.fieldNetSize = fieldNetSize;
    this.gravitationNbhd = gravitationNbhd;
    this.sgn = sgn;
    this.initializeField(this.fieldSize);
  }

  initializeField({rowCount, colCount}) {
    this.field = Array(rowCount).fill(0).map(el => (
      Array(colCount).fill(0)
    ));
  }

  resetField() {
    const rowIdxs = Object.keys(this.field);
    const centerRowIdx = rowIdxs[Math.floor(rowIdxs.length/2)];
    rowIdxs.forEach( rowIdx => {
      const colIdxs = Object.keys(this.field[rowIdx]);
      const distCenterRow = distanceY(centerRowIdx, rowIdx);
      colIdxs.forEach( colIdx => {
        // prevent clustering on edges
        this.field[rowIdx][colIdx] = (distCenterRow / centerRowIdx) / 1000;
      });
    });
  }

  calculateField(organismsController) {
    this.resetField();
    organismsController.organisms.forEach( organism => {
      this.updateField(organism);
    });
  }

  updateField(organism) {
    let x, y;
    ({x, y} = this.fieldPosition(organism));
    for (let row = y - this.gravitationNbhd; row < y + this.gravitationNbhd; row++) {
      for (let col = x - this.gravitationNbhd; col < x + this.gravitationNbhd; col++) {
        // JS will get mad if you try to change the iterator mid loop.
        let modCol = col;
        if (row < 0 || row >= this.fieldSize.rowCount) continue;
        if (modCol < 0 || modCol >= this.fieldSize.colCount) {
          modCol = positiveMod(modCol, Math.floor(this.fieldSize.colCount));
        }
        const pointVector = this.sgn * gravitation(distance(x, y, modCol, row, this.fieldSize.colCount));
        this.field[row][modCol] += pointVector;
      }
    }
  }

  fieldPosition(organism) {
    return fieldCellCoords(organism.center, this.fieldNetSize);
  }

  // use the field of other organisms to construct a gradient for an organism
  constructGradient(organism) {
    let x, y;
    ({x, y} = this.fieldPosition(organism));
    const gradient = {
      x: 0,
      y: 0
    };
    for (let row = y - this.gravitationNbhd; row < y + this.gravitationNbhd; row++) {
      for (let col = x - this.gravitationNbhd; col < x + this.gravitationNbhd; col++) {
        let modCol = col;
        if (row < 0 || row >= this.fieldSize.rowCount) continue;
        if (col === x || row === y) continue;
        modCol = positiveMod(modCol, this.fieldSize.colCount);
        const dist = distance(col, row, x, y, this.fieldSize.colCount);
        const weight = gravitation(dist);
        const xDist = distanceX(x, modCol, this.fieldSize.rowCount);
        const yDist = distanceY(y, row);
        const sin = yDist / dist;
        const cos = xDist / dist;
        const sgnX = (col > x) ? 1 : -1 ;
        const sgnY = (row > y) ? 1 : -1 ;
        gradient.x += this.field[row][modCol] * cos * weight * sgnX;
        gradient.y += this.field[row][modCol] * sin * weight * sgnY;
        if (isNaN(gradient.x) || isNaN(gradient.y)) debugger;
      }
    }
    return gradient;
  }
}
