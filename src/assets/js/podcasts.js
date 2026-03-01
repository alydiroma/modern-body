const loadPodcasts = () => {
    document.getElementById('load-more-btn').addEventListener('click', function() {
        const btn = this;
        const offset = parseInt(btn.getAttribute('data-offset'));
        const limit = 12;

        const url = `/actions/captivateapi/default/load-more?limit=${limit}&offset=${offset}`;

        btn.innerText = 'Loading...';

        const formatter = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Request failed: ' + response.status);
            return response.json();
        })
        .then(data => {
            if (data.success && data.episodes.length > 0) {
                const container = document.getElementById('episode-container');
                
                data.episodes.forEach(ep => {
                    const div = document.createElement('div');
                    div.className = 'podcasts-item';
                    const dateObj = new Date(ep.published_date);
                    const formattedDate = formatter.format(dateObj);
                    
                    div.innerHTML = `<div class="stack-xs">` +
                    `<h3>${ep.title}</a></h3><p class="p-small">${formattedDate}</p>` +
                    `</div>` +
                    `<div class="custom-player">` +
                        `<audio class="player">` +
                            `<source src="${ep.media_url}" type="audio/mpeg">` +
                            `Your browser does not support the audio tag.` +
                       `</audio>` +
                        `<div class="custom-controls">` +
                            `<div class="control">` +
                                `<button class="control-button">` +
                                   `<span class="paused show">` +
                                        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 330 330"><path d="M37.728 328.12a14.994 14.994 0 0 0 15.222-.4l240-149.999a15 15 0 0 0 0-25.44L52.95 2.28A15 15 0 0 0 30 15v300a15 15 0 0 0 7.728 13.12" fill="#3D2F17" /></svg>` +
                                        `<span class="sr-only">Play</span>` +
                                    `</span>` +
                                    `<span class="playing">` +
                                        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M19 4v16a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2" fill="#3D2F17" /></svg>` +
                                        `<span class="sr-only">Pause</span>` +
                                    `</span>` +
                                `</button>` +
                            `</div>` +
                            `<div class="progress">` +
                                `<div class="progress-text">` +
                                    `<span class="progress-current">0:00</span> / <span class="progress-duration"></span>` +
                                `</div>` +
                                `<input type="range" class="progressBar" min="0" max="100" value="0">` +
                            `</div>` +
                            `<div class="volume">` +
                                `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 75 75"><path d="M39.389 13.769 22.235 28.606H6v19.093h15.989l17.4 15.051z" fill="#3D2F17" /><path d="M48 27.6A19.5 19.5 0 0 1 48 49m7.1-28.5a30 30 0 0 1 0 35.6M61.6 14a38.8 38.8 0 0 1 0 48.6" fill="#3D2F17" /></svg>` +
                                `<input type="range" class="volumeControl" min="0" max="1" step="0.1" value="1">` +
                            `</div>` +
                        `</div>` +
                    `</div>`;

                    container.appendChild(div);
                });
                customAudio();

                btn.setAttribute('data-offset', offset + limit);
                btn.innerText = 'Load More';
            } else {
                btn.style.display = 'none';
            }
        })
        .catch(err => {
            console.error('Error loading episodes:', err);
            btn.innerText = 'Load More';
        });
    });
}

const showMoreLatestPodcast = () => {
    const showMoreToggle = document.getElementById('more-toggle');
    const showMorePanel = document.getElementById('more-copy');
    showMoreToggle.addEventListener('click', () => {
        const expanded = showMoreToggle.getAttribute('aria-expanded');
        if (expanded === 'false') {
            showMoreToggle.setAttribute('aria-expanded', 'true');
            showMoreToggle.textContent = 'Hide More About This Episode';
            showMorePanel.classList.add('show');
        }
        else {
            showMoreToggle.setAttribute('aria-expanded', 'false');
            showMoreToggle.textContent = 'Show More About This Episode';
            showMorePanel.classList.remove('show');
        }
    });
}

const customAudio = () => {
    const formatAudioTime = (time) => {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        return timeString = hours + ':' + minutes;
    }

    const playerControls = (player) => {
        const audio = player.querySelector('.player');
        const button = player.querySelector('.control-button');
        const buttonPlaying = player.querySelector('.playing');
        const buttonPaused = player.querySelector('.paused');
        const progressBar = player.querySelector('.progressBar');
        const progressCurrent = player.querySelector('.progress-current');
        const progressDuration = player.querySelector('.progress-duration');
        const volumeControl = player.querySelector('.volumeControl');

        audio.addEventListener('loadedmetadata', function() {
            if (Number.isFinite(audio.duration)) {
                const percentage = (audio.currentTime / audio.duration) * 100;
                progressBar.value = percentage;
                progressDuration.textContent = formatAudioTime(audio.duration);
            }
        }, false);

        button.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().catch(e => console.error("Playback failed:", e));
                buttonPaused.classList.remove('show');
                buttonPlaying.classList.add('show');
            } else {
                audio.pause();
                buttonPaused.classList.add('show');
                buttonPlaying.classList.remove('show');
            }
        });

        audio.addEventListener('timeupdate', () => {
            if (Number.isFinite(audio.duration) && audio.duration > 0) {
                const percentage = (audio.currentTime / audio.duration) * 100;
                progressBar.value = percentage;
                progressCurrent.textContent = formatAudioTime(audio.currentTime);
            }
        });

        progressBar.addEventListener('input', () => {
            if (Number.isFinite(audio.duration) && audio.duration > 0) {
                const time = (parseFloat(progressBar.value) / 100) * audio.duration;
                audio.currentTime = time; 
            }
        });

        volumeControl.addEventListener('input', () => {
            audio.volume = volumeControl.value;
        });
    };

    const customPlayers = document.querySelectorAll('.custom-player');

    customPlayers.forEach((player) => {
        if (player) {
            playerControls(player);
        }
    });
}

loadPodcasts();
showMoreLatestPodcast();
customAudio();