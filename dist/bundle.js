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
/* harmony export (immutable) */ __webpack_exports__["b"] = positiveMod;


// computed the horizontal distance between two points
// accounting for the panorama's wrapping
const distanceX = (x1, x2, panoramaWidth) => {
  const smaller = Math.min(x1, x2);
  const larger = Math.max(x1, x2);
  const innerDistance = larger - smaller;
  const outerDistance = smaller + panoramaWidth - smaller;
  return Math.min(innerDistance, outerDistance);
};
/* unused harmony export distanceX */


const distanceY = (y1, y2) => {
  return Math.abs(y2 - y1);
};
/* unused harmony export distanceY */


const distance = (x1, y1, x2, y2, panoramaWidth) => {
  return Math.sqrt(Math.pow(distanceY(y1, y2), 2) +
                   Math.pow(distanceX(x1, x2, panoramaWidth), 2));
};
/* unused harmony export distance */


const fieldCellCoords = (x, y, fieldNetSize) => ({
  x: Math.floor(x / fieldNetSize),
  y: Math.floor(y / fieldNetSize)
});
/* unused harmony export fieldCellCoords */


const gravitation = dist => {
  if (dist === 0) {
    // avoid singularities;
    return 100;
  } else {
    return Math.pow(dist, -2);
  }
};
/* unused harmony export gravitation */


// inspired by https://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas
const getMousePos = (canvas, e) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = getMousePos;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_util__ = __webpack_require__(0);




class Organism {
  constructor({speed, radius, color}, panoramaSize) {
    this.speed = speed;
    this.radius = radius;
    this.color = color;
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
      x: Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["b" /* positiveMod */])(this.center.x + this.dxdt(), width),
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

  // updateDirection(field) {
  //   const gradient = field.constructGradient(this.center);
  //   const totalSpeed = Math.sqrt( Math.pow(this.direction.x + (gradient.x / 10), 2) +
  //                                 Math.pow(this.direction.y + (gradient.y / 10), 2) );
  //   const normalization = 1 / totalSpeed;
  //   this.direction.x = (this.direction.x + (gradient.x / 10)) * normalization;
  //   this.direction.y = (this.direction.y + (gradient.y / 10)) * normalization;
  // }
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
    // this.updateDirections(field);
    this.organisms.forEach( organism => {
      organism.moveOrganism(panoramaSize);
    });
  }

  // updateDirections(field) {
  //   this.organisms.forEach( organism => {
  //     // organism.constructGradient(this.preysField, this.gravitationNbhd, this.fieldNetSize);
  //     organism.updateDirection(field);
  //   });
  // }

  // killOrganisms(condemnedList) {
  //   condemnedList.forEach( organism => {
  //     const condemnedIdx = this.organisms.indexOf(organism);
  //     // debugger;
  //     this.organisms.splice(condemnedIdx, 1);
  //     // const survivors = this.organisms.slice(0, condemnedIdx).concat(this.organisms.slice(condemnedIdx + 1));
  //     // this.organisms = survivors;
  //   });
  // }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = OrganismsController;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__simulation_params__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__simulation__ = __webpack_require__(12);





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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__background__ = __webpack_require__(5);
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
    // debugger;
    this.ctx.beginPath();
    this.ctx.arc(Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["b" /* positiveMod */])(organism.center.x - this.dx, this.panoramaSize.width),
                 organism.center.y, organism.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = organism.color;
    this.ctx.fill();
  }

  updateDx() {
    this.dampenStaleCursorInput();
    this.dx += this.cursorOffsetX * 0.075;
    this.dx = Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["b" /* positiveMod */])(this.dx, this.panoramaSize.width);
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
      const mousePos = Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* getMousePos */])(canvas, e);
      this.updateCursorOffset(mousePos);
    });

    canvas.addEventListener('mouseout', () => {
      this.toggleDampening(true);
    });
  }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = Panorama;



/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__predator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__organisms_controller__ = __webpack_require__(2);





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

  // feed() {
  //   const eaten = [];
  //   this.organisms.forEach( predator => {
  //     const food = predator.feed(this.preysLocations);
  //     if (food) eaten.push(food);
  //   });
  //   // console.log('eaten ', eaten);
  //   return Array.from(new Set(eaten));
  // }
  //
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__organism__ = __webpack_require__(1);




class Predator extends __WEBPACK_IMPORTED_MODULE_0__organism__["a" /* default */] {
  constructor(predatorParams, panoramaSize) {
    super(predatorParams, panoramaSize);
    this.lastAte = Date.now();
    this.efficiency = predatorParams.efficiency;
  }

  // feed(locations) {
  //   // debugger;
  //   const food = locations[this.fieldPosition.y][this.fieldPosition.x];
  //   if (food) {
  //     // if (Math.abs(food.centerX - this.centerX) > 10) console.log('problem, ', Date.now());
  //     if (Math.abs(food.centerX - this.centerX) <= 10) console.log('no problem');
  //     // console.log('food ', food, "me: ", this.centerX, this.centerY);
  //     this.lastAte = Date.now();
  //     return food;
  //   }
  // }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Predator;



/***/ }),
/* 8 */,
/* 9 */
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
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


// SimulationParams: controls the parameters for the simulation.
// Allows users to adjust input; manages event listeners to
// determine this input.
class SimulationParams {
  constructor() {
    //set defaults
    this.predatorCount = 10;
    this.predatorSpeed = 20;
    this.predatorRadius = 40;
    this.predatorGravitationNbhd = 10;
    this.predatorColor = '#bc482b';
    this.predatorEfficiency = 2000000;
    this.preyCount = 10;
    this.preySpeed = 10;
    this.preyRadius = 20;
    this.preyGravitationNbhd = 20;
    this.preyColor = '#4c6ea5';
    this.fieldNetSize = 10; // Must be smaller than radius/sqrt(2)!
  }

  predatorsParams() {
    return {
      count: this.predatorCount,
      predatorParams: {
        speed: this.predatorSpeed,
        radius: this.predatorRadius,
        color: this.predatorColor,
        efficiency: this.predatorEfficiency
      }
    };
  }

  preysParams() {
    return {
      count: this.preyCount,
      preyParams: {
        speed: this.preySpeed,
        radius: this.preyRadius,
        color: this.preyColor
      }
    };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SimulationParams;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__panorama__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__zoo__ = __webpack_require__(13);





class Simulation {
  constructor(canvas, simulationParams) {
    this.canvas = canvas;
    this.simulationParams = simulationParams;
    this.panorama = new __WEBPACK_IMPORTED_MODULE_0__panorama__["a" /* default */](this.canvas);
    this.zoo = new __WEBPACK_IMPORTED_MODULE_1__zoo__["a" /* default */](this.simulationParams.predatorsParams(),
                       this.simulationParams.preysParams(),
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__predators_controller__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__preys_controller__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__field__ = __webpack_require__(15);






class Zoo {
  constructor(predatorsParams, preysParams, panoramaSize) {
    this.panoramaSize = panoramaSize;
    this.predatorsController = new __WEBPACK_IMPORTED_MODULE_0__predators_controller__["a" /* default */](predatorsParams, panoramaSize);
    this.preysController = new __WEBPACK_IMPORTED_MODULE_1__preys_controller__["a" /* default */](preysParams, panoramaSize);
    // this.predatorsField = new Field(panoramaSize, 1);
    // this.preysField = new Field(panoramaSize, -1);
  }

  tick() {
    this.moveOrganisms();
    // this.calculateFields();
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

  calculatePredatorsFields() {
    this.predatorsField.calculateField(this.predatorsController);
  }

  calculatePreysFields() {
    this.preysField.calculateField(this.preysController);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Zoo;


// this.preyController.calculateField();
// this.predatorsController.calculateField();
// this.preyController.updateDirections();
// this.preyController.draw(this.dx);
// this.predatorsController.draw(this.dx);
// this.predatorsController.updateDirections();
// this.preyController.updateLocations();
// const eaten = this.predatorsController.feed();
// this.preyController.killOrganisms(eaten);
// this.predatorsController.starvePredators();


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prey__ = __webpack_require__(9);
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Field {
  constructor(sgn) {

  }

  initializeField() {
    const rowCount = Math.ceil(this.panoramaHeight / this.fieldNetSize);
    const colCount = Math.ceil(this.panoramaWidth / this.fieldNetSize);
    this.gravitationalField = Array(rowCount).fill(0).map(el => (
      Array(colCount).fill(0)
    ));
  }

  resetField() {
    // needs to be in the same object
    const rows = Object.keys(this.gravitationalField);
    const centerRow = rows[Math.floor(rows.length/2)];
    // console.log(centerRow);
    rows.forEach( row => {
      const cols = Object.keys(this.gravitationalField[row]);
      const dRowCenter = distanceY(centerRow, row);
      cols.forEach( col => {
        // prevent clustering on edges
        this.gravitationalField[row][col] = this.fieldEdgeSgn*(dRowCenter / centerRow)/1000;
      });
    });
    // debugger;
  }

  calculateField(organismsController) {
    this.resetField();
    organismsController.organisms.forEach( organism => {
      this.updateField(organism);
    });
  }

  updateField(organism) {
    organism.updateFieldPosition(this.fieldNetSize);
    const position = organism.fieldPosition;
    for(let row = position.y - this.gravitationNbhd; row < position.y + this.gravitationNbhd; row++) {
      for(let col = position.x - this.gravitationNbhd; col < position.x + this.gravitationNbhd; col++) {
        // JS will get mad if you try to change the iterator mid loop.
        let proxyCol = col;
        if (row < 0 || row >= this.panoramaHeight / this.fieldNetSize) continue;
        if (proxyCol < 0 || proxyCol >= this.panoramaWidth / this.fieldNetSize) proxyCol = positiveMod(proxyCol, Math.floor(this.panoramaWidth / this.fieldNetSize));
        const pointVector = gravitation(distance(position.x, position.y, proxyCol, row, this.panoramaWidth));
        this.gravitationalField[row][proxyCol] += pointVector;
      }
    }
  }

  // calculate the current position in the discrete field for an organism
  updateFieldPosition(fieldNetSize) {
    // debugger;
    this.fieldPosition = fieldCellCoords(this.centerX, this.centerY, fieldNetSize);
  }

  // use the field of other organisms to construct a gradient for an organism
  constructGradient(panoramaCenter) {
    this.gradient = {
      x: 0,
      y: 0
    };
    for (let row = this.fieldPosition.y - gravitationNbhd; row < this.fieldPosition.y + gravitationNbhd; row++) {
      for (let col = this.fieldPosition.x - gravitationNbhd; col < this.fieldPosition.x + gravitationNbhd; col++) {
        let proxyCol = col;
        if (row < 0 || row >= this.panoramaHeight / fieldNetSize) continue;
        if (proxyCol < 0 || proxyCol >= this.panoramaWidth / fieldNetSize) proxyCol = positiveMod(proxyCol, Math.floor(this.panoramaWidth / fieldNetSize));
        if (col === this.fieldPosition.x || row === this.fieldPosition.y) continue;
        const dist = distance(col, row, this.fieldPosition.x, this.fieldPosition.y, this.panoramaWidth);
        const weight = gravitation(dist);
        const xDist = distanceX(this.fieldPosition.x, col, this.panoramaWidth);
        const yDist = distanceY(this.fieldPosition.y, row);
        const sin = yDist / dist;
        const cos = xDist / dist;
        const sgnX = (col > this.fieldPosition.x) ? 1 : -1 ;
        const sgnY = (row > this.fieldPosition.y) ? 1 : -1 ;
        this.gradient.x += field[row][proxyCol] * cos * weight * sgnX;
        this.gradient.y += field[row][proxyCol] * sin * weight * sgnY;
      }
    }
  }
}
/* unused harmony export default */



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map