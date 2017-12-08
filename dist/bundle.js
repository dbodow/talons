/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const positiveMod = (n, m) => (
  ((n % m) + m) % m
);
/* harmony export (immutable) */ __webpack_exports__["h"] = positiveMod;


// computed the horizontal distance between two points
// accounting for the panorama's wrapping
const distanceX = (x1, x2, width) => {
  const smaller = Math.min(x1, x2);
  const larger = Math.max(x1, x2);
  const innerDistance = larger - smaller;
  const outerDistance = smaller + width - larger;
  return Math.min(innerDistance, outerDistance);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = distanceX;


const distanceY = (y1, y2) => {
  return Math.abs(y2 - y1);
};
/* harmony export (immutable) */ __webpack_exports__["c"] = distanceY;


const distance = (x1, y1, x2, y2, width) => {
  return Math.sqrt(Math.pow(distanceY(y1, y2), 2) +
                   Math.pow(distanceX(x1, x2, width), 2));
};
/* harmony export (immutable) */ __webpack_exports__["a"] = distance;


const fieldCellCoords = ({x, y}, fieldNetSize) => ({
  x: Math.floor(x / fieldNetSize),
  y: Math.floor(y / fieldNetSize)
});
/* harmony export (immutable) */ __webpack_exports__["d"] = fieldCellCoords;


const gravitation = dist => {
  if (dist === 0) {
    // avoid singularities;
    return 100;
  } else {
    return Math.pow(dist, -2);
  }
};
/* harmony export (immutable) */ __webpack_exports__["g"] = gravitation;


// inspired by https://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas
const getMousePos = (canvas, e) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
};
/* harmony export (immutable) */ __webpack_exports__["f"] = getMousePos;


const fitToAxis = (value, valueMax, axisMax) => (
  (value / valueMax) * axisMax
);
/* harmony export (immutable) */ __webpack_exports__["e"] = fitToAxis;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_util__ = __webpack_require__(0);




class Organism {
  constructor({speed, radius, color, perception}, panoramaSize) {
    this.speed = speed;
    this.radius = radius;
    this.color = color;
    this.perception = perception;
    this.initializeCenter(panoramaSize);
    this.initializeDirection();
  }

  initializeCenter({width, height}) {
    this.center = {
      x: Math.random() * width,
      y: (Math.random() * (height - (2 * this.radius))) + this.radius
    };
  }

  initializeDirection() {
    // sample as an angle for a uniform radial distribution
    // i.e. don't bias directions to the diagonals via a cartesian ransom sample
    const radialDirection = Math.random() * 2 * Math.PI;
    this.direction = {
      x: Math.cos(radialDirection),
      y: Math.sin(radialDirection)
    };
  }

  moveOrganism({width, height}) {
    this.center = {
      x: Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["h" /* positiveMod */])(this.center.x + this.dxdt(), width),
      y: this.center.y + this.dydt()
    };
    this.resolveBounces(height);
  }

  dydt() {
    return this.speed * this.direction.y;
  }

  dxdt() {
    return this.speed * this.direction.x;
  }

  minHeight() {
    return this.radius;
  }

  maxHeight(height) {
    return height - this.radius;
  }

  resolveBounces(height) {
    if (this.center.y > this.maxHeight(height)) {
      const overflow = this.center.y - this.maxHeight(height);
      this.center.y -= overflow;
      this.direction.y = -1 * this.direction.y;
    } else if (this.center.y < this.minHeight()) {
      const underflow = this.minHeight() - this.center.y;
      this.center.y += underflow;
      this.direction.y = -1 * this.direction.y;
    }
  }

  updateDirection(field) {
    const gradient = field.constructGradient(this);
    const totalSpeed = Math.sqrt( Math.pow(this.direction.x + (gradient.x / this.perception), 2) +
                                  Math.pow(this.direction.y + (gradient.y / this.perception), 2) );
    const normalization = 1 / totalSpeed;
    this.direction.x = (this.direction.x + (gradient.x / this.perception)) * normalization;
    this.direction.y = (this.direction.y + (gradient.y / this.perception)) * normalization;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Organism;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_util__ = __webpack_require__(0);




class OrganismsController {
  constructor(reproductionPeriod) {
    this.organisms = [];
    this.lastReproduced = Date.now();
    this.reproductionPeriod = reproductionPeriod;
  }

  moveOrganisms(panoramaSize, field) {
    this.updateDirections(field);
    this.organisms.forEach( organism => {
      organism.moveOrganism(panoramaSize);
    });
  }

  updateDirections(field) {
    this.organisms.forEach( organism => {
      organism.updateDirection(field);
    });
  }

  killOrganisms(condemnedList) {
    condemnedList.forEach( organism => {
      const condemnedIdx = this.organisms.indexOf(organism);
      this.organisms.splice(condemnedIdx, 1);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = OrganismsController;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__simulation_params__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__simulation__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sliders__ = __webpack_require__(15);






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
  const simulationParams = new __WEBPACK_IMPORTED_MODULE_0__simulation_params__["a" /* default */];
  const simulation = new __WEBPACK_IMPORTED_MODULE_1__simulation__["a" /* default */](canvas, graph, simulationParams);
  const sliders = new __WEBPACK_IMPORTED_MODULE_2__sliders__["a" /* default */](sliderEls, simulation, simulationParams);
  // simulation.loadAssets(); // fetch images from server for user in canvas
  simulation.begin();
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


// SimulationParams: controls the parameters for the simulation.
// Allows users to adjust input; manages event listeners to
// determine this input.
class SimulationParams {
  constructor() {
    //set defaults
    this.predatorCount = 20;
    this.predatorSpeed = 15;
    this.predatorRadius = 40;
    this.predatorGravitationNbhd = 10;
    this.predatorColor = '#354b6d';
    this.predatorEfficiency = 10000;
    this.predatorPerception = 25; // lower is better; this is a 1/x weight
    this.predatorReproductionPeriod = 12000; // should be longer than efficiency
    this.preyCount = 50;
    this.preySpeed = 10;
    this.preyRadius = 10;
    this.preyGravitationNbhd = 20;
    this.preyColor = '#efe092';
    this.preyPerception = 7; // lower is better; this is a 1/x weight
    this.preyCamoflage = 0.5;
    this.preyReproductionPeriod = 10000; // should be longer than efficiency
    this.preyCarryingCapacity = 200;
    this.fieldNetSize = 10; // Must be smaller than radius/sqrt(2)!
  }

  predatorsParams() {
    return {
      count: this.predatorCount,
      predatorParams: {
        speed: this.predatorSpeed,
        radius: this.predatorRadius,
        color: this.predatorColor,
        efficiency: this.predatorEfficiency,
        perception: this.predatorPerception
      },
      reproductionPeriod: this.predatorReproductionPeriod
    };
  }

  preysParams() {
    return {
      count: this.preyCount,
      preyParams: {
        speed: this.preySpeed,
        radius: this.preyRadius,
        color: this.preyColor,
        perception: this.preyPerception
      },
      reproductionPeriod: this.preyReproductionPeriod,
      carryingCapacity: this.preyCarryingCapacity
    };
  }

  predatorFieldParams() {
    return {
      fieldNetSize: this.fieldNetSize,
      gravitationNbhd: this.predatorGravitationNbhd
    };
  }

  preyFieldParams() {
    return {
      fieldNetSize: this.fieldNetSize,
      gravitationNbhd: Math.round(this.preyGravitationNbhd * this.preyCamoflage)
    };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SimulationParams;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__panorama__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__zoo__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__graph__ = __webpack_require__(14);






class Simulation {
  constructor(canvas, graphCanvas, simulationParams) {
    this.simulationParams = simulationParams;
    this.canvas = canvas;
    this.graph = new __WEBPACK_IMPORTED_MODULE_2__graph__["a" /* default */](graphCanvas, simulationParams);
    this.panorama = new __WEBPACK_IMPORTED_MODULE_0__panorama__["a" /* default */](this.canvas);
    this.zoo = new __WEBPACK_IMPORTED_MODULE_1__zoo__["a" /* default */](this.simulationParams.predatorsParams(),
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Simulation;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__background__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_util__ = __webpack_require__(0);





// handles all logic for the wrapping panorama and drawing all canvas items
// in particular, tracks offset for drawing based on user scroll
class Panorama {
  constructor(canvas) {
    this.background = new __WEBPACK_IMPORTED_MODULE_0__background__["a" /* default */](canvas);
    this.ctx = canvas.getContext('2d');
    this.panoramaSize = this.background.imageSize;
    this.canvasSize = this.background.canvasSize;

    this.dx = 0;
    this.isDampening = false;
    this.cursorOffsetX = 0;

    this.setCanvasListeners(canvas);
  }

  // loadAssets() {
  //   let loaded = false;
  //   this.background.
  // }

  draw(zoo) {
    // this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    this.background.draw(this.dx);
    this.drawOrganisms(zoo.preysController);
    this.drawOrganisms(zoo.predatorsController);
  }

  drawOrganisms(controller) {
    controller.organisms.forEach( organism => {
      this.drawOrganism(organism);
    });
  }

  drawOrganism(organism) {
    this.ctx.beginPath();
    this.ctx.arc(Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["h" /* positiveMod */])(organism.center.x - this.dx, this.panoramaSize.width),
                 organism.center.y, organism.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = organism.color;
    this.ctx.strokeStyle = '#476189';
    this.ctx.fill();
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
  }

  updateDx() {
    this.dampenStaleCursorInput();
    this.dx += this.cursorOffsetX * 0.075;
    this.dx = Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["h" /* positiveMod */])(this.dx, this.panoramaSize.width);
  }

  toggleDampening(bool) {
    this.isDampening = bool;
  }

  dampenStaleCursorInput() {
    if (this.isDampening) {
      this.cursorOffsetX = this.cursorOffsetX * 0.8;
      if (Math.abs(this.cursorOffsetX) < 1) {
        this.cursorOffsetX = 0;
      }
    }
  }

  updateCursorOffset({x}) {
    if (Math.abs(this.canvasSize.width / 2 - x) > this.canvasSize.width / 3) {
      this.toggleDampening(false);
      this.cursorOffsetX = x - (this.canvasSize.width / 2);
    } else {
      this.toggleDampening(true);
    }
  }

  setCanvasListeners(canvas) {
    canvas.addEventListener('mousemove', e => {
      const mousePos = Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["f" /* getMousePos */])(canvas, e);
      this.updateCursorOffset(mousePos);
    });

    canvas.addEventListener('mouseout', () => {
      this.toggleDampening(true);
    });
  }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = Panorama;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


// const backgroundPath = 'https://s3-us-west-1.amazonaws.com/talons-dev/placeholder-background.jpeg';
const backgroundPath = 'https://s3-us-west-1.amazonaws.com/talons-dev/final-background-cropped.jpeg';

class Background {
  // eventually refactor into background and panorama classes
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.img = new Image;
    this.img.src = backgroundPath;
    this.loaded = false;
    this.imageSize = {
      width: this.img.width,
      height: this.img.height
    };
    this.canvasSize = {
      width: canvas.width,
      height: canvas.height
    };
  }

  draw(dx) {
    this.ctx.drawImage(this.img, -dx, 0);
    // only perform second draw of stitched image when necessary
    if (this.doesImageNeedStitching(dx)) {
      this.ctx.drawImage(this.img, this.imageSize.width - dx, 0);
    }
  }

  doesImageNeedStitching(dx) {
    return dx > (this.imageSize.width - this.canvasSize.width);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Background;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__predators_controller__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__preys_controller__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__field__ = __webpack_require__(13);






class Zoo {
  constructor(predatorsParams, preysParams,
              predatorFieldParams, preyFieldParams, panoramaSize) {
    this.panoramaSize = panoramaSize;
    this.predatorsController = new __WEBPACK_IMPORTED_MODULE_0__predators_controller__["a" /* default */](predatorsParams, panoramaSize);
    this.preysController = new __WEBPACK_IMPORTED_MODULE_1__preys_controller__["a" /* default */](preysParams, panoramaSize);
    this.predatorsField = new __WEBPACK_IMPORTED_MODULE_2__field__["a" /* default */](predatorFieldParams, panoramaSize, -1);
    this.preysField = new __WEBPACK_IMPORTED_MODULE_2__field__["a" /* default */](preyFieldParams, panoramaSize, 1);
  }

  updateOrganisms({predatorsParams, preysParams}) {
    this.predatorsController.updatePredatorsParams(predatorsParams);
    this.preysController.updatePreysParams(preysParams);
  }

  updatePreysField(preyFieldParams) {
    this.preysField.updateFieldParams(preyFieldParams);
  }

  tick() {
    this.feed();
    this.starve();
    this.calculateFields();
    this.moveOrganisms();
    this.reproduce();
  }

  moveOrganisms() {
    this.movePredators();
    this.movePrey();
  }

  movePredators() {
    this.predatorsController.moveOrganisms(this.panoramaSize, this.preysField);
  }

  movePrey() {
    this.preysController.moveOrganisms(this.panoramaSize, this.predatorsField);
  }

  calculateFields() {
    this.calculatePredatorsField();
    this.calculatePreysField();
  }

  calculatePredatorsField() {
    this.predatorsField.calculateField(this.predatorsController);
  }

  calculatePreysField() {
    this.preysField.calculateField(this.preysController);
  }

  // construct a hash of preys' locations on the field grid, with
  // coords pointing to the top prey on a given tile (O(preys) time)
  // Then, each predator can check the hash at its own location to
  // find food (O(predators) time). Total: O(predators + preys)
  feed() {
    const preysLocations = this.calculatePreysLocations();
    const eaten = this.predatorsController.feed(preysLocations, this.preysField.fieldNetSize);
    this.preysController.killOrganisms(eaten);
  }

  calculatePreysLocations() {
    return this.preysController.revealLocations(this.preysField.fieldNetSize);
  }

  starve() {
    this.predatorsController.starvePredators();
    this.preysController.starvePreys();
  }

  reproduce() {
    this.predatorsController.reproducePredators(this.panoramaSize);
    this.preysController.reproducePreys(this.panoramaSize);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Zoo;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__predator__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__organisms_controller__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_util__ = __webpack_require__(0);






class PredatorsController extends __WEBPACK_IMPORTED_MODULE_1__organisms_controller__["a" /* default */] {
  constructor({predatorParams, count, reproductionPeriod}, panoramaSize) {
    super(reproductionPeriod);
    this.predatorParams = predatorParams;
    this.populatePredators({predatorParams, count}, panoramaSize);
  }

  populatePredators({count, predatorParams}, panoramaSize) {
    for (let i = 0; i < count; i++) {
      this.createPredator(predatorParams, panoramaSize);
    }
  }

  createPredator(predatorParams, panoramaSize) {
    const predator = new __WEBPACK_IMPORTED_MODULE_0__predator__["a" /* default */](predatorParams, panoramaSize);
    this.organisms.push(predator);
  }

  feed(preysLocations, fieldNetSize) {
    const eaten = [];
    this.organisms.forEach( predator => {
      const predatorCoords = Object(__WEBPACK_IMPORTED_MODULE_2__util_util__["d" /* fieldCellCoords */])(predator.center, fieldNetSize);
      const food = preysLocations[predatorCoords.x] ?
        preysLocations[predatorCoords.x][predatorCoords.y] : null;
      if (food) {
        eaten.push(food);
        predator.feed();
      }
    });
    return Array.from(new Set(eaten));
  }

  starvePredators() {
    const starved = [];
    const currentTime = Date.now();
    this.organisms.forEach( predator => {
      if (currentTime - predator.lastAte > predator.efficiency) {
        starved.push(predator);
      }
    });
    this.killOrganisms(starved);
  }

  reproducePredators(panoramaSize) {
    if (Date.now() - this.lastReproduced > this.reproductionPeriod) {
      const populateParams = {
        count: this.organisms.length,
        predatorParams: this.predatorParams
      };
      this.populatePredators(populateParams, panoramaSize);
      this.lastReproduced = Date.now();
    }
  }

  updatePredatorsParams({predatorParams, reproductionPeriod}) {
    this.predatorParams = predatorParams;
    this.reproductionPeriod = reproductionPeriod;
    this.organisms.forEach( predator => {
      predator.updatePredatorParams(predatorParams);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PredatorsController;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__organism__ = __webpack_require__(1);




class Predator extends __WEBPACK_IMPORTED_MODULE_0__organism__["a" /* default */] {
  constructor(predatorParams, panoramaSize) {
    super(predatorParams, panoramaSize);
    this.lastAte = Date.now();
    this.efficiency = predatorParams.efficiency;
  }

  updatePredatorParams({speed, efficiency, perception}) {
    this.speed = speed;
    this.efficiency = efficiency;
    this.perception = perception; 
  }

  feed(preys) {
    this.lastAte = Date.now();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Predator;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prey__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__organisms_controller__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_util__ = __webpack_require__(0);






class PreysController extends __WEBPACK_IMPORTED_MODULE_1__organisms_controller__["a" /* default */] {
  constructor({preyParams, count, reproductionPeriod, carryingCapacity},
              panoramaSize) {
    super(reproductionPeriod);
    this.preyParams = preyParams;
    this.carryingCapacity = carryingCapacity;
    this.populatePreys({count, preyParams}, panoramaSize);
  }

  populatePreys({count, preyParams}, panoramaSize) {
    for (let i = 0; i < count; i++) {
      this.createPrey(preyParams, panoramaSize);
    }
  }

  createPrey(preyParams, panoramaSize) {
    const prey = new __WEBPACK_IMPORTED_MODULE_0__prey__["a" /* default */](preyParams, panoramaSize);
    this.organisms.push(prey);
  }

  revealLocations(fieldNetSize) {
    const locations = {};
    this.organisms.forEach( prey => {
      const preyCoords = Object(__WEBPACK_IMPORTED_MODULE_2__util_util__["d" /* fieldCellCoords */])(prey.center, fieldNetSize);
      locations[preyCoords.x] = locations[preyCoords.x] || [];
      locations[preyCoords.x][preyCoords.y] = prey;
    });
    return locations;
  }

  reproducePreys(panoramaSize) {
    if (Date.now() - this.lastReproduced > this.reproductionPeriod) {
      const populateParams = {
        count: this.organisms.length,
        preyParams: this.preyParams
      };
      this.populatePreys(populateParams, panoramaSize);
      this.lastReproduced = Date.now();
    }
  }

  starvePreys() {
    if (this.organisms.length > this.carryingCapacity) {
      const middleIdx = Math.floor(this.organisms.length / 2);
      this.organisms = this.organisms.slice(middleIdx);
    }
  }

  updatePreysParams({preyParams, reproductionPeriod, carryingCapacity}) {
    this.preyParams = preyParams;
    this.reproductionPeriod = reproductionPeriod;
    this.carryingCapacity = carryingCapacity;
    console.log(this.reproductionPeriod);
    this.organisms.forEach( prey => {
      prey.updatePreyParams(preyParams);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PreysController;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__organism__ = __webpack_require__(1);




class Prey extends __WEBPACK_IMPORTED_MODULE_0__organism__["a" /* default */] {
  constructor(preyParams, panoramaSize) {
    super(preyParams, panoramaSize);
  }

  updatePreyParams({speed}) {
    this.speed = speed;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Prey;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_util__ = __webpack_require__(0);




class Field {
  constructor({fieldNetSize, gravitationNbhd}, {height, width}, sgn) {
    this.fieldSize = {
      rowCount: Math.ceil(height / fieldNetSize),
      colCount: Math.ceil(width / fieldNetSize)
    };
    this.fieldNetSize = fieldNetSize;
    this.gravitationNbhd = gravitationNbhd;
    this.sgn = sgn;
    this.initializeField(this.fieldSize);
  }

  initializeField({rowCount, colCount}) {
    this.field = Array(rowCount).fill(0).map(el => (
      Array(colCount).fill(0)
    ));
  }

  resetField() {
    const rowIdxs = Object.keys(this.field);
    const centerRowIdx = rowIdxs[Math.floor(rowIdxs.length/2)];
    rowIdxs.forEach( rowIdx => {
      const colIdxs = Object.keys(this.field[rowIdx]);
      const distCenterRow = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["c" /* distanceY */])(centerRowIdx, rowIdx);
      colIdxs.forEach( colIdx => {
        // prevent clustering on edges
        this.field[rowIdx][colIdx] = (distCenterRow / centerRowIdx) / 1000;
      });
    });
  }

  calculateField(organismsController) {
    this.resetField();
    organismsController.organisms.forEach( organism => {
      this.updateField(organism);
    });
  }

  updateField(organism) {
    let x, y;
    ({x, y} = this.fieldPosition(organism));
    for (let row = y - this.gravitationNbhd; row < y + this.gravitationNbhd; row++) {
      for (let col = x - this.gravitationNbhd; col < x + this.gravitationNbhd; col++) {
        // JS will get mad if you try to change the iterator mid loop.
        let modCol = col;
        if (row < 0 || row >= this.fieldSize.rowCount) continue;
        if (modCol < 0 || modCol >= this.fieldSize.colCount) {
          modCol = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["h" /* positiveMod */])(modCol, Math.floor(this.fieldSize.colCount));
        }
        const pointVector = this.sgn * Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["g" /* gravitation */])(Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["a" /* distance */])(x, y, modCol, row, this.fieldSize.colCount));
        this.field[row][modCol] += pointVector;
      }
    }
  }

  fieldPosition(organism) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["d" /* fieldCellCoords */])(organism.center, this.fieldNetSize);
  }

  // use the field of other organisms to construct a gradient for an organism
  constructGradient(organism) {
    let x, y;
    ({x, y} = this.fieldPosition(organism));
    const gradient = {
      x: 0,
      y: 0
    };
    for (let row = y - this.gravitationNbhd; row < y + this.gravitationNbhd; row++) {
      for (let col = x - this.gravitationNbhd; col < x + this.gravitationNbhd; col++) {
        let modCol = col;
        if (row < 0 || row >= this.fieldSize.rowCount) continue;
        if (col === x || row === y) continue;
        modCol = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["h" /* positiveMod */])(modCol, this.fieldSize.colCount);
        const dist = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["a" /* distance */])(col, row, x, y, this.fieldSize.colCount);
        const weight = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["g" /* gravitation */])(dist);
        const xDist = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["b" /* distanceX */])(x, modCol, this.fieldSize.rowCount);
        const yDist = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["c" /* distanceY */])(y, row);
        const sin = yDist / dist;
        const cos = xDist / dist;
        const sgnX = (col > x) ? 1 : -1 ;
        const sgnY = (row > y) ? 1 : -1 ;
        gradient.x += this.field[row][modCol] * cos * weight * sgnX;
        gradient.y += this.field[row][modCol] * sin * weight * sgnY;
      }
    }
    return gradient;
  }

  updateFieldParams({fieldNetSize, gravitationNbhd}) {
    this.fieldNetSize = fieldNetSize;
    this.gravitationNbhd = gravitationNbhd;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Field;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_util__ = __webpack_require__(0);


class Graph {
  constructor(graphCanvas, simulationParams) {
    this.graphCanvas = graphCanvas;
    this.canvasSize = {
      x: graphCanvas.width,
      y: graphCanvas.height
    };
    this.ctx = graphCanvas.getContext('2d');
    this.carryingCapacity = simulationParams.preyCarryingCapacity;
    this.lastCoords = [{
      predatorsCount: simulationParams.predatorCount,
      preysCount: simulationParams.preyCount
    }];
    this.lastDraw = Date.now();
    this.predatorColor = simulationParams.predatorColor;
    this.preyColor = simulationParams.preyColor;
  }

  draw(zoo) {
    if (Date.now() - this.lastDraw > 1000) {
      this.updateDatapoints(zoo);
      this.ctx.clearRect(0, 0, this.canvasSize.x, this.canvasSize.y);
      this.drawData();
      this.drawAxes();
      this.lastDraw = Date.now();
    }
  }

  updateDatapoints(zoo) {
    const predatorsCount = zoo.predatorsController.organisms.length;
    const preysCount = zoo.preysController.organisms.length;
    this.lastCoords.push({
      predatorsCount,
      preysCount
    });
    if (this.lastCoords.length > 100) {
      this.lastCoords = this.lastCoords.slice(1);
    }
  }

  drawData() {
    this.drawPredatorData();
    this.drawPreyData();
  }

  drawPredatorData() {
    const xIncrement = Math.floor(this.canvasSize.x / 100);
    let xCoord = 0;
    this.ctx.strokeStyle = this.predatorColor;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(xCoord,
      this.canvasSize.y - Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["e" /* fitToAxis */])(this.lastCoords[0].predatorsCount,
        this.carryingCapacity, this.canvasSize.y));
    xCoord += xIncrement;
    this.lastCoords.slice(1).forEach((coord, idx) => {
      this.ctx.lineTo(xCoord, this.canvasSize.y - Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["e" /* fitToAxis */])(coord.predatorsCount,
          this.carryingCapacity, this.canvasSize.y));
      this.ctx.stroke();
      xCoord += xIncrement;
    });
  }

  drawPreyData() {
    const xIncrement = Math.floor(this.canvasSize.x / 100);
    let xCoord = 0;
    this.ctx.strokeStyle = this.preyColor;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(xCoord,
      this.canvasSize.y - Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["e" /* fitToAxis */])(this.lastCoords[0].preysCount,
        this.carryingCapacity, this.canvasSize.y));
        // debugger;
    xCoord += xIncrement;
    this.lastCoords.slice(1).forEach((coord, idx) => {
      this.ctx.lineTo(xCoord, this.canvasSize.y - Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["e" /* fitToAxis */])(coord.preysCount,
          this.carryingCapacity, this.canvasSize.y));
      this.ctx.stroke();
      xCoord += xIncrement;
    });
  }

  drawAxes() {
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 2;

    // x-axis
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvasSize.y-1);
    this.ctx.lineTo(this.canvasSize.x, this.canvasSize.y-1);
    this.ctx.stroke();

    // y-axis
    this.ctx.beginPath();
    this.ctx.moveTo(1, 0);
    this.ctx.lineTo(1, this.canvasSize.y);
    this.ctx.stroke();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Graph;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Sliders {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Sliders;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map