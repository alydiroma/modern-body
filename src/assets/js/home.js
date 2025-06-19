import Swiper from 'swiper/bundle';

// classes carousel
const swiper = new Swiper('.swiper', {
	loop: true,
	slidesPerView: 1,
	spaceBetween: 24,
	breakpoints: {
		620: {
			slidesPerView: 2,
			spaceBetween: 24
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 24
		},
		1440: {
			slidesPerView: 4,
			spaceBetween: 24
		}
	},
	navigation: {
		nextEl: '.home-classes-nav-next',
		prevEl: '.home-classes-nav-prev',
	}
});