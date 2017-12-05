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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__panorama__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_params__ = __webpack_require__(7);



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
  }, 42); //42 mHz = 24 fps
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__background__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__predators_controller__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prey_controller__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_util__ = __webpack_require__(9);





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

    // defaults
    this.dx = 0;
    this.isDampening = false;
    this.cursorOffsetX = 0;
  }

  draw(dx) {
    // console.log('new draw');
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.background.draw(this.dx);
    this.predatorsController.draw(this.dx);
    this.preyController.draw(this.dx);
  }

  updateDx() {
    this.dampenStaleCursorInput();
    this.dx += this.cursorOffsetX * 0.075;
    this.dx = Object(__WEBPACK_IMPORTED_MODULE_3__util_util__["a" /* positiveMod */])(this.dx, this.panoramaWidth);
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
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__predator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__organisms_controller__ = __webpack_require__(10);



class PredatorsController extends __WEBPACK_IMPORTED_MODULE_1__organisms_controller__["a" /* default */] {
  constructor(predatorsParams, ctx, panoramaWidth, panoramaHeight) {
    super(ctx, panoramaWidth, panoramaHeight);
    this.predatorParams = predatorsParams.predatorParams;
    this.populatePredators(predatorsParams.count);
  }

  populatePredators(count) {
    for (let i = 0; i < count; i++) {
      this.createPredator();
    }
  }

  createPredator(predatorParams) {
    const predator = new __WEBPACK_IMPORTED_MODULE_0__predator__["a" /* default */](this.predatorParams, this.ctx, this.panoramaWidth, this.panoramaHeight);
    this.organisms.push(predator);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PredatorsController;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__organism__ = __webpack_require__(5);


class Predator extends __WEBPACK_IMPORTED_MODULE_0__organism__["a" /* default */] {
  constructor(predatorParams, ctx, panoramaWidth, panoramaHeight) {
    super(predatorParams, ctx, panoramaWidth, panoramaHeight);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Predator;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_util__ = __webpack_require__(9);


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
    this.ctx.arc(Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["a" /* positiveMod */])(this.centerX - dx, this.panoramaWidth), this.centerY, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  moveOrganism() {
    this.centerX = Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["a" /* positiveMod */])(this.centerX + this.xMovement(), this.panoramaWidth);
    this.centerY += this.yMovement();
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
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Organism;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prey__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__organisms_controller__ = __webpack_require__(10);



class PredatorsController extends __WEBPACK_IMPORTED_MODULE_1__organisms_controller__["a" /* default */] {
  constructor(preysParams, ctx, panoramaWidth, panoramaHeight) {
    super(ctx, panoramaWidth, panoramaHeight);
    this.preyParams = preysParams.preyParams;
    this.populatePreys(preysParams.count);
  }

  populatePreys(count) {
    for (let i = 0; i < count; i++) {
      this.createPrey();
    }
  }

  createPrey(preyParams) {
    const prey = new __WEBPACK_IMPORTED_MODULE_0__prey__["a" /* default */](this.preyParams, this.ctx, this.panoramaWidth, this.panoramaHeight);
    this.organisms.push(prey);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PredatorsController;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// basically a reducer...
class Controls {
  constructor(backgroundImage) {
    //set defaults
    this.predatorCount = 10;
    this.predatorSpeed = 20;
    this.predatorRadius = 40;
    this.predatorColor = 'red';
    this.preyCount = 200;
    this.preySpeed = 10;
    this.preyRadius = 20;
    this.preyColor = 'blue';
    this.backgroundImage = backgroundImage;
  }

  predatorsParams() {
    return {
      count: this.predatorCount,
      predatorParams: {
        speed: this.predatorSpeed,
        radius: this.predatorRadius,
        color: this.predatorColor
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

  setListeners() {
    // will set several event listeners in document to grab user input
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Controls;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__organism__ = __webpack_require__(5);


class Prey extends __WEBPACK_IMPORTED_MODULE_0__organism__["a" /* default */] {
  constructor(preyParams, ctx, panoramaWidth, panoramaHeight) {
    // console.log("prey ", preyParams, ctx, panoramaWidth, panoramaHeight);
    super(preyParams, ctx, panoramaWidth, panoramaHeight);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Prey;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const positiveMod = (n, m) => (
  ((n % m) + m) % m
);
/* harmony export (immutable) */ __webpack_exports__["a"] = positiveMod;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class OrganismsController {
  constructor(ctx, panoramaWidth, panoramaHeight) {
    this.ctx = ctx;
    this.panoramaWidth = panoramaWidth;
    this.panoramaHeight = panoramaHeight;
    this.organisms = [];
  }

  draw(dx) {
    this.organisms.forEach( organism => {
      organism.draw(dx);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = OrganismsController;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map