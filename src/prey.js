import Organism from './organism';

export default class Prey extends Organism {
  constructor(preyParams, ctx, panoramaWidth, panoramaHeight) {
    // console.log("prey ", preyParams, ctx, panoramaWidth, panoramaHeight);
    super(preyParams, ctx, panoramaWidth, panoramaHeight);
  }
}
