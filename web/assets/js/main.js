/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/assets/js/main.js ***!
  \*******************************/
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
/******/ })()
;