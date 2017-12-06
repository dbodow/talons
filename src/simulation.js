'use strict';

import Panorama from './panorama';
import Zoo from './zoo';

export default class Simulation {
  constructor(canvas, simulationParams) {
    this.canvas = canvas;
    this.simulationParams = simulationParams;
    this.panorama = new Panorama(this.canvas);
    this.zoo = new Zoo(this.simulationParams.predatorsParams(),
                       this.simulationParams.preysParams(),
                       this.panorama.panoramaSize);
  }

  begin() {
    this.ticker = setInterval(() => {
      this.panorama.updateDx();
      this.zoo.tick();
      this.panorama.draw(this.zoo);
    }, 42); //42 mHz = 24 fps
  }
}
