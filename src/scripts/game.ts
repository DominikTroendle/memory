interface GameSettings {
    theme: string,
    player: string,
    boardSize: number
}

const field = document.getElementById('field');

let gameSettings: GameSettings;

document.addEventListener('DOMContentLoaded', () => {
    gameSettings = getGameSettings();
    renderCards();
    init();
})

function getGameSettings(): GameSettings {
    const data = sessionStorage.getItem('gameSettings');
    if(!data){
        return {
            theme: "code vibes",
            player: "blue",
            boardSize: 16
        };
    };
    return JSON.parse(data) as GameSettings;
}

function init(){
    if(field){
        field.addEventListener('click', e => {
            const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement;
            card.classList.toggle('is-flipped');
        });
    };
}

function renderCards() {
    for(let i = 0; i < gameSettings.boardSize; i++){
        if(field){
            field.innerHTML += returnCardHTML();
        }
    }
}

function returnCardHTML() {
    return `<button class="card">
                <div class="card__inner">
                    <div class="card__face"></div>
                    <div class="card__face card__face--back"></div>
                </div>
            </button>`;
}