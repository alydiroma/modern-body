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

// testimonial videos
const testimonialSection = document.getElementById('testimonials');
const testimonialVideoBtns = document.querySelectorAll('.video-btn');
const testimonialImage = document.querySelector('.home-testimonials-image');

const selectTesimonialVideo = () => {
	testimonialVideoBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			const windowWidth = window.innerWidth;
			const videoId = btn.dataset.video;

			testimonialImage.innerHTML = 
			'<iframe src="https://player.vimeo.com/video/' + videoId + '?h=c1bcc1e18c&amp;autoplay=1&amp;title=0&amp;byline=0&amp;portrait=0" frameborder="0" allow="fullscreen; picture-in-picture" allowfullscreen="" loading="lazy"></iframe>';

			if (windowWidth <= 992) {
				testimonialSection.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});	
			}
		});
	})
}

if (testimonialVideoBtns) {
	selectTesimonialVideo();
}

const faqAccordionToggles = document.querySelectorAll('.home-faq-toggle');

const toggleFaqs = () => {
	faqAccordionToggles.forEach((toggle) => {
		toggle.addEventListener('click', () => {
			faqAccordionToggles.forEach((toggle) => {
				toggle.setAttribute('aria-expanded', 'false');
			});
			const expanded = toggle.getAttribute('aria-expanded');
			if (expanded === 'false') {
				toggle.setAttribute('aria-expanded', 'true');
			}
			else {
				toggle.setAttribute('aria-expanded', 'false');
			}
		});
	});
}

if (faqAccordionToggles) {
	toggleFaqs();
}