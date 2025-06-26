const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
let videoWatched = 0;
let classeRemovida = false;
let intervalId;

const main = document.querySelector('main');
const tapBtn = document.getElementById('tapToListen');

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '367',
    width: '800',
    videoId: '6FsYk9GIv2Y',
    playerVars: {
      autoplay: 1,
      mute: 1, // Mute necessário para autoplay
      controls: 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo(); // Começa automaticamente com som desligado
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING && !intervalId) {
    intervalId = setInterval(() => {
      const currentTime = player.getCurrentTime();
      if (!classeRemovida && currentTime >= 1214) {
        main.classList.remove('esconder');
        classeRemovida = true;
        clearInterval(intervalId); // Para de verificar
      }
    }, 1000);
  } else if (event.data !== YT.PlayerState.PLAYING) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

tapBtn.addEventListener('click', () => {
  player.unMute();
  tapBtn.style.display = 'none';
});