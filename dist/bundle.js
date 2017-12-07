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
/* harmony export (immutable) */ __webpack_exports__["g"] = positiveMod;


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
/* harmony export (immutable) */ __webpack_exports__["f"] = gravitation;


// inspired by https://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas
const getMousePos = (canvas, e) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}
/* harmony export (immutable) */ __webpack_exports__["e"] = getMousePos;



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
      x: Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["g" /* positiveMod */])(this.center.x + this.dxdt(), width),
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
  constructor() {
    this.organisms = [];
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





// This file manages interaction with the HTML document

document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById("canvas");
  const simulationParams = new __WEBPACK_IMPORTED_MODULE_0__simulation_params__["a" /* default */];
  const simulation = new __WEBPACK_IMPORTED_MODULE_1__simulation__["a" /* default */](canvas, simulationParams);
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
    this.predatorCount = 10;
    this.predatorSpeed = 15;
    this.predatorRadius = 40;
    this.predatorGravitationNbhd = 10;
    this.predatorColor = '#bc482b';
    this.predatorEfficiency = 2000000;
    this.predatorPerception = 25; // lower is better; this is a 1/x weight
    this.preyCount = 20;
    this.preySpeed = 10;
    this.preyRadius = 20;
    this.preyGravitationNbhd = 10;
    this.preyColor = '#4c6ea5';
    this.preyPerception = 7; // lower is better; this is a 1/x weight
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
      }
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
      }
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
      gravitationNbhd: this.preyGravitationNbhd
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





class Simulation {
  constructor(canvas, simulationParams) {
    this.canvas = canvas;
    this.simulationParams = simulationParams;
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
    }, 42); //42 mHz = 24 fps
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

  draw(zoo) {
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
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
    this.ctx.arc(Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["g" /* positiveMod */])(organism.center.x - this.dx, this.panoramaSize.width),
                 organism.center.y, organism.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = organism.color;
    this.ctx.fill();
  }

  updateDx() {
    this.dampenStaleCursorInput();
    this.dx += this.cursorOffsetX * 0.075;
    this.dx = Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["g" /* positiveMod */])(this.dx, this.panoramaSize.width);
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
      const mousePos = Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["e" /* getMousePos */])(canvas, e);
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


const backgroundPath = 'https://s3-us-west-1.amazonaws.com/talons-dev/placeholder-background.jpeg';

class Background {
  // eventually refactor into background and panorama classes
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.img = new Image;
    this.img.src = backgroundPath;
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

  tick() {
    this.feed();
    this.calculateFields();
    this.moveOrganisms();
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
  constructor(predatorsParams, panoramaSize) {
    super();
    this.populatePredators(predatorsParams, panoramaSize);
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

  // starvePredators() {
  //   const starved = [];
  //   const currentTime = Date.now();
  //   this.organisms.forEach( predator => {
  //     if (currentTime - predator.lastAte > predator.efficiency) {
  //       starved.push(predator);
  //     }
  //   });
  //   this.killOrganisms(starved);
  // }
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
  constructor(preysParams, panoramaSize) {
    super();
    this.populatePreys(preysParams, panoramaSize);
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

  // initializeLocations() {
  //   const rowCount = Math.ceil(this.panoramaHeight / this.fieldNetSize);
  //   const colCount = Math.ceil(this.panoramaWidth / this.fieldNetSize);
  //   this.locations = Array(rowCount).fill(0).map(el => (
  //     Array(colCount)
  //   ));
  // }
  //
  // resetLocations() {
  //   this.locations.forEach( row => {
  //     row.map( entry => null );
  //   });
  // }
  //
  // updateLocations() {
  //   // debugger;
  //   this.resetLocations();
  //   this.organisms.forEach( organism => {
  //     if (organism.fieldPosition === undefined) debugger;
  //     if (this.locations[organism.fieldPosition.y] === undefined ) debugger;
  //     // if (this.locations[organism.fieldPosition.y][organism.fieldPosition.x] !== null) console.log(organism);
  //     this.locations[organism.fieldPosition.y][organism.fieldPosition.x] = organism;
  //   });
  // }
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
          modCol = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["g" /* positiveMod */])(modCol, Math.floor(this.fieldSize.colCount));
        }
        const pointVector = this.sgn * Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["f" /* gravitation */])(Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["a" /* distance */])(x, y, modCol, row, this.fieldSize.colCount));
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
        modCol = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["g" /* positiveMod */])(modCol, this.fieldSize.colCount);
        const dist = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["a" /* distance */])(col, row, x, y, this.fieldSize.colCount);
        const weight = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["f" /* gravitation */])(dist);
        const xDist = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["b" /* distanceX */])(x, modCol, this.fieldSize.rowCount);
        const yDist = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["c" /* distanceY */])(y, row);
        const sin = yDist / dist;
        const cos = xDist / dist;
        const sgnX = (col > x) ? 1 : -1 ;
        const sgnY = (row > y) ? 1 : -1 ;
        gradient.x += this.field[row][modCol] * cos * weight * sgnX;
        gradient.y += this.field[row][modCol] * sin * weight * sgnY;
        if (isNaN(gradient.x) || isNaN(gradient.y)) debugger;
      }
    }
    return gradient;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Field;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map