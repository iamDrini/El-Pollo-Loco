


// Initialwert aus Local Storage laden
window.isMuted = localStorage.getItem('isMuted') === 'true';

function toggleMute() {
    window.isMuted = !window.isMuted;
    localStorage.setItem('isMuted', window.isMuted);
}

document.addEventListener('DOMContentLoaded', function() {
    const gameOverScreen = document.getElementById('game-over-screen');
    const gameWinScreen = document.getElementById('game-win-screen');
    if (gameOverScreen) gameOverScreen.style.display = 'none';
    if (gameWinScreen) gameWinScreen.style.display = 'none';
});

const backgroundMusic = new Audio('audio/background_music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

function startGame(){
    window.gameIsRestarting = false;
    const startScreen = document.querySelector('.start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    gameOverScreen.style.display = 'none';
    startScreen.style.display = 'none';
    backgroundMusic.currentTime = 0;
    if (!window.isMuted)
    backgroundMusic.play();
    init();
}


function restartGame(){
    window.gameIsRestarting = true;
    backgroundMusic.pause();
    const gameOverScreen = document.getElementById('game-over-screen');
    const startScreen = document.getElementById('start-screen');
    gameOverScreen.style.display = 'none';
    startScreen.style.display = 'block';
}

function updateMuteOverlay() {
        const muteRef = document.getElementById('mute-btn');
        if (window.isMuted) {
            muteRef.classList.add('mute-overlay');
        } else {
            muteRef.classList.remove('mute-overlay')
        }
    }

document.addEventListener('DOMContentLoaded', updateMuteOverlay);

function toggleImpressum(event){
    event.stopPropagation();
    const impRef = document.getElementById('modal-imp');
    impRef.classList.toggle('d-none');
}

