/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/modules/getHeight.js":
/*!********************************************!*\
  !*** ./src/assets/js/modules/getHeight.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var getHeight = function getHeight() {
  var els = document.querySelectorAll('[data-height]');
  var heightArr = [];
  if (els) {
    heightArr = Array.from(els);
    heightArr.forEach(function (el) {
      var height = el.offsetHeight;
      el.setAttribute('data-height', height);
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getHeight);

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
/*!*******************************!*\
  !*** ./src/assets/js/home.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_getHeight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/getHeight */ "./src/assets/js/modules/getHeight.js");


// classes toggles
function setItemsHeight() {
  var classItemsList = document.querySelector('.home-classes-items'),
    classItems = document.querySelectorAll('.home-classes-item');
  var classesHeight = 0;
  classItems.forEach(function (item) {
    setTimeout(function () {
      var itemHeight = item.dataset.height;
      if (itemHeight > classesHeight) {
        classesHeight = itemHeight;
        classItemsList.style.height = itemHeight + 'px';
      }
    }, 100);
  });
}
var classes = function classes() {
  var classToggles = document.querySelectorAll('.home-classes-toggle'),
    classItems = document.querySelectorAll('.home-classes-item');
  setItemsHeight();
  classToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      classToggles.forEach(function (toggleItem) {
        toggleItem.setAttribute('aria-expanded', false);
        toggleItem.classList.remove('active');
      });
      var toggleBtn = e.target,
        toggleId = toggleBtn.id;
      toggleBtn.setAttribute('aria-expanded', true);
      toggleBtn.classList.add('active');

      // set items
      classItems.forEach(function (item) {
        if (item.getAttribute('aria-labelledby') === toggleId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    });
  });
};
classes();
window.addEventListener("resize", setItemsHeight);
})();

/******/ })()
;