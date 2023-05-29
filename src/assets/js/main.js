//panels
import getHeight from './modules/getHeight';
import panels from './modules/panels';

window.onload = function () {
	getHeight();
	panels();
}
let timer;
window.onresize = function () {
	clearTimeout(timer);
	timer = setTimeout(panels, 50);
}

// mobile nav
const pageBody = document.querySelector('body');
const mobileNavBtn = document.querySelector('[data-mobile-nav-btn]');
const mobileNav = document.querySelector('[data-mobile-nav]');
mobileNavBtn.addEventListener('click', (event) => {
	event.preventDefault();
	let opened = mobileNavBtn.getAttribute('aria-pressed');
	if (opened === 'false') {
		mobileNavBtn.setAttribute('aria-pressed', 'true');
		mobileNavBtn.innerHTML = 'Close';
		mobileNav.classList.add('opened');
		setTimeout(() => {
			pageBody.classList.add('fixed');
		}, 301);
	}
	else {
		mobileNavBtn.innerHTML = 'Menu';
		pageBody.classList.remove('fixed');
		mobileNavBtn.setAttribute('aria-pressed', 'false');
		mobileNav.classList.remove('opened');
	}
});

// set copyright year
document.getElementById("copyright-year").innerHTML = new Date().getFullYear();

// general animation
const animateItem = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("in-view");
			observer.unobserve(entry.target)
		}
	});
};

const animateItemOptions = {
	threshold: 0.75,
};

const animateItemsObserver = new IntersectionObserver(animateItem, animateItemOptions);

const animateItems = document.querySelectorAll(".animate");
animateItems.forEach((item) => {
	animateItemsObserver.observe(item);
});