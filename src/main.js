'use strict';
// This file manages interaction with the HTML document
// and integrates the top-level systems of the simulation.

// `SimulationParams` acts as a single source of truth for all parameters

// `Sliders` controls the slider components on the webpage, allowing
// users to change the simulation parameters as desired. Data flows from
// `Sliders` to `SimulationParams`

// `Simulation` runs the ecosystem model: it tracks the 'animals' and their
// interactions, and measures population levels

import SimulationParams from './simulation_params';
import Sliders from './sliders';
import Simulation from './simulation';


document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById("canvas");
  const graph = document.getElementById("graph");
  const simulationParams = new SimulationParams;
  const simulation = new Simulation(canvas, graph, simulationParams);
  const sliders = new Sliders(simulation, simulationParams);
  // simulation.loadAssets(); // fetch images from server for user in canvas
  simulation.begin();
});
