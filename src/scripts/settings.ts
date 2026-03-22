let settings = {
    theme: "code vibes",
    player: "blue",
    boardSize: 16
};

const startButton = document.getElementById('button-start');

startButton?.addEventListener('click', () => {
    sessionStorage.setItem('gameSettings', JSON.stringify(settings));
})