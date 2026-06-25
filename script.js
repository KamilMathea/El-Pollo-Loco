function openControls() {
    const dialog = document.getElementById('controls-dialog');
    dialog.showModal();
}

function closeControls() {
    const dialog = document.getElementById('controls-dialog');
    dialog.close();
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        
        document.getElementById('instruction-btn').style.display = 'none';
        
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