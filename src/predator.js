import Organism from './organism';

export default class Predator extends Organism {
  constructor(predatorParams, ctx, panoramaWidth, panoramaHeight) {
    super(predatorParams, ctx, panoramaWidth, panoramaHeight);
    this.lastAte = Date.now();
    this.efficiency = predatorParams.efficiency;
  }

  feed(locations) {
    // debugger;
    const food = locations[this.fieldPosition.y][this.fieldPosition.x];
    if (food) {
      // if (Math.abs(food.centerX - this.centerX) > 10) console.log('problem, ', Date.now());
      if (Math.abs(food.centerX - this.centerX) <= 10) console.log('no problem');
      // console.log('food ', food, "me: ", this.centerX, this.centerY);
      this.lastAte = Date.now();
      return food;
    }
  }
}
