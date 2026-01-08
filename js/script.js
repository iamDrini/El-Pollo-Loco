window.isMuted = localStorage.getItem('isMuted') === 'true';

/**
 * Prevent context menu on all button elements.
 */
document.addEventListener('contextmenu', (event) => {
    if (event.target.closest('button')) {
        event.preventDefault();
    }
});

/** Toggle global mute state and persist it. */
function toggleMute() {
    window.isMuted = !window.isMuted;
    localStorage.setItem('isMuted', window.isMuted);
    updateMuteOverlay();
    
    if (window.isMuted && !backgroundMusic.paused) {
        backgroundMusic.pause();
    } else if (!window.isMuted && backgroundMusic.paused && !window.gameIsRestarting) {
        backgroundMusic.play();
    }
}

/**
 * Initialize game screens on page load.
 * Ensures game over and win screens are hidden when the page is first loaded.
 */
document.addEventListener('DOMContentLoaded', function() {
    const gameOverScreen = document.getElementById('game-over-screen');
    const gameWinScreen = document.getElementById('game-win-screen');
    if (gameOverScreen) gameOverScreen.style.display = 'none';
    if (gameWinScreen) gameWinScreen.style.display = 'none';
});

const backgroundMusic = new Audio('audio/background_music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

/**
 * Start the game: hide start/over screens, reset music, and init world.
 */
function startGame(){
    window.gameIsRestarting = false;
    const footerRef = document.getElementById('footer-container');
    const startScreen = document.querySelector('.start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    if(window.innerWidth < 1020) footerRef.style.display = 'none';
    gameOverScreen.style.display = 'none';
    startScreen.style.display = 'none';
    backgroundMusic.currentTime = 0;
    if (!window.isMuted)
    backgroundMusic.play();
    init();
}

/**
 * Restart the game: stop music, hide game over, show start screen.
 */
function restartGame(){
    window.gameIsRestarting = true;
    backgroundMusic.pause();
    const footerRef = document.getElementById('footer-container');
    const gameOverScreen = document.getElementById('game-over-screen');
    const startScreen = document.getElementById('start-screen');
    gameOverScreen.style.display = 'none';
    startScreen.style.display = 'block';
    footerRef.style.display = 'flex';
}

/**
 * Update the mute button overlay based on mute state.
 */
function updateMuteOverlay() {
        const muteRef = document.getElementById('mute-btn');
        if (window.isMuted) {
            muteRef.classList.add('mute-overlay');
        } else {
            muteRef.classList.remove('mute-overlay')
        }
    }
document.addEventListener('DOMContentLoaded', updateMuteOverlay);

/**
 * Toggle the Impressum modal visibility and stop click bubbling.
 * @param {Event} event - Click event from the overlay or close button.
 */
function toggleImpressum(event){
    event.stopPropagation();
    const impRef = document.getElementById('modal-imp');
    impRef.classList.toggle('d-none');
}

