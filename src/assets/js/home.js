// home banner video
const hero = document.querySelector(".home-hero");
const heroVideo = document.querySelector(".home-hero-video");
const heroBtn = document.querySelector(".home-hero-play");

heroBtn.addEventListener("click", handlePlayButton, false);
playVideo();

async function playVideo() {
	try {
		await heroVideo.play();
		heroBtn.setAttribute('title', 'Pause Video');
		heroBtn.classList.add('playing');
		hero.classList.add('in-view');
	} catch (err) {
		heroBtn.setAttribute('title', 'Play Video');
		heroBtn.classList.remove('playing');
		hero.classList.add('no-autoplay');
	}
}

function handlePlayButton() {
	if (heroVideo.paused) {
		playVideo();
		heroBtn.setAttribute('title', 'Pause Video');
		heroBtn.classList.add('playing');
		console.log('video was paused');
	} else {
		heroVideo.pause();
		heroBtn.setAttribute('title', 'Play Video');
		heroBtn.classList.remove('playing');
		console.log('video was playing');
	}
}

heroVideo.addEventListener("ended", function() {
	heroBtn.setAttribute('title', 'Play Video');
	heroBtn.classList.remove("playing");
}, false);