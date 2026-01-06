let canvas;
let world;
let keyboard = new Keyboard();
const jumpSound = new Audio('audio/jump.mp3');
const walkSound = new Audio('audio/walk.mp3');


function init() {
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
}

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


function fullscreen(){
    let fullscreen = document.getElementById('canvas');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.msRequestFullscreen) {   
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {  
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
