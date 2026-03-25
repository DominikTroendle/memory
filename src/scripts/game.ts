interface GameSettings {
    theme: string,
    player: string,
    boardSize: number
}

let field: HTMLElement;

let gameSettings: GameSettings;

document.addEventListener('DOMContentLoaded', () => {
    gameSettings = getGameSettings();
    initField();
    initGame();
})

function initField(){
    const element = document.getElementById('field');
    if(!element) throw new Error('field not found');
    field = element;
}

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
    renderCards();
    addCardAnimation();
}

function renderCards() {
    if(gameSettings.boardSize > 16){
        field.classList.remove('game__field--small');
        field.classList.add('game__field--large');
    }
    for(let i = 0; i < gameSettings.boardSize; i++){
        field.innerHTML += returnCardHTML();
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

function addCardAnimation() {
    field.addEventListener('click', e => {
        const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement;
        card.classList.toggle('is-flipped');
    });
}