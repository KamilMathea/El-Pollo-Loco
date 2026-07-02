function openControls() {
    tryPlayIntro();
    const dialog = document.getElementById('controls-dialog');
    dialog.showModal();
}

function closeControls() {
    const dialog = document.getElementById('controls-dialog');
    dialog.close();
}

function handleStartGameClick() {
    const dialog = document.getElementById('controls-dialog');

    if (!gameStarted && !dialog.open) {
        document.querySelector('.menu-buttons').style.display = 'none';
        startGame();
    }
}

function closeControlsOutside(event) {
    const dialog = document.getElementById('controls-dialog');
    if (event.target === dialog) {
        closeControls();
    }
}

function handleBtnKeyDown(event) {
    tryPlayIntro();
    if (event.keyCode === 13) {
        event.preventDefault();

        if (event.target.id === 'start-btn') {
            handleStartGameClick();
        } else if (event.target.id === 'instruction-btn') {
            openControls();
        }
    }
}