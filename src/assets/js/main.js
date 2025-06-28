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

// focus trap
const trapFocus = (element, toggle) => {
	const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
	const firstFocusableEl = focusableEls[0];  
	const lastFocusableEl = focusableEls[focusableEls.length - 1];
	const KEYCODE_TAB = 9;

	element.addEventListener('keydown', function(e) {
		const isTabPressed = (e.key === 'Tab');

		if (!isTabPressed) { 
			return; 
		}

		if ( e.shiftKey ) {
			if (document.activeElement === firstFocusableEl) {
				lastFocusableEl.focus();
				e.preventDefault();
			}
		}
		else {
			if (document.activeElement === lastFocusableEl) {
				toggle.focus();
				e.preventDefault();
			}
		}
	});
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

trapFocus(mobileNav, mobileNavBtn);

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