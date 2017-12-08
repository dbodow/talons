'use strict';

export default class Sliders {
  constructor(sliderEls, simulation, simulationParams) {
    this.simulation = simulation;
    this.simulationParams = simulationParams;
    this.initializeEventListeners(sliderEls);
    this.isPlaying = true;
  }

  initializeEventListeners({predatorsSliders, preysSliders, controls}) {
    this.initializePredatorsEventListeners(predatorsSliders);
    this.initializePreysEventListeners(preysSliders);
    this.initializeControlsEventListeners(controls);
  }

  initializePredatorsEventListeners(predatorsSliders) {
    predatorsSliders.count.addEventListener('mouseup', e => {
      this.simulationParams.predatorCount = e.target.value;
    });
    predatorsSliders.speed.addEventListener('mouseup', e => {
      this.simulationParams.predatorSpeed = e.target.value;
      this.updateOrganisms();
    });
    predatorsSliders.perception.addEventListener('mouseup', e => {
      this.simulationParams.predatorPerception = 25 - e.target.value;
      this.updateOrganisms();
    });
    predatorsSliders.efficiency.addEventListener('mouseup', e => {
      this.simulationParams.predatorEfficiency = e.target.value;
      this.updateOrganisms();
    });
    predatorsSliders.reproduction.addEventListener('mouseup', e => {
      this.simulationParams.predatorReproductionPeriod = e.target.value;
      this.updateOrganisms();
    });
  }

  initializePreysEventListeners(preysSliders) {
    preysSliders.count.addEventListener('mouseup', e => {
      this.simulationParams.preyCount = e.target.value;
    });
    preysSliders.speed.addEventListener('mouseup', e => {
      this.simulationParams.preySpeed = e.target.value;
      this.updateOrganisms();
    });
    preysSliders.camoflage.addEventListener('mouseup', e => {
      this.simulationParams.preyCamoflage = e.target.value / 100;
      this.updatePreysField();
    });
    preysSliders.capacity.addEventListener('mouseup', e => {
      this.simulationParams.preyCarryingCapacity = e.target.value;
      this.updateOrganisms();
    });
    preysSliders.reproduction.addEventListener('mouseup', e => {
      this.simulationParams.preyReproductionPeriod = e.target.value;
      this.updateOrganisms();
    });
  }

  initializeControlsEventListeners(controls) {
    controls.play.addEventListener('click', e => {
      this.togglePlaying('play');
    });
    controls.pause.addEventListener('click', e => {
      this.togglePlaying('pause');
    });
    controls.restart.addEventListener('click', e => {
      this.togglePlaying('restart');
    });
  }

  updateOrganisms() {
    this.simulation.updateOrganisms({
      predatorsParams: this.simulationParams.predatorsParams(),
      preysParams: this.simulationParams.preysParams()
    });
  }

  updatePreysField() {
    this.simulation.updatePreysField(this.simulationParams.preyFieldParams());
  }

  togglePlaying(type) {
    switch (type) {
      case 'play':
        if (!this.isPlaying) {
          this.isPlaying = true;
          this.simulation.togglePlaying(true);
        }
        break;
      case 'pause':
        this.isPlaying = false;
        this.simulation.togglePlaying(false);
        break;
      case 'restart':
        this.isPlaying = true;
        this.simulation.restart();
        break;
    }
  }
}
