import { Card } from '../types/interfaces';
import { GameSettings } from '../types/interfaces';
import { getElement } from '../utils/dom';

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

let body: HTMLBodyElement;
let field: HTMLElement;
let player: HTMLElement;
let scoreDisplayBlue: HTMLSpanElement;
let scoreDisplayOrange: HTMLSpanElement;
let overlay: HTMLDialogElement;
let overlayCard: HTMLDivElement;
let exitButton: HTMLButtonElement;
let resumeButton: HTMLButtonElement;
let menuButton: HTMLButtonElement;

let gameSettings: GameSettings;
let currentPlayer: string;
let scoreOrange = 0;
let scoreBlue = 0;
let cards: Card[];
let currentlyFlipped: Card[] = [];

document.addEventListener('DOMContentLoaded', () => {
    gameSettings = getGameSettings();
    initElementRefs();
    initGame();
})

function initElementRefs() {
    body = getElement<HTMLBodyElement>('body');
    field = getElement<HTMLElement>('field');
    player = getElement<HTMLElement>('player');
    scoreDisplayBlue = getElement<HTMLSpanElement>('score-blue');
    scoreDisplayOrange = getElement<HTMLSpanElement>('score-orange');
    overlay = getElement<HTMLDialogElement>('overlay');
    overlayCard = getElement<HTMLDivElement>('card');
    exitButton = getElement<HTMLButtonElement>('exit');
    resumeButton = getElement<HTMLButtonElement>('resume');
    menuButton = getElement<HTMLButtonElement>('menu');
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
    renderField();
    addCardFunction();
    addOverlayFunctions();
}

function setPlayer() {
    if(gameSettings.player == "Orange"){
        player.classList.remove('game__player--blue');
        player.classList.add('game__player--orange');
        currentPlayer = "orange";
    } else {
        currentPlayer = "blue";
    }
}

function renderField() {
    if(gameSettings.boardSize > 16){
        field.classList.remove('game__field--small');
        field.classList.add('game__field--large');
    }
    for(let i = 0; i < cards.length; i++){
        field.innerHTML += returnCardHTML(cards[i].id, cards[i].source);
    }
}

function returnCardHTML(id: number, src: string) {
    return `<button class="card" id=${id}>
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

function addCardFunction() {
    const allCards = document.querySelectorAll<HTMLButtonElement>('.card');
    allCards.forEach(e => {
        e.addEventListener('click', e => {
            const card = e.currentTarget as HTMLButtonElement;
            const id = Number(card.id);
            flipCard(card, id);
            checkMatch();
        })
    });
}

function addOverlayFunctions() {
    exitButton.addEventListener('click', () => {
        openOverlay();
    });
    resumeButton.addEventListener('click', () => {
        closeOverlay();
    });
    menuButton.addEventListener('click', () => {
        window.location.href = "/memory/pages/settings.html";
    });
}

function openOverlay() {
    overlay.showModal();
    setTimeout(() => {
        overlayCard.classList.add('overlay__card--show');
        body.classList.add('no-scroll');
    }, 20);
}

function closeOverlay() {
    overlay.close();
    overlayCard.classList.remove('overlay__card--show');
    body.classList.remove('no-scroll');
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

function flipCard(card: HTMLButtonElement, id: number) {
    const currentCard = cards[id];
    if(currentCard.matched || currentCard.flipped) return;
    if(!currentCard.flipped) currentCard.flipped = true;
    if(currentCard.flipped) currentlyFlipped.push(currentCard);
    card.classList.toggle('is-flipped');
}

function checkMatch() {
    if(currentlyFlipped.length != 2) return;
    if(currentlyFlipped[0].source == currentlyFlipped[1].source) {
        currentlyFlipped[0].matched = true;
        currentlyFlipped[1].matched = true;
        updateScore();
    } else {
        resetCards();
        switchPlayer();
    }
    currentlyFlipped = [];
    checkGameEnd();
}

function resetCards() {
    setTimeout(() => {
        cards.forEach(e => {
            const card = document.getElementById(String(e.id));
            if(e.flipped && !e.matched) {
                card?.classList.remove('is-flipped');
                e.flipped = !e.flipped;
            }
        });
    }, 500);
}

function updateScore() {
    if(currentPlayer == "orange") {
        scoreOrange += 1;
    } else {
        scoreBlue += 1;
    }
    scoreDisplayBlue.innerHTML = String(scoreBlue);
    scoreDisplayOrange.innerHTML = String(scoreOrange);
}

function switchPlayer() {
    setTimeout(() => {
        player.classList.remove(`game__player--${currentPlayer}`);
        currentPlayer = currentPlayer === "orange" ? "blue" : "orange";
        player.classList.add(`game__player--${currentPlayer}`);
    }, 500);
}

function checkGameEnd() {
    const totalScore = scoreBlue + scoreOrange;
    const maxScore = gameSettings.boardSize / 2;
    if(totalScore != maxScore) {
        return;
    } else {
        setTimeout(() => {
            sessionStorage.setItem('scoreBlue', JSON.stringify(scoreBlue));
            sessionStorage.setItem('scoreOrange', JSON.stringify(scoreOrange));
            window.location.href = "/memory/pages/game-ended.html";
        }, 1000);
    }
}