'use strict';

import SimulationParams from './simulation_params';
import Simulation from './simulation';
import Sliders from './sliders';

// This file manages interaction with the HTML document

document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById("canvas");
  const graph = document.getElementById("graph");
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
    }
  };
  const simulationParams = new SimulationParams;
  const simulation = new Simulation(canvas, graph, simulationParams);
  const sliders = new Sliders(sliderEls, simulation, simulationParams);
  // simulation.loadAssets(); // fetch images from server for user in canvas
  simulation.begin();
});
