/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/main.js":
/*!*******************************!*\
  !*** ./src/assets/js/main.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_getHeight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/getHeight */ "./src/assets/js/modules/getHeight.js");
/* harmony import */ var _modules_panels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/panels */ "./src/assets/js/modules/panels.js");
//panels


window.onload = function () {
  (0,_modules_getHeight__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_panels__WEBPACK_IMPORTED_MODULE_1__["default"])();
};
var timer;
window.onresize = function () {
  clearTimeout(timer);
  timer = setTimeout(_modules_panels__WEBPACK_IMPORTED_MODULE_1__["default"], 50);
};

// mobile nav
var pageBody = document.querySelector('body');
var mobileNavBtn = document.querySelector('[data-mobile-nav-btn]');
var mobileNav = document.querySelector('[data-mobile-nav]');
mobileNavBtn.addEventListener('click', function (event) {
  event.preventDefault();
  var opened = mobileNavBtn.getAttribute('aria-pressed');
  if (opened === 'false') {
    mobileNavBtn.setAttribute('aria-pressed', 'true');
    mobileNavBtn.innerHTML = 'Close';
    mobileNav.classList.add('opened');
    setTimeout(function () {
      pageBody.classList.add('fixed');
    }, 301);
  } else {
    mobileNavBtn.innerHTML = 'Menu';
    pageBody.classList.remove('fixed');
    mobileNavBtn.setAttribute('aria-pressed', 'false');
    mobileNav.classList.remove('opened');
  }
});

// set copyright year
document.getElementById("copyright-year").innerHTML = new Date().getFullYear();

// general animation
var animateItem = function animateItem(entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
};
var animateItemOptions = {
  threshold: 0.75
};
var animateItemsObserver = new IntersectionObserver(animateItem, animateItemOptions);
var animateItems = document.querySelectorAll(".animate");
animateItems.forEach(function (item) {
  animateItemsObserver.observe(item);
});

/***/ }),

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

/***/ }),

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
      var panelLinks = panelTarget.querySelectorAll('a, button');
      panelTarget.style.height = "";
      var panelTargetHeight = panelTarget.dataset.height;

      // show/hide clickable panel elements
      var panelLinksArr = [];
      var hideLinks = function hideLinks() {
        if (panelLinks) {
          panelLinksArr = Array.from(panelLinks);
          panelLinksArr.forEach(function (link) {
            link.tabIndex = -1;
          });
        }
      };
      var showLinks = function showLinks() {
        if (panelLinks) {
          panelLinksArr = Array.from(panelLinks);
          panelLinksArr.forEach(function (link) {
            link.tabIndex = '';
          });
        }
      };
      setTimeout(function () {
        panelTarget.style.height = "0";
        panelTarget.style.visibility = "";
      }, 100);
      hideLinks();
      panelTrigger.addEventListener("click", function (event) {
        event.preventDefault();
        var triggered = panelTrigger.getAttribute('aria-expanded');
        panelTriggers.forEach(function (trigger) {
          trigger.setAttribute('aria-expanded', 'false');
          hideLinks();
        });
        panelTargets.forEach(function (target) {
          target.style.height = "0";
        });
        if (triggered === 'false') {
          panelTrigger.setAttribute('aria-expanded', 'true');
          panelTarget.style.height = panelTargetHeight + 'px';
          showLinks();
        }
      });
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (panels);

/***/ }),

/***/ "./src/assets/scss/main.scss":
/*!***********************************!*\
  !*** ./src/assets/scss/main.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/web/assets/js/main": 0,
/******/ 			"web/assets/css/main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmodern_body"] = self["webpackChunkmodern_body"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["web/assets/css/main"], () => (__webpack_require__("./src/assets/js/main.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["web/assets/css/main"], () => (__webpack_require__("./src/assets/scss/main.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;