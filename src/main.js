'use strict';

import SimulationParams from './simulation_params';
import Simulation from './simulation';

// This file manages interaction with the HTML document

document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById("canvas");
  const simulationParams = new SimulationParams;
  const simulation = new Simulation(canvas, simulationParams);
  simulation.begin();
});
