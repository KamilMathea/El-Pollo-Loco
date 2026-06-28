function openControls() {
    const dialog = document.getElementById('controls-dialog');
    dialog.showModal();
}

function closeControls() {
    const dialog = document.getElementById('controls-dialog');
    dialog.close();
}

function startGame() {
    const dialog = document.getElementById('controls-dialog');

    if (!gameStarted && !dialog.open) {
        gameStarted = true;
        
        document.querySelector('.menu-buttons').style.display = 'none';
        
        initLevel(); 
        world = new World(canvas, keyboard); 
    }
}

function closeControlsOutside(event) {
    const dialog = document.getElementById('controls-dialog');
    if (event.target === dialog) {
        closeControls();
    }
}

function handleBtnKeyDown(event) {
    if (event.keyCode === 13) {
        event.preventDefault();

        if (event.target.id === 'start-btn') {
            startGame();
        } else if (event.target.id === 'instruction-btn') {
            openControls();
        }
    }
}