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
          div.innerHTML = "<div class=\"stack-xs\"><h3><a href=\"https://modern-body.captivate.fm/\">".concat(ep.title, "</a></h3><p class=\"p-small\">").concat(formattedDate, "</p></div><audio controls><source src=").concat(ep.media_url, " type=\"audio/mpeg\">Your browser does not support the audio element.</audio>");
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
      console.log('audio.duration', audio.duration);
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