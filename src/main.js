'use strict';

import SimulationParams from './simulation_params';
import Simulation from './simulation';

// This file manages interaction with the HTML document

document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById("canvas");
  const graph = document.getElementById("graph");
  const simulationParams = new SimulationParams;
  const simulation = new Simulation(canvas, graph, simulationParams);
  // simulation.loadAssets(); // fetch images from server for user in canvas
  simulation.begin();
});
