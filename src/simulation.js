'use strict';

import Panorama from './panorama';
import Zoo from './zoo';
import Graph from './graph';

export default class Simulation {
  constructor(canvas, graphCanvas, simulationParams) {
    this.simulationParams = simulationParams;
    this.canvas = canvas;
    this.graphCanvas = graphCanvas;
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

  togglePlaying(bool) {
    if (bool) {
      this.begin();
    } else {
      clearInterval(this.ticker);
    }
  }

  updateOrganisms(newParams) {
    this.zoo.updateOrganisms(newParams);
    this.graph.updateOrganisms(newParams.preysParams);
  }

  updatePreysField(newParams) {
    this.zoo.updatePreysField(newParams);
  }

  restart() {
    clearInterval(this.ticker);
    this.graph = new Graph(this.graphCanvas, this.simulationParams);
    this.panorama = new Panorama(this.canvas);
    this.zoo = new Zoo(this.simulationParams.predatorsParams(),
                       this.simulationParams.preysParams(),
                       this.simulationParams.predatorFieldParams(),
                       this.simulationParams.preyFieldParams(),
                       this.panorama.panoramaSize);
    this.begin();
  }
}
