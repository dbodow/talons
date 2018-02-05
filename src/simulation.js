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
    this.animationInterval = 1000 / 24; // i.e. 24 fps throttle
  }

  tick(timestamp) {
    this.ticker = window.requestAnimationFrame(this.tick.bind(this));

    const now = Date.now();
    const elapsed = now - this.nextRender;

    if (elapsed > this.animationInterval) {
      this.nextRender = now;

      this.panorama.updateDx();
      this.zoo.tick();
      this.panorama.draw(this.zoo);
      this.graph.draw(this.zoo);
    }
  }

  begin() {
    this.nextRender = Date.now();
    this.tick();
  }

  togglePlaying(bool) {
    if (bool) {
      this.pauseTimestamp = this.pauseTimestamp || Date.now();
      this.zoo.unpause(this.pauseTimestamp);
      delete this.pauseTimestamp;
      this.begin();
    } else {
      this.pauseTimestamp = Date.now();
      window.cancelAnimationFrame(this.ticker);
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
    window.cancelAnimationFrame(this.ticker);
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
