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
/* harmony export (immutable) */ __webpack_exports__["f"] = positiveMod;


// computed the horizontal distance between two points
// accounting for the panorama's wrapping
const distanceX = (x1, x2, panoramaWidth) => {
  const smaller = Math.min(x1, x2);
  const larger = Math.max(x1, x2);
  const innerDistance = larger - smaller;
  const outerDistance = smaller + panoramaWidth - smaller;
  return Math.min(innerDistance, outerDistance);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = distanceX;


const distanceY = (y1, y2) => {
  return Math.abs(y2 - y1);
};
/* harmony export (immutable) */ __webpack_exports__["c"] = distanceY;


const distance = (x1, y1, x2, y2, panoramaWidth) => {
  return Math.sqrt(Math.pow(distanceY(y1, y2), 2) +
                   Math.pow(distanceX(x1, x2, panoramaWidth), 2));
};
/* harmony export (immutable) */ __webpack_exports__["a"] = distance;


const fieldCellCoords = (x, y, fieldNetSize) => ({
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
/* harmony export (immutable) */ __webpack_exports__["e"] = gravitation;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_util__ = __webpack_require__(0);


class Organism {
  constructor({speed, radius, color}, ctx, panoramaWidth, panoramaHeight) {
    this.ctx = ctx;
    this.speed = speed;
    this.radius = radius;
    this.color = color;
    this.panoramaWidth = panoramaWidth;
    this.panoramaHeight = panoramaHeight;
    this.initializeCenter();
    this.initializeDirection();
  }

  initializeCenter() {
    this.centerX = Math.random() * this.panoramaWidth;
    this.centerY = Math.random() * (this.panoramaHeight - 2 * this.radius) + this.radius;
    if (isNaN(this.centerX) || isNaN(this.centerY)) debugger;
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

  draw(dx) {
    this.moveOrganism();
    this.renderOrganism(dx);
  }

  renderOrganism(dx) {
    // console.log('rendering organism');
    this.ctx.beginPath();
    this.ctx.arc(Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["f" /* positiveMod */])(this.centerX - dx, this.panoramaWidth), this.centerY, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  moveOrganism() {
    this.centerX = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["f" /* positiveMod */])(this.centerX + this.xMovement(), this.panoramaWidth);
    this.centerY += this.yMovement();
    // if (isNaN(this.centerX) || isNaN(this.centerY)) debugger;
    this.resolveBounces();
  }

  yMovement() {
    return this.speed * this.direction.y;
  }

  xMovement() {
    return this.speed * this.direction.x;
  }

  minHeight() {
    return this.radius;
  }

  maxHeight() {
    return this.panoramaHeight - this.radius;
  }

  resolveBounces() {
    if (this.centerY > this.maxHeight()) {
      const overflow = this.centerY - this.maxHeight();
      this.centerY -= overflow;
      this.direction.y = -1 * this.direction.y;
    } else if (this.centerY < this.minHeight()) {
      const underflow = this.minHeight() - this.centerY;
      this.centerY += underflow;
      this.direction.y = -1 * this.direction.y;
    }
  }

  // calculate the current position in the discrete field
  updateFieldPosition(fieldNetSize) {
    // debugger;
    this.fieldPosition = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["d" /* fieldCellCoords */])(this.centerX, this.centerY, fieldNetSize);
  }

  // use the field of other organisms to construct a gradient
  constructGradient(field, gravitationNbhd, fieldNetSize) {
    this.gradient = {
      x: 0,
      y: 0
    };
    for (let row = this.fieldPosition.y - gravitationNbhd; row < this.fieldPosition.y + gravitationNbhd; row++) {
      for (let col = this.fieldPosition.x - gravitationNbhd; col < this.fieldPosition.x + gravitationNbhd; col++) {
        let proxyCol = col;
        if (row < 0 || row >= this.panoramaHeight / fieldNetSize) continue;
        if (proxyCol < 0 || proxyCol >= this.panoramaWidth / fieldNetSize) proxyCol = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["f" /* positiveMod */])(proxyCol, Math.floor(this.panoramaWidth / fieldNetSize));
        if (col === this.fieldPosition.x || row === this.fieldPosition.y) continue;
        const dist = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["a" /* distance */])(col, row, this.fieldPosition.x, this.fieldPosition.y, this.panoramaWidth);
        const weight = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["e" /* gravitation */])(dist);
        const xDist = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["b" /* distanceX */])(this.fieldPosition.x, col, this.panoramaWidth);
        const yDist = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["c" /* distanceY */])(this.fieldPosition.y, row);
        const sin = yDist / dist;
        const cos = xDist / dist;
        const sgnX = (col > this.fieldPosition.x) ? 1 : -1 ;
        const sgnY = (row > this.fieldPosition.y) ? 1 : -1 ;
        this.gradient.x += field[row][proxyCol] * cos * weight * sgnX;
        this.gradient.y += field[row][proxyCol] * sin * weight * sgnY;
      }
    }
  }

  updateDirection() {
    const totalSpeed = Math.sqrt( Math.pow(this.direction.x + (this.gradient.x / 10), 2) +
                                  Math.pow(this.direction.y + (this.gradient.y / 10), 2));
    const normalization = 1 / totalSpeed;
    this.direction.x = (this.direction.x + (this.gradient.x / 10)) * normalization;
    this.direction.y = (this.direction.y + (this.gradient.y / 10)) * normalization;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Organism;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_util__ = __webpack_require__(0);


class OrganismsController {
  constructor(ctx, panoramaWidth, panoramaHeight, {fieldNetSize, gravitationNbhd}) {
    this.ctx = ctx;
    this.panoramaWidth = panoramaWidth;
    this.panoramaHeight = panoramaHeight;
    this.organisms = [];
    this.locations = [];
    this.fieldNetSize = fieldNetSize;
    this.gravitationNbhd = gravitationNbhd;
    this.initializeField();
  }

  draw(dx) {
    this.organisms.forEach( organism => {
      organism.draw(dx);
    });
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
      const dRowCenter = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["c" /* distanceY */])(centerRow, row);
      cols.forEach( col => {
        // prevent clustering on edges
        this.gravitationalField[row][col] = this.fieldEdgeSgn*(dRowCenter / centerRow)/1000;
      });
    });
    // debugger;
  }

  calculateField() {
    this.resetField();
    this.organisms.forEach( organism => {
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
        if (proxyCol < 0 || proxyCol >= this.panoramaWidth / this.fieldNetSize) proxyCol = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["f" /* positiveMod */])(proxyCol, Math.floor(this.panoramaWidth / this.fieldNetSize));
        const pointVector = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["e" /* gravitation */])(Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["a" /* distance */])(position.x, position.y, proxyCol, row, this.panoramaWidth));
        this.gravitationalField[row][proxyCol] += pointVector;
      }
    }
  }

  killOrganisms(condemnedList) {
    condemnedList.forEach( organism => {
      const condemnedIdx = this.organisms.indexOf(organism);
      // debugger;
      this.organisms.splice(condemnedIdx, 1);
      // const survivors = this.organisms.slice(0, condemnedIdx).concat(this.organisms.slice(condemnedIdx + 1));
      // this.organisms = survivors;
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = OrganismsController;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__panorama__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_params__ = __webpack_require__(10);



// non-user params
const backgroundPath = 'https://s3-us-west-1.amazonaws.com/talons-dev/placeholder-background.jpeg';

// inspired by https://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas
function getMousePos(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById("canvas");
  const backgroundImage = new Image;
  backgroundImage.src = backgroundPath;

  const userParams = new __WEBPACK_IMPORTED_MODULE_1__user_params__["a" /* default */](backgroundImage);
  userParams.setListeners();

  const backgroundParams = {
    canvas,
    backgroundImage
  };
  const panorama = new __WEBPACK_IMPORTED_MODULE_0__panorama__["a" /* default */](backgroundParams, userParams);

  let mousePos;
  panorama.draw();

  canvas.addEventListener('mousemove', e => {
    mousePos = getMousePos(canvas, e);
    panorama.updateCursorOffset(mousePos);
  });

  canvas.addEventListener('mouseout', () => {
    panorama.toggleDampening(true);
  });

  setInterval(() => {
    panorama.updateDx();
    panorama.draw();
  }, 500); //42 mHz = 24 fps
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__background__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__predators_controller__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prey_controller__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_util__ = __webpack_require__(0);





class Panorama {
  constructor(backgroundParams, userParams) {
    // inputs
    this.userParams = userParams;
    this.background = new __WEBPACK_IMPORTED_MODULE_0__background__["a" /* default */](backgroundParams);
    this.ctx = backgroundParams.canvas.getContext('2d');
    this.img = backgroundParams.backgroundImage;
    this.panoramaWidth = this.img.width;
    this.panoramaHeight = this.img.height;
    this.canvasWidth = backgroundParams.canvas.width;
    this.canvasHeight = backgroundParams.canvas.height;
    this.predatorsController = new __WEBPACK_IMPORTED_MODULE_1__predators_controller__["a" /* default */](userParams.predatorsParams(), this.ctx, this.panoramaWidth, this.panoramaHeight);
    this.preyController = new __WEBPACK_IMPORTED_MODULE_2__prey_controller__["a" /* default */](userParams.preysParams(), this.ctx, this.panoramaWidth, this.panoramaHeight);
    this.predatorsController.receivePreysData({
      preysField: this.preyController.gravitationalField,
      preysLocations: this.preyController.locations
    });
    this.preyController.receivePredatorsData({
      predatorsField: this.predatorsController.gravitationalField
    });
    // defaults
    this.dx = 0;
    this.isDampening = false;
    this.cursorOffsetX = 0;
  }

  draw(dx) {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.background.draw(this.dx);
    this.preyController.calculateField();
    this.predatorsController.calculateField();
    this.preyController.updateDirections();
    this.preyController.draw(this.dx);
    this.predatorsController.draw(this.dx);
    this.predatorsController.updateDirections();
    this.preyController.updateLocations();
    const eaten = this.predatorsController.feed();
    this.preyController.killOrganisms(eaten);
    this.predatorsController.starvePredators();
  }

  updateDx() {
    this.dampenStaleCursorInput();
    this.dx += this.cursorOffsetX * 0.075;
    this.dx = Object(__WEBPACK_IMPORTED_MODULE_3__util_util__["f" /* positiveMod */])(this.dx, this.panoramaWidth);
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
    if (Math.abs(this.canvasWidth / 2 - x) > this.canvasWidth / 3) {
      this.toggleDampening(false);
      this.cursorOffsetX = x - (this.canvasWidth / 2);
    } else {
      this.toggleDampening(true);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Panorama;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Background {
  // eventually refactor into background and panorama classes
  constructor({canvas, backgroundImage}) {
    this.ctx = canvas.getContext('2d');
    this.img = backgroundImage;
    this.imageWidth = this.img.width;
    this.imageHeight = this.img.height;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.cursorOffsetX = 0;
    this.dx = 0; // mainly for graceful error handling
  }

  draw(dx) {
    // console.log('rendering bg');
    this.dx = dx;
    // future optimization: only redraw if any scrolling has occured
    this.ctx.drawImage(this.img, -this.dx, 0);
    // only perform second draw of stitched image when necessary
    if (this.doesImageNeedStitching()) {
      // console.log('rendering stitch');
      this.ctx.drawImage(this.img, this.imageWidth - this.dx, 0);
    }
  }

  doesImageNeedStitching() {
    return this.dx > (this.imageWidth - this.canvasWidth);
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
  constructor(predatorsParams, ctx, panoramaWidth, panoramaHeight) {
    super(ctx, panoramaWidth, panoramaHeight, predatorsParams);
    this.predatorParams = predatorsParams.predatorParams;
    this.fieldEdgeSgn = 1;
    this.populatePredators(predatorsParams.count);
  }

  populatePredators(count) {
    for (let i = 0; i < count; i++) {
      this.createPredator();
    }
  }

  receivePreysData({preysField, preysLocations}) {
    this.preysField = preysField;
    this.preysLocations = preysLocations;
  }

  createPredator(predatorParams) {
    const predator = new __WEBPACK_IMPORTED_MODULE_0__predator__["a" /* default */](this.predatorParams, this.ctx, this.panoramaWidth, this.panoramaHeight);
    this.organisms.push(predator);
  }

  updateDirections() {
    this.organisms.forEach( organism => {
      organism.constructGradient(this.preysField, this.gravitationNbhd, this.fieldNetSize);
      organism.updateDirection();
    });
  }

  feed() {
    const eaten = [];
    this.organisms.forEach( predator => {
      const food = predator.feed(this.preysLocations);
      if (food) eaten.push(food);
    });
    // console.log('eaten ', eaten);
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
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PredatorsController;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__organism__ = __webpack_require__(1);


class Predator extends __WEBPACK_IMPORTED_MODULE_0__organism__["a" /* default */] {
  constructor(predatorParams, ctx, panoramaWidth, panoramaHeight) {
    super(predatorParams, ctx, panoramaWidth, panoramaHeight);
    this.lastAte = Date.now();
    this.efficiency = predatorParams.efficiency;
  }

  feed(locations) {
    // debugger;
    const food = locations[this.fieldPosition.y][this.fieldPosition.x];
    if (food) {
      // if (Math.abs(food.centerX - this.centerX) > 10) console.log('problem, ', Date.now());
      if (Math.abs(food.centerX - this.centerX) <= 10) console.log('no problem');
      // console.log('food ', food, "me: ", this.centerX, this.centerY);
      this.lastAte = Date.now();
      return food;
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Predator;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prey__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__organisms_controller__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_util__ = __webpack_require__(0);





class PredatorsController extends __WEBPACK_IMPORTED_MODULE_1__organisms_controller__["a" /* default */] {
  constructor(preysParams, ctx, panoramaWidth, panoramaHeight) {
    super(ctx, panoramaWidth, panoramaHeight, preysParams);
    this.preyParams = preysParams.preyParams;
    this.populatePreys(preysParams.count);
    this.fieldEdgeSgn = -1;
    this.initializeLocations();
  }

  populatePreys(count) {
    for (let i = 0; i < count; i++) {
      this.createPrey();
    }
  }

  initializeLocations() {
    const rowCount = Math.ceil(this.panoramaHeight / this.fieldNetSize);
    const colCount = Math.ceil(this.panoramaWidth / this.fieldNetSize);
    this.locations = Array(rowCount).fill(0).map(el => (
      Array(colCount)
    ));
  }

  resetLocations() {
    this.locations.forEach( row => {
      row.map( entry => null );
    });
  }

  updateLocations() {
    // debugger;
    this.resetLocations();
    this.organisms.forEach( organism => {
      if (organism.fieldPosition === undefined) debugger;
      if (this.locations[organism.fieldPosition.y] === undefined ) debugger;
      // if (this.locations[organism.fieldPosition.y][organism.fieldPosition.x] !== null) console.log(organism);
      this.locations[organism.fieldPosition.y][organism.fieldPosition.x] = organism;
    });
  }

  receivePredatorsData({predatorsField}) {
    this.predatorsField = predatorsField;
  }

  createPrey(preyParams) {
    const prey = new __WEBPACK_IMPORTED_MODULE_0__prey__["a" /* default */](this.preyParams, this.ctx, this.panoramaWidth, this.panoramaHeight);
    this.organisms.push(prey);
  }

  updateDirections() {
    this.organisms.forEach( organism => {
      organism.constructGradient(this.predatorsField, this.gravitationNbhd, this.fieldNetSize);
      organism.flipGradient();
      organism.updateDirection();
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PredatorsController;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__organism__ = __webpack_require__(1);


class Prey extends __WEBPACK_IMPORTED_MODULE_0__organism__["a" /* default */] {
  constructor(preyParams, ctx, panoramaWidth, panoramaHeight) {
    super(preyParams, ctx, panoramaWidth, panoramaHeight);
  }

  flipGradient() {
    // run from the predators, not to them
    this.gradient.x = -1 * this.gradient.x;
    this.gradient.y = -1 * this.gradient.y;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Prey;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// basically a reducer...
class Controls {
  constructor(backgroundImage) {
    //set defaults
    this.predatorCount = 0;
    this.predatorSpeed = 20;
    this.predatorRadius = 40;
    this.predatorColor = '#bc482b';
    this.predatorEfficiency = 2000000;
    this.preyCount = 1;
    this.preySpeed = 10;
    this.preyRadius = 20;
    this.preyColor = '#4c6ea5';
    this.backgroundImage = backgroundImage;
  }

  predatorsParams() {
    return {
      fieldNetSize: 10, // Must be smaller than radius/sqrt(2)!
      gravitationNbhd: 10,
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
      fieldNetSize: 10, // Must be smaller than radius/sqrt(2)!
      gravitationNbhd: 20,
      count: this.preyCount,
      preyParams: {
        speed: this.preySpeed,
        radius: this.preyRadius,
        color: this.preyColor
      }
    };
  }

  setListeners() {
    // will set several event listeners in document to grab user input
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Controls;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map