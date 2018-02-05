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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(11);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(10);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;


/***/ }),
/* 4 */
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

  // Choose a random spot on the display for the organism to be placed
  initializeCenter({width, height}) {
    this.center = {
      x: Math.random() * width,
      y: (Math.random() * (height - (2 * this.radius))) + this.radius
    };
  }

  // Choose a random direction for the organism to move at its initialization
  initializeDirection() {
    // sample as an angle for a uniform radial distribution
    // i.e. don't bias directions to the diagonals via a cartesian ransom sample
    const radialDirection = Math.random() * 2 * Math.PI;
    this.direction = {
      x: Math.cos(radialDirection),
      y: Math.sin(radialDirection)
    };
  }

  // move the organism's position by one tick
  moveOrganism({width, height}) {
    this.center = {
      x: Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["h" /* positiveMod */])(this.center.x + this.dxdt(), width),
      y: this.center.y + this.dydt()
    };
    this.resolveBounces(height);
  }

  // y-velocity
  dydt() {
    return this.speed * this.direction.y;
  }

  // x-velocity
  dxdt() {
    return this.speed * this.direction.x;
  }

  // minimum y-position the organism can fit on the display
  minHeight() {
    return this.radius;
  }

  // maximum y-position the organism can fit on the display
  maxHeight(height) {
    return height - this.radius;
  }

  // prevent rendering outside of the display and
  // flip y-velocity to "bounce" off of the display's edge
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

  // change the direction the organism is moving based on
  // the predator/prey interactions.
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_capitalize__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_capitalize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_capitalize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_util__ = __webpack_require__(0);




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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__simulation_params__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sliders__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__simulation__ = __webpack_require__(28);

// This file manages interaction with the HTML document
// and integrates the top-level systems of the simulation.

// `SimulationParams` acts as a single source of truth for all parameters

// `Sliders` controls the slider components on the webpage, allowing
// users to change the simulation parameters as desired. Data flows from
// `Sliders` to `SimulationParams`

// `Simulation` runs the ecosystem model: it tracks the 'animals' and their
// interactions, and measures population levels





const handleVisibilityChange = (simulation) => {
  if (document.hidden) {
    simulation.togglePlaying(false);
  } else {
    simulation.togglePlaying(true);
  }
};

document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById("canvas");
  const graph = document.getElementById("graph");

  const simulationParams = new __WEBPACK_IMPORTED_MODULE_0__simulation_params__["a" /* default */];
  const simulation = new __WEBPACK_IMPORTED_MODULE_2__simulation__["a" /* default */](canvas, graph, simulationParams);
  const sliders = new __WEBPACK_IMPORTED_MODULE_1__sliders__["a" /* default */](simulation, simulationParams);

  simulation.begin();

  document.addEventListener(
    "visibilitychange",
    () => handleVisibilityChange(simulation)
  );
});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


// SimulationParams: controls the parameters for the simulation.
// Allows users to adjust input; manages event listeners to
// determine this input.
class SimulationParams {
  constructor() {
    //set defaults
    this.predatorCount = 20; // count at initialization or reset
    this.predatorSpeed = 15; // pixels moved per tick
    this.predatorRadius = 40; // radius of the graphical circle
    this.predatorGravitationNbhd = 10; // px size of neighborhood to detect prey
    this.predatorColor = '#354b6d';
    this.predatorEfficiency = 10000; // milliseconds a predator can survive without feeding
    this.predatorPerception = 25; // lower is better; this is a 1/x weight
    this.predatorReproductionPeriod = 12000; // ms; should be longer than predator efficiency to avoid explosion
    this.preyCount = 50; // count at initialization or reset
    this.preySpeed = 10; // pixels moved per tick
    this.preyRadius = 10; // radius of the graphical circle
    this.preyGravitationNbhd = 20; // px size of neighborhood to detect predators
    this.preyColor = '#efe092';
    this.preyPerception = 7; // lower is better; this is a 1/x weight
    this.preyCamoflage = 0.5; // weight on the 'gravitational field' for each prey; lower is less detectable
    this.preyReproductionPeriod = 10000; // ms
    this.preyCarryingCapacity = 200; // maximum number of prey
    this.fieldNetSize = 10; // grid size of the gravitational field; Must be smaller than both radii/sqrt(2)!
  }

  // normalize params for Predators / PredatorsController
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

  // normalize params for Preys / PreysController
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

  // normalize params for PredatorsField
  predatorFieldParams() {
    return {
      fieldNetSize: this.fieldNetSize,
      gravitationNbhd: this.predatorGravitationNbhd
    };
  }

  // normalize params for PreysField
  preyFieldParams() {
    return {
      fieldNetSize: this.fieldNetSize,
      gravitationNbhd: Math.round(this.preyGravitationNbhd * this.preyCamoflage)
    };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SimulationParams;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_capitalize__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_capitalize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_capitalize__);



// This file manages listeners for the parameter sliders on the webpage
// It updates the SimulationParams when a user makes changes

// Select all the sliders through DOM
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
  },
  controls: {
    play: document.getElementById("play-button"),
    pause: document.getElementById("pause-button"),
    restart: document.getElementById("restart-button")
  }
};

// This class manages event listeners for controlling the simulation and
// changing its parameters
class Sliders {
  constructor(simulation, simulationParams) {
    this.simulation = simulation;
    this.simulationParams = simulationParams;
    this.initializeEventListeners(sliderEls);
    this.isPlaying = true;
  }

  initializeEventListeners({predatorsSliders, preysSliders, controls}) {
    this.initializePredatorsEventListeners(predatorsSliders);
    this.initializePreysEventListeners(preysSliders);
    this.initializeControlsEventListeners(controls);
  }

  initializeControl(controlGroup, controlName, eventName, callback) {
    console.log(controlGroup, controlGroup[controlName]);
    controlGroup[controlName].addEventListener(eventName, callback);
  }

  initializePredatorsEventListeners(predatorsSliders) {
    Object.keys(predatorsSliders).forEach(controlName => {
      this.initializeControl(predatorsSliders, controlName, 'mouseup', e => {
        // custom logic for transforming the user input to a parameter
        if (controlName === "perception") {
          // lower perception values are better
          // (they are an inverse-distance weight)
          this.simulationParams['predator' + __WEBPACK_IMPORTED_MODULE_0_lodash_capitalize___default()(controlName)] =
            25 - e.target.value;
        } else {
          // in most cases, the slider's value is the exact parameter value
          this.simulationParams['predator' + __WEBPACK_IMPORTED_MODULE_0_lodash_capitalize___default()(controlName)] =
            e.target.value;
        }
        // propogate updated parameters to the models
        this.updateOrganisms();
      });
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

  initializeControlsEventListeners(controls) {
    controls.play.addEventListener('click', e => {
      this.togglePlaying('play');
    });
    controls.pause.addEventListener('click', e => {
      this.togglePlaying('pause');
    });
    controls.restart.addEventListener('click', e => {
      this.togglePlaying('restart');
    });
  }

  updateOrganisms() {
    // need to transform inputs from the linear slider values
    // this.simulationParams.predatorPerception =
    //   25 - this.simulationParams.predatorPerception;
    this.simulation.updateOrganisms({
      predatorsParams: this.simulationParams.predatorsParams(),
      preysParams: this.simulationParams.preysParams()
    });
  }

  updatePreysField() {
    this.simulation.updatePreysField(this.simulationParams.preyFieldParams());
  }

  togglePlaying(type) {
    switch (type) {
      case 'play':
        if (!this.isPlaying) {
          this.isPlaying = true;
          this.simulation.togglePlaying(true);
        }
        break;
      case 'pause':
        this.isPlaying = false;
        this.simulation.togglePlaying(false);
        break;
      case 'restart':
        this.isPlaying = true;
        this.simulation.restart();
        break;
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sliders;



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__(2),
    upperFirst = __webpack_require__(21);

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}

module.exports = capitalize;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(1),
    arrayMap = __webpack_require__(14),
    isArray = __webpack_require__(15),
    isSymbol = __webpack_require__(16);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(12);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(17),
    isObjectLike = __webpack_require__(20);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(1),
    getRawTag = __webpack_require__(18),
    objectToString = __webpack_require__(19);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(1);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var createCaseFirst = __webpack_require__(22);

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

module.exports = upperFirst;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var castSlice = __webpack_require__(23),
    hasUnicode = __webpack_require__(3),
    stringToArray = __webpack_require__(25),
    toString = __webpack_require__(2);

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

module.exports = createCaseFirst;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var baseSlice = __webpack_require__(24);

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

module.exports = castSlice;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var asciiToArray = __webpack_require__(26),
    hasUnicode = __webpack_require__(3),
    unicodeToArray = __webpack_require__(27);

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

module.exports = stringToArray;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

module.exports = asciiToArray;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__panorama__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__zoo__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__graph__ = __webpack_require__(37);






class Simulation {
  constructor(canvas, graphCanvas, simulationParams) {
    this.simulationParams = simulationParams;
    this.canvas = canvas;
    this.graphCanvas = graphCanvas;
    this.graph = new __WEBPACK_IMPORTED_MODULE_2__graph__["a" /* default */](graphCanvas, simulationParams);
    this.panorama = new __WEBPACK_IMPORTED_MODULE_0__panorama__["a" /* default */](this.canvas);
    this.zoo = new __WEBPACK_IMPORTED_MODULE_1__zoo__["a" /* default */](this.simulationParams.predatorsParams(),
                       this.simulationParams.preysParams(),
                       this.simulationParams.predatorFieldParams(),
                       this.simulationParams.preyFieldParams(),
                       this.panorama.panoramaSize);
    this.animationInterval = 1000 / 24; // i.e. 24 fps throttle
  }

  tick(timestamp) {
    this.ticker = window.requestAnimationFrame(this.tick.bind(this));

    const now = Date.now();
    const elapsed = now - this.nextRender;

    if (elapsed > this.animationInterval) {
      this.nextRender = now;

      this.panorama.updateDx();
      this.zoo.tick();
      this.panorama.draw(this.zoo);
      this.graph.draw(this.zoo);
    }
  }

  begin() {
    this.nextRender = Date.now();
    this.tick();
  }

  togglePlaying(bool) {
    if (bool) {
      this.pauseTimestamp = this.pauseTimestamp || Date.now();
      this.zoo.unpause(this.pauseTimestamp);
      delete this.pauseTimestamp;
      this.begin();
    } else {
      this.pauseTimestamp = Date.now();
      window.cancelAnimationFrame(this.ticker);
    }
  }

  updateOrganisms(newParams) {
    this.zoo.updateOrganisms(newParams);
    this.graph.updateOrganisms(newParams.preysParams);
  }

  updatePreysField(newParams) {
    this.zoo.updatePreysField(newParams);
  }

  restart() {
    window.cancelAnimationFrame(this.ticker);
    this.graph = new __WEBPACK_IMPORTED_MODULE_2__graph__["a" /* default */](this.graphCanvas, this.simulationParams);
    this.panorama = new __WEBPACK_IMPORTED_MODULE_0__panorama__["a" /* default */](this.canvas);
    this.zoo = new __WEBPACK_IMPORTED_MODULE_1__zoo__["a" /* default */](this.simulationParams.predatorsParams(),
                       this.simulationParams.preysParams(),
                       this.simulationParams.predatorFieldParams(),
                       this.simulationParams.preyFieldParams(),
                       this.panorama.panoramaSize);
    this.begin();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Simulation;



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__background__ = __webpack_require__(30);
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
    if (this.background.loaded) {
      this.background.draw(this.dx);
      this.drawOrganisms(zoo.preysController);
      this.drawOrganisms(zoo.predatorsController);
    }
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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const backgroundPath = 'https://s3-us-west-1.amazonaws.com/talons-dev/final-background-cropped.jpeg';

class Background {
  // eventually refactor into background and panorama classes
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.img = new Image(3000, 750);
    this.img.onload = () => { this.loaded = true; };
    this.img.src = backgroundPath;
    this.loaded = false;
    this.imageSize = {
      width: this.img.width,
      height: this.img.height
    };
    console.log(this.imageSize);
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
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__predators_controller__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__preys_controller__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__field__ = __webpack_require__(36);






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
    if (!this.unpauseTimestamp) {
      this.predatorsController.reproducePredators(this.panoramaSize);
      this.preysController.reproducePreys(this.panoramaSize);
    } else if (Date.now() > this.unpauseTimestamp) {
      delete this.unpauseTimestamp;
    }
  }

  unpause(pauseTimestamp) {
    this.unpauseTimestamp = 2 * Date.now() - pauseTimestamp;
    this.predatorsController.unpause(pauseTimestamp);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Zoo;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__predator__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__organisms_controller__ = __webpack_require__(5);
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

  unpause(pauseTimestamp) {
    const elapsedTime = Date.now() - pauseTimestamp;
    this.organisms.forEach(organism => organism.unpause(elapsedTime));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PredatorsController;



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__organism__ = __webpack_require__(4);




class Predator extends __WEBPACK_IMPORTED_MODULE_0__organism__["a" /* default */] {
  constructor(predatorParams, panoramaSize) {
    super(predatorParams, panoramaSize);
    this.lastAte = Date.now();
    this.efficiency = predatorParams.efficiency;
  }

  // allow for parameters to be changed after the initialization
  // (e.g. based on user input on the slider)
  updatePredatorParams({speed, efficiency, perception}) {
    this.speed = speed;
    this.efficiency = efficiency;
    this.perception = perception;
  }

  // resets the countdown to starvation
  feed(preys) {
    this.lastAte = Date.now();
  }

  unpause(elapsedTime) {
    this.lastAte += elapsedTime;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Predator;



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prey__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__organisms_controller__ = __webpack_require__(5);
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
    this.organisms.forEach( prey => {
      prey.updatePreyParams(preyParams);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PreysController;



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__organism__ = __webpack_require__(4);




class Prey extends __WEBPACK_IMPORTED_MODULE_0__organism__["a" /* default */] {
  constructor(preyParams, panoramaSize) {
    super(preyParams, panoramaSize);
  }

  // allow for parameters to be changed after the initialization
  // (e.g. based on user input on the slider)
  updatePreyParams({speed}) {
    this.speed = speed;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Prey;



/***/ }),
/* 36 */
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
/* 37 */
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

  updateOrganisms({carryingCapacity}) {
    this.carryingCapacity = carryingCapacity;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Graph;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map