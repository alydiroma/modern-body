/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************************!*\
  !*** ./src/assets/js/podcasts.js ***!
  \***********************************/
var loadPodcasts = function loadPodcasts() {
  document.getElementById('load-more-btn').addEventListener('click', function () {
    var btn = this;
    var offset = parseInt(btn.getAttribute('data-offset'));
    var limit = 12;
    var url = "/actions/captivateapi/default/load-more?limit=".concat(limit, "&offset=").concat(offset);
    btn.innerText = 'Loading...';
    var formatter = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(function (response) {
      if (!response.ok) throw new Error('Request failed: ' + response.status);
      return response.json();
    }).then(function (data) {
      if (data.success && data.episodes.length > 0) {
        var container = document.getElementById('episode-container');
        data.episodes.forEach(function (ep) {
          var div = document.createElement('div');
          div.className = 'podcasts-item';
          var dateObj = new Date(ep.published_date);
          var formattedDate = formatter.format(dateObj);
          div.innerHTML = "<div class=\"stack-xs\">" + "<h3>".concat(ep.title, "</a></h3><p class=\"p-small\">").concat(formattedDate, "</p>") + "</div>" + "<div class=\"custom-player\">" + "<audio class=\"player\">" + "<source src=\"".concat(ep.media_url, "\" type=\"audio/mpeg\">") + "Your browser does not support the audio tag." + "</audio>" + "<div class=\"custom-controls\">" + "<div class=\"control\">" + "<button class=\"control-button\">" + "<span class=\"paused show\">" + "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 330 330\"><path d=\"M37.728 328.12a14.994 14.994 0 0 0 15.222-.4l240-149.999a15 15 0 0 0 0-25.44L52.95 2.28A15 15 0 0 0 30 15v300a15 15 0 0 0 7.728 13.12\" fill=\"#3D2F17\" /></svg>" + "<span class=\"sr-only\">Play</span>" + "</span>" + "<span class=\"playing\">" + "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\"><path d=\"M19 4v16a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2\" fill=\"#3D2F17\" /></svg>" + "<span class=\"sr-only\">Pause</span>" + "</span>" + "</button>" + "</div>" + "<div class=\"progress\">" + "<div class=\"progress-text\">" + "<span class=\"progress-current\">0:00</span> / <span class=\"progress-duration\"></span>" + "</div>" + "<input type=\"range\" class=\"progressBar\" min=\"0\" max=\"100\" value=\"0\">" + "</div>" + "<div class=\"volume\">" + "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 75 75\"><path d=\"M39.389 13.769 22.235 28.606H6v19.093h15.989l17.4 15.051z\" fill=\"#3D2F17\" /><path d=\"M48 27.6A19.5 19.5 0 0 1 48 49m7.1-28.5a30 30 0 0 1 0 35.6M61.6 14a38.8 38.8 0 0 1 0 48.6\" fill=\"#3D2F17\" /></svg>" + "<input type=\"range\" class=\"volumeControl\" min=\"0\" max=\"1\" step=\"0.1\" value=\"1\">" + "</div>" + "</div>" + "</div>";
          container.appendChild(div);
        });
        btn.setAttribute('data-offset', offset + limit);
        btn.innerText = 'Load More';
      } else {
        btn.style.display = 'none';
      }
    })["catch"](function (err) {
      console.error('Error loading episodes:', err);
      btn.innerText = 'Load More';
    });
  });
};
var showMoreLatestPodcast = function showMoreLatestPodcast() {
  var showMoreToggle = document.getElementById('more-toggle');
  var showMorePanel = document.getElementById('more-copy');
  showMoreToggle.addEventListener('click', function () {
    var expanded = showMoreToggle.getAttribute('aria-expanded');
    if (expanded === 'false') {
      showMoreToggle.setAttribute('aria-expanded', 'true');
      showMoreToggle.textContent = 'Hide More About This Episode';
      showMorePanel.classList.add('show');
    } else {
      showMoreToggle.setAttribute('aria-expanded', 'false');
      showMoreToggle.textContent = 'Show More About This Episode';
      showMorePanel.classList.remove('show');
    }
  });
};
var playAudio = function playAudio() {
  var formatAudioTime = function formatAudioTime(time) {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor(time % 3600 / 60);
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return timeString = hours + ':' + minutes;
  };
  var playerControls = function playerControls(player) {
    var audio = player.querySelector('.player');
    var button = player.querySelector('.control-button');
    var buttonPlaying = player.querySelector('.playing');
    var buttonPaused = player.querySelector('.paused');
    var buttonIcon = player.querySelector('.btn-icon');
    var progressBar = player.querySelector('.progressBar');
    var progressCurrent = player.querySelector('.progress-current');
    var progressDuration = player.querySelector('.progress-duration');
    var volumeControl = player.querySelector('.volumeControl');
    audio.addEventListener('loadedmetadata', function () {
      if (audio.duration) {
        var percentage = audio.currentTime / audio.duration * 100;
        progressDuration.textContent = formatAudioTime(audio.duration);
      }
    }, false);
    button.addEventListener('click', function () {
      if (audio.paused) {
        audio.play()["catch"](function (e) {
          return console.error("Playback failed:", e);
        });
        buttonPaused.classList.remove('show');
        buttonPlaying.classList.add('show');
      } else {
        audio.pause();
        buttonPaused.classList.add('show');
        buttonPlaying.classList.remove('show');
      }
    });
    audio.addEventListener('timeupdate', function () {
      if (audio.duration) {
        var percentage = audio.currentTime / audio.duration * 100;
        progressBar.value = percentage;
        progressCurrent.textContent = formatAudioTime(audio.currentTime);
      }
    });
    progressBar.addEventListener('input', function () {
      if (audio.duration) {
        var time = progressBar.value / 100 * audio.duration;
        audio.currentTime = formatAudioTime(time);
      }
    });
    volumeControl.addEventListener('input', function () {
      audio.volume = volumeControl.value;
    });
  };
  var customPlayers = document.querySelectorAll('.custom-player');
  customPlayers.forEach(function (player) {
    if (player) {
      playerControls(player);
    }
  });
};
loadPodcasts();
showMoreLatestPodcast();
playAudio();
/******/ })()
;