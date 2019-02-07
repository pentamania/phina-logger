/*!
 * 
 * phina-logger 0.1.0
 * MIT Licensed
 * Copyright (C) pentamania
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("phina.js"));
	else if(typeof define === 'function' && define.amd)
		define(["phina.js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("phina.js")) : factory(root["phina"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_phina_js__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ "./src/logger.js");
/* harmony import */ var _loglabelarea__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loglabelarea */ "./src/loglabelarea.js");
// webビルド用



/***/ }),

/***/ "./src/logger.js":
/*!***********************!*\
  !*** ./src/logger.js ***!
  \***********************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
/* harmony import */ var phina_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phina.js */ "phina.js");
/* harmony import */ var phina_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phina_js__WEBPACK_IMPORTED_MODULE_0__);


/**
 * @class Logger
 * @param {Number} maxLogs 最大ログ格納数
 */
// export var Logger = phina.createClass({
var Logger = phina_js__WEBPACK_IMPORTED_MODULE_0__["define"]('phina.util.Logger', {
  superClass: phina_js__WEBPACK_IMPORTED_MODULE_0__["util"].EventDispatcher,

  init: function (maxLogs) {
    this.superInit();
    this._logs = []; // any[]
    this._maxLength = maxLogs || 16;
    this._cachedLogString = "";
  },

  push: function () {
    this._cachedLogString = "";
    Array.prototype.slice.call(arguments).forEach(function(log) {
      this._logs.push(log);
      if (this._maxLength < this._logs.length) this._logs.shift();
      this.flare('logged', log);
    }.bind(this));
  },

  clear: function () {
    this._cachedLogString = "";
    this._logs.length = 0;
    this.flare('clear');
  },

  _accessor: {
    logString: {
      get: function () {
        if (this._cachedLogString !== "") return this._cachedLogString;

        var str = "";
        this._logs.forEach(function (item) {
          str += JSON.stringify(item).replace(/"|{|}/g, '') + '\n';
        });
        this._cachedLogString = str;

        return str;
      },
    }
  },

});


/***/ }),

/***/ "./src/loglabelarea.js":
/*!*****************************!*\
  !*** ./src/loglabelarea.js ***!
  \*****************************/
/*! exports provided: LogLabelArea */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLabelArea", function() { return LogLabelArea; });
/* harmony import */ var phina_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phina.js */ "phina.js");
/* harmony import */ var phina_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phina_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger.js */ "./src/logger.js");



var DEFAULT_SCROLL_SENSIBILITY = 2;

/**
 * @class LogLabelArea
 * @param params[] todo
 */
var LogLabelArea = phina_js__WEBPACK_IMPORTED_MODULE_0__["define"]('phina.display.LogLabelArea', {
  superClass: phina_js__WEBPACK_IMPORTED_MODULE_0__["ui"].LabelArea,

  init: function (params) {
    params = ({}).$safe(params, LogLabelArea.defaults);
    this.superInit(params);
    this._logger = Object(_logger_js__WEBPACK_IMPORTED_MODULE_1__["Logger"])(params.maxLog);
    if (params.dragScroll) {
      this.setDragScroll(params.dragScroll);
    }
    this._removePrevScroll = null;
  },

  setDragScroll: function (sensibility) {
    if (this._removePrevScroll) this._removePrevScroll();

    var listener = function (e) {
      sensibility = (!Number.isNaN(sensibility)) ? sensibility : DEFAULT_SCROLL_SENSIBILITY;
      var delta = e.pointer.dy * sensibility;
      this.scrollY = Math.max(this.scrollY + delta, 0);
    };
    this.setInteractive(true)
      .on('pointmove', listener);
    this._removePrevScroll = function () {
      this.off('pointmove', listener);
    }.bind(this);

    return this;
  },

  /**
   * @param ... any
   */
  add: function () {
    /* 一度に追加されたら文字列で一つにまとめる？ */
    // var args = Array.prototype.slice.call(arguments);
    // var str = "";
    // args.forEach(function(item) {
    //   str += JSON.stringify(item).replace(/"|{|}/g, '') + ', ';
    // }.bind(this));
    // this._logger.push(str);
    // this.text = this._logger.logString; // update text

    this._logger.push.apply(this._logger, arguments);
    this.text = this._logger.logString; // update text
    return this;
  },

  clear: function () {
    this._logger.clear();
    this.text = "";
    return this;
  },

  _accessor: {
    logs: {
      get: function () { return this._logger._logs; }
    },
  },

  _static: {
    defaults: {
      text: "Logs will be shown here!",
      fontSize: 14,
      fill: "limegreen",
      backgroundColor: "black",
      maxLog: 16,
      dragScroll: false,
    },
  },

});

/***/ }),

/***/ "phina.js":
/*!***********************************************************************************************!*\
  !*** external {"commonjs":"phina.js","commonjs2":"phina.js","amd":"phina.js","root":"phina"} ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_phina_js__;

/***/ })

/******/ });
});
//# sourceMappingURL=phina-logger.js.map