let canvas;
let world;
let keyboard = new Keyboard();
const jumpSound = new Audio('audio/jump.mp3');
const walkSound = new Audio('audio/walk.mp3');

/**
 * Initialize canvas, level, and world instance.
 */
function init() {
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
}

/**
 * Handle keydown events to set keyboard state and play sounds.
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
        if (!window.isMuted)
        walkSound.play();
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
        if (!window.isMuted)
        walkSound.play();
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
        if (!window.isMuted)
        jumpSound.play();
        walkSound.pause();
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * Handle keyup events to reset keyboard state and pause sounds.
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
        walkSound.pause();
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
        walkSound.pause();
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

/**
 * Set a keyboard state flag and manage optional sound playback.
 * @param {string} keyName - The keyboard property to set.
 * @param {boolean} isPressed - Whether the key is pressed.
 * @param {HTMLAudioElement|null} sound - Optional sound to play/pause.
 */
function setKeyState(keyName, isPressed, sound) {
    keyboard[keyName] = isPressed;

    if (!sound) return;

    if (isPressed && !window.isMuted) {
        sound.currentTime = 0;
        sound.play();
    } else {
        sound.pause();
    }
}

/**
 * Bind a mobile button to keyboard flags and optional press sound.
 * @param {string} buttonId - DOM id of the button element.
 * @param {string} keyName - Keyboard property to toggle.
 * @param {HTMLAudioElement|null} onPressSound - Sound to play while pressed.
 */
function bindMobileButton(buttonId, keyName, onPressSound = null) {
    const btn = document.getElementById(buttonId);

    const press   = (e) => {
        e.preventDefault();
        setKeyState(keyName, true, onPressSound);
    };

    const release = () => {
        setKeyState(keyName, false, onPressSound);
    };

    btn.addEventListener('pointerdown', press);
    btn.addEventListener('pointerup', release);
    btn.addEventListener('pointerleave', release);
}

document.addEventListener('DOMContentLoaded', () => {
    bindMobileButton('btn-right', 'RIGHT', walkSound);
    bindMobileButton('btn-left', 'LEFT', walkSound);
    bindMobileButton('btn-up', 'SPACE', jumpSound);
    bindMobileButton('salsa-btn', 'D');
});

/** Enter fullscreen for the canvas. */
function fullscreen(){
    let fullscreen = document.getElementById('canvas');
    enterFullscreen(fullscreen);
}

/**
 * Request fullscreen on the given element (cross-browser).
 * @param {HTMLElement} element - Target element for fullscreen.
 */
function enterFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.msRequestFullscreen) {   
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {  
    element.webkitRequestFullscreen();
  }
}

/** Exit fullscreen if active (cross-browser). */
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
