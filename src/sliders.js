'use strict';
import capitalize from 'lodash/capitalize';

// This file manages listeners for the parameter sliders on the webpage
// It updates the SimulationParams when a user makes changes

// Select all the sliders through DOM
const sliderEls = {
  predatorsSliders: {
    count: document.getElementById("predator-count"),
    speed: document.getElementById("predator-speed"),
    perception: document.getElementById("predator-perception"),
    efficiency: document.getElementById("predator-efficiency"),
    reproduction: document.getElementById("predator-reproduction")
  },
  preysSliders: {
    count: document.getElementById("prey-count"),
    speed: document.getElementById("prey-speed"),
    camoflage: document.getElementById("prey-camoflage"),
    capacity: document.getElementById("prey-capacity"),
    reproduction: document.getElementById("prey-reproduction")
  },
  controls: {
    play: document.getElementById("play-button"),
    pause: document.getElementById("pause-button"),
    restart: document.getElementById("restart-button")
  }
};

// This class manages event listeners for controlling the simulation and
// changing its parameters
export default class Sliders {
  constructor(simulation, simulationParams) {
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

  initializeControl(controlGroup, controlName, eventName, callback) {
    console.log(controlGroup, controlGroup[controlName]);
    controlGroup[controlName].addEventListener(eventName, callback);
  }

  initializePredatorsEventListeners(predatorsSliders) {
    Object.keys(predatorsSliders).forEach(controlName => {
      this.initializeControl(predatorsSliders, controlName, 'mouseup', e => {
        // custom logic for transforming the user input to a parameter
        if (controlName === "perception") {
          // lower perception values are better
          // (they are an inverse-distance weight)
          this.simulationParams['predator' + capitalize(controlName)] =
            25 - e.target.value;
        } else {
          // in most cases, the slider's value is the exact parameter value
          this.simulationParams['predator' + capitalize(controlName)] =
            e.target.value;
        }
        // propogate updated parameters to the models
        this.updateOrganisms();
      });
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
    // need to transform inputs from the linear slider values
    // this.simulationParams.predatorPerception =
    //   25 - this.simulationParams.predatorPerception;
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
