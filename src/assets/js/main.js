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

