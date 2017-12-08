'use strict';

import Panorama from './panorama';
import Zoo from './zoo';
import Graph from './graph';

export default class Simulation {
  constructor(canvas, graphCanvas, simulationParams) {
    this.simulationParams = simulationParams;
    this.canvas = canvas;
    this.graph = new Graph(graphCanvas, simulationParams);
    this.panorama = new Panorama(this.canvas);
    this.zoo = new Zoo(this.simulationParams.predatorsParams(),
                       this.simulationParams.preysParams(),
                       this.simulationParams.predatorFieldParams(),
                       this.simulationParams.preyFieldParams(),
                       this.panorama.panoramaSize);
  }

  begin() {
    this.ticker = setInterval(() => {
      this.panorama.updateDx();
      this.zoo.tick();
      this.panorama.draw(this.zoo);
      this.graph.draw(this.zoo);
    }, 42); //42 mHz = 24 fps
  }

  updateOrganisms(newParams) {
    this.zoo.updateOrganisms(newParams);
  }

  updatePreysField(newParams) {
    this.zoo.updatePreysField(newParams);
  }
}
