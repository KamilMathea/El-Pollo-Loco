let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false

function init() {
    canvas = document.getElementById('canvas');
    showStartScreen();
}

function showStartScreen() {
    let ctx = canvas.getContext('2d');
    let img = new Image();
    img.src = 'img/9_intro_outro_screens/start/startscreen_1.png';

    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        initLevel();
        world = new World(canvas, keyboard);
    }
}

function gameOver() {
    document.getElementById('game-over-screen').classList.remove('hidden');
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

function gameWon() {
    document.getElementById('you-won-screen').classList.remove('hidden');
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

function restartGame() {
    document.getElementById('game-over-screen').classList.add('hidden');
    document.getElementById('you-won-screen').classList.add('hidden');
    gameStarted = false;
    startGame();
}

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 13) {
        startGame();
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }

    if (event.keyCode == 83) {
        keyboard.S = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }

    if (event.keyCode == 83) {
        keyboard.S = false;
    }
});

window.addEventListener("touchstart", () => {
    startGame();
});