interface Card {
    id: number,
    source: string,
    flipped: boolean,
    matched: boolean
};

const bgImages = [
    'angular-icon.png',
    'bootstrap-icon.png',
    'css-icon.png',
    'django-icon.png',
    'firebase-icon.png',
    'github-icon.png',
    'git-icon.png',
    'html-icon.png',
    'js-icon.png',
    'nodejs-icon.png',
    'python-icon.png',
    'react-icon.png',
    'sass-icon.png',
    'sql-icon.png',
    'terminal-icon.png',
    'ts-icon.png',
    'vscode-icon.png',
    'vue-icon.png'
];
const player = document.querySelector('.current-player');

let field: HTMLElement;
let gameSettings: GameSettings;
let currentPlayer: string;
let cards: Card[];
let isFlipped = false;
let isMatched = false;

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
    setPlayer();
    cards = createCardArray();
    renderCards();
    addCardAnimation();
}

function setPlayer() {
    if(player && gameSettings.player == "Orange"){
        player.classList.remove('game__player--blue');
        player.classList.add('game__player--orange');
    }
}

function renderCards() {
    if(gameSettings.boardSize > 16){
        field.classList.remove('game__field--small');
        field.classList.add('game__field--large');
    }
    for(let i = 0; i < cards.length; i++){
        field.innerHTML += returnCardHTML(cards[i].id, cards[i].source);
    }
}

function returnCardHTML(id: number, src: string) {
    return `<button class="card" data-id=${id}>
                <div class="card__inner">
                    <div class="card__face"></div>
                    <div
                        class="card__face
                        card__face--back"
                        style="background-image: url('../assets/${src}')"
                    ></div>
                </div>
            </button>`;
}

function addCardAnimation() {
    field.addEventListener('click', e => {
        const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement;
        card.classList.toggle('is-flipped');
    });
}

function createCardArray() {
    const neededCards = gameSettings.boardSize / 2;
    const selectedImages = bgImages.slice(0, neededCards);
    const cardImages = [...selectedImages, ...selectedImages];
    return shuffle(cardImages).map((image, index) => ({
        id: index,
        source: image,
        flipped: false,
        matched: false
    }));
}

function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}