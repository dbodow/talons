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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__background__ = __webpack_require__(1);


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
  const ctx = canvas.getContext("2d");
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const backgroundParams = {
    ctx,
    canvasWidth,
    canvasHeight,
    backgroundPath,
  };
  const background = new __WEBPACK_IMPORTED_MODULE_0__background__["a" /* default */](backgroundParams);

  let mousePos;
  background.drawBackground();

  canvas.addEventListener('mousemove', e => {
    mousePos = getMousePos(canvas, e);
    background.updateCursorOffset(mousePos);
  });

  canvas.addEventListener('mouseout', () => {
    background.toggleDampening(true);
  });

  setInterval(() => {
    background.drawBackground();
    background.drawOrganisms();
  }, 42);
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__organism__ = __webpack_require__(2);


class Background {
  constructor({ctx, backgroundPath, canvasWidth, canvasHeight}) {
    this.ctx = ctx;
    this.img = new Image;
    this.img.src = backgroundPath;
    this.imageWidth = this.img.width;
    this.imageHeight = this.img.height;
    this.canvasWidth = canvasWidth;
    this.cursorOffsetX = 0;
    this.dx = 0;
    this.dy = 0;
    this.isDampening = false;
    this.predators = [new __WEBPACK_IMPORTED_MODULE_0__organism__["a" /* default */](50, this.imageWidth, this.imageHeight, ctx)];
    // this.prey = [new Organism(30, this.imageWidth, this.imageHeight, ctx)];
  }

  drawBackground() {
    // future optimization: only redraw if any scrolling has occured
    this.updateDx();
    this.ctx.drawImage(this.img, -this.dx, this.dy);
    // only perform second draw of stitched image when necessary
    if (this.doesImageNeedStitching()) {
      this.ctx.drawImage(this.img, this.imageWidth - this.dx, this.dy);
    }
  }

  doesImageNeedStitching() {
    return this.dx > (this.imageWidth - this.canvasWidth);
  }

  updateDx() {
    this.dampenStaleCursorInput();
    this.dx += this.cursorOffsetX * 0.075;
    this.dx = this.positiveMod(this.dx, this.imageWidth);
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

  positiveMod(n, m) {
    return ((n % m) + m) % m;
  }

  toggleDampening(bool) {
    this.isDampening = bool;
  }

  drawOrganisms() {
    this.predators.forEach( organism => {
      organism.drawOrganism();
    });
    // this.prey.forEach( organism => {
    //   organism.drawOrganism();
    // });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Background;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Organism {
  constructor(radius, imageWidth, imageHeight, ctx) {
    this.ctx = ctx;
    this.radius = radius;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    // this.centerX = Math.floor(Math.random() * (imageWidth - 2*radius))+radius;
    // this.centerY = Math.floor(Math.random() * (imageHeight - 2*radius))+radius;
    this.centerX = 500;
    this.centerY = 500;
    this.speed = 20;
    // sample as an angle for a uniform distribution of angles
    // i.e. don't bias directions to the diagonals via a cartesian ransom sample
    const radialDirection = Math.random() * 2 * Math.PI;
    this.direction = {
      x: Math.cos(radialDirection),
      y: Math.sin(radialDirection)
    };
  }

  drawOrganism() {
    this.moveOrganism();
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
  }

  moveOrganism() {
    this.centerX += this.xMovement();
    this.centerY += this.yMovement();
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
    return this.imageHeight - this.radius;
  }

  positiveMod(n, m) {
    return ((n % m) + m) % m;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Organism;



/***/ })
/******/ ]);