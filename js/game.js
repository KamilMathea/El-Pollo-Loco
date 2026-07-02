let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false
let win_sound = new Audio('audio/game_won.mp3');
win_sound.volume = 0.3;
let lose_sound = new Audio('audio/game_over.mp3');
lose_sound.volume = 0.3;
let intro_music = new Audio('audio/bg_music_intro2.mp3');
intro_music.volume = 0.15;
intro_music.loop = true;

let ingame_music = new Audio('audio/bg_music_ingame.mp3');
ingame_music.volume = 0.15;
ingame_music.loop = true;

function init() {
    canvas = document.getElementById('canvas');
    showStartScreen();
    tryPlayIntro();
    window.addEventListener('click', tryPlayIntro, { once: true });
    window.addEventListener('keydown', tryPlayIntro, { once: true });
}

function tryPlayIntro() {
    if (!gameStarted && intro_music.paused) {
        intro_music.play().catch(error => {
        });
    }
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
        intro_music.pause();
        intro_music.currentTime = 0;
        ingame_music.play().catch(e => {});
        initLevel();
        world = new World(canvas, keyboard);
    }
}

function gameOver() {
    ingame_music.pause();
    ingame_music.currentTime = 0;
    lose_sound.play();
    document.getElementById('game-over-screen').classList.remove('hidden');
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

function gameWon() {
    ingame_music.pause();
    ingame_music.currentTime = 0;
    win_sound.play();
    document.getElementById('you-won-screen').classList.remove('hidden');
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

function restartGame() {
    win_sound.pause();
    win_sound.currentTime = 0;
    lose_sound.pause();
    lose_sound.currentTime = 0;
    document.getElementById('game-over-screen').classList.add('hidden');
    document.getElementById('you-won-screen').classList.add('hidden');
    gameStarted = false;
    intro_music = new Audio('audio/bg_music_intro2.mp3');
    intro_music.volume = 0.15;
    intro_music.loop = true;
    ingame_music = new Audio('audio/bg_music_ingame.mp3');
    ingame_music.volume = 0.15;
    ingame_music.loop = true;
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