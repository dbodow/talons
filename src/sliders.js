'use strict';

export default class Sliders {
  constructor(sliderEls, simulation, simulationParams) {
    this.simulation = simulation;
    this.simulationParams = simulationParams;
    this.initializeEventListeners(sliderEls);
  }

  initializeEventListeners({predatorsSliders, preysSliders}) {
    this.initializePredatorsEventListeners(predatorsSliders);
    this.initializePreysEventListeners(preysSliders);
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

  updateOrganisms() {
    this.simulation.updateOrganisms({
      predatorsParams: this.simulationParams.predatorsParams(),
      preysParams: this.simulationParams.preysParams()
    });
  }

  updatePreysField() {
    this.simulation.updatePreysField(this.simulationParams.preyFieldParams());
  }
}
