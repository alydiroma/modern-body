/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/assets/js/home.js ***!
  \*******************************/
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
/******/ })()
;