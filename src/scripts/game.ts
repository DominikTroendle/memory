interface GameSettings {
    theme: string,
    player: string,
    boardSize: number
}

const field = document.getElementById('field');

let gameSettings: GameSettings;

document.addEventListener('DOMContentLoaded', () => {
    gameSettings = getGameSettings();
    initGame();
})

function getGameSettings(): GameSettings {
    const data = sessionStorage.getItem('gameSettings');
    if(!data){
        return {
            theme: "Code Vibes Theme",
            player: "Blue",
            boardSize: 16
        };
    };
    return JSON.parse(data) as GameSettings;
}

function initGame() {
    if(field){
        field.addEventListener('click', e => {
            const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement;
            card.classList.toggle('is-flipped');
        });
    };
    renderCards();
}

function renderCards() {
    if(field){
        for(let i = 0; i < gameSettings.boardSize; i++){
            field.innerHTML += returnCardHTML();
        };
    };
}

function returnCardHTML() {
    return `<button class="card">
                <div class="card__inner">
                    <div class="card__face"></div>
                    <div class="card__face card__face--back"></div>
                </div>
            </button>`;
}