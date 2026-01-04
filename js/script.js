
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
    console.log(window.gameIsRestarting);
    const startScreen = document.querySelector('.start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    gameOverScreen.style.display = 'none';
    startScreen.style.display = 'none';
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
    init();
}


function restartGame(){
    window.gameIsRestarting = true;
    console.log(window.gameIsRestarting);
    backgroundMusic.pause();
    const gameOverScreen = document.getElementById('game-over-screen');
    const startScreen = document.getElementById('start-screen');
    gameOverScreen.style.display = 'none';
    startScreen.style.display = 'block';
}