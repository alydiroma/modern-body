/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/modules/panels.js":
/*!*****************************************!*\
  !*** ./src/assets/js/modules/panels.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var panels = function panels() {
  var panelGroups = document.querySelectorAll('[data-panel-group]');
  panelGroups.forEach(function (panelGroup) {
    var panels = panelGroup.querySelectorAll('[data-panel]');
    var panelTriggers = panelGroup.querySelectorAll('[data-panel-trigger]');
    var panelTargets = panelGroup.querySelectorAll('[data-panel-target]');
    panels.forEach(function (panel) {
      var panelTrigger = panel.querySelector('[data-panel-trigger]');
      var panelTarget = panel.querySelector('[data-panel-target]');
      panelTarget.style.height = "";
      var panelTargetHeight = panelTarget.offsetHeight;
      console.log('panelTargetHeight', panelTargetHeight);
      setTimeout(function () {
        panelTarget.style.height = "0";
      }, 100);
      panelTrigger.addEventListener("click", function (event) {
        event.preventDefault();
        var triggered = panelTrigger.getAttribute('aria-expanded');
        panelTriggers.forEach(function (trigger) {
          trigger.setAttribute('aria-expanded', 'false');
        });
        panelTargets.forEach(function (target) {
          target.style.height = "0";
        });
        if (triggered === 'false') {
          panelTrigger.setAttribute('aria-expanded', 'true');
          panelTarget.style.height = panelTargetHeight + 'px';
        }
      });
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (panels);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/assets/js/faq.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_panels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/panels */ "./src/assets/js/modules/panels.js");

(0,_modules_panels__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;