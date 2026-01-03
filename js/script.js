
document.addEventListener('DOMContentLoaded', function() {
    const gameOverScreen = document.getElementById('game-over-screen');
    const gameWinScreen = document.getElementById('game-win-screen');
    if (gameOverScreen) gameOverScreen.style.display = 'none';
    if (gameWinScreen) gameWinScreen.style.display = 'none';
});
function startGame(){
    window.gameIsRestarting = false;
    console.log(window.gameIsRestarting);
    
    const startScreen = document.querySelector('.start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    gameOverScreen.style.display = 'none';
    startScreen.style.display = 'none';
    init();
}

function restartGame(){
    window.gameIsRestarting = true;
    console.log(window.gameIsRestarting);
    const gameOverScreen = document.getElementById('game-over-screen');
    const startScreen = document.getElementById('start-screen');
    gameOverScreen.style.display = 'none';
    startScreen.style.display = 'block';
}