// classes toggles
function setItemsHeight() {
	const classItemsList = document.querySelector('.about-classes-items'),
		classItems = document.querySelectorAll('.about-classes-item');

	let classesHeight = 0;

	classItems.forEach((item) => {
		setTimeout(() => {
			const itemHeight = item.dataset.height;
			if (itemHeight > classesHeight) {
				classesHeight = itemHeight;
				classItemsList.style.height = itemHeight + 'px';
			}
		}, 100);
	});
}

const classes = () => {
	const classToggles = document.querySelectorAll('.about-classes-toggle'),
		classItems = document.querySelectorAll('.about-classes-item');

	setItemsHeight();
	classToggles.forEach((toggle) => {
		toggle.addEventListener('click', (e) => {
			e.preventDefault();

			classToggles.forEach((toggleItem) => {
				toggleItem.setAttribute('aria-expanded', false);
				toggleItem.classList.remove('active');
			});

			const toggleBtn = e.target,
				toggleId = toggleBtn.id;

			toggleBtn.setAttribute('aria-expanded', true);
			toggleBtn.classList.add('active');

			// set items
			classItems.forEach((item) => {
				if (item.getAttribute('aria-labelledby') === toggleId) {
					item.classList.add('active');
				}
				else {
					item.classList.remove('active');
				}
			});
		});
	});
}

classes();
window.addEventListener("resize", setItemsHeight);