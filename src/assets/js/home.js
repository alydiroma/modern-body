import Swiper from 'swiper/bundle';

// classes carousel
const swiper = new Swiper('.swiper', {
	loop: true,
	slidesPerView: 1,
	spaceBetween: 0,
	breakpoints: {
		992: {
			slidesPerView: 2,
			spaceBetween: 48
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 48
		},
		1440: {
			slidesPerView: 4,
			spaceBetween: 48
		}
	},
	navigation: {
		nextEl: '.home-classes-nav-next',
		prevEl: '.home-classes-nav-prev',
	}
});