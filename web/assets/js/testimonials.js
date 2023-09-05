/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************************!*\
  !*** ./src/assets/js/testimonials.js ***!
  \***************************************/
var videoBtns = document.querySelectorAll('.testimonials-video-btn');
videoBtns.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    var videoImage = e.target.nextElementSibling;
    e.target.style.display = 'none';
    videoImage.style.display = 'none';
  });
});
/******/ })()
;