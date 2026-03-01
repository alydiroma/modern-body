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
                    
                    div.innerHTML = `<div class="stack-xs"><h3><a href="https://modern-body.captivate.fm/">${ep.title}</a></h3><p class="p-small">${formattedDate}</p></div><audio controls><source src=${ ep.media_url} type="audio/mpeg">Your browser does not support the audio element.</audio>`;
                    
                    container.appendChild(div);
                });

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

const playAudio = () => {
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
        const buttonIcon = player.querySelector('.btn-icon');
        const progressBar = player.querySelector('.progressBar');
        const progressCurrent = player.querySelector('.progress-current');
        const progressDuration = player.querySelector('.progress-duration');
        const volumeControl = player.querySelector('.volumeControl');

        audio.addEventListener('loadedmetadata', function() {
            console.log('audio.duration', audio.duration);
            if (audio.duration) {
                const percentage = (audio.currentTime / audio.duration) * 100;
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
                buttonPlaying.classList.remove('show');        }
        });

        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                const percentage = (audio.currentTime / audio.duration) * 100;
                progressBar.value = percentage;
                progressCurrent.textContent = formatAudioTime(audio.currentTime);
            }
        });

        progressBar.addEventListener('input', () => {
            if (audio.duration) {
                const time = (progressBar.value / 100) * audio.duration;
                audio.currentTime = formatAudioTime(time);
            }
        });

        volumeControl.addEventListener('input', () => {
            audio.volume = volumeControl.value;
        });
    }

    const customPlayers = document.querySelectorAll('.custom-player');

    customPlayers.forEach((player) => {
        if (player) {
            playerControls(player);
        }
    });
}

loadPodcasts();
showMoreLatestPodcast();
playAudio();