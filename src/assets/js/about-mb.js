import panels from './modules/panels';

window.onload = function() {
	panels();
}
// window resize 
let timer;
window.onresize = function() {
    clearTimeout(timer);
    timer = setTimeout(panels, 50);
}
