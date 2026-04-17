import { themeImages } from '../config/theme-images';
import { Card } from '../types/interfaces';
import { GameSettings } from '../types/interfaces';
import { getElement } from '../utils/dom';

let bgImages: readonly string[];

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
let isAnimated = false;

/**
 * Initializes the game once the DOM has finished loading.
 * Loads game settings, resolves required DOM references, and starts the game setup.
 */
document.addEventListener('DOMContentLoaded', () => {
    gameSettings = getGameSettings();
    initElementRefs();
    initGame();
})

/**
 * Resolves and stores all required DOM element references used throughout the game.
 *
 * @remarks
 * This function assumes that all required elements exist in the DOM.
 * The imported `getElement` utility is responsible for throwing an error
 * if an expected element cannot be found.
 */
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

/**
 * Retrieves the persisted game settings from session storage.
 *
 * @returns The previously saved game settings, or a default configuration
 * if no session data is available.
 */
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

/**
 * Performs the full game setup sequence.
 *
 * @remarks
 * This function applies the selected theme, initializes the active player,
 * creates the card data model, renders the playing field, and binds all
 * required event listeners for gameplay and overlay interaction.
 */
function initGame() {
    applyTheme();
    setPlayer();
    bgImages = themeImages[gameSettings.theme];
    cards = createCardArray();
    renderField();
    addCardFunction();
    addOverlayFunctions();
}

/**
 * Applies the selected theme as a CSS class to the document body.
 *
 * @remarks
 * Theme names are normalized to lowercase and stripped of whitespace
 * before being converted into a CSS modifier class.
 */
function applyTheme() {
    const theme = gameSettings.theme.toLocaleLowerCase().replace(/\s/g, "");
    body.classList.add(`theme-${theme}`);
}

/**
 * Initializes the active player state and updates the player indicator styling.
 *
 * @remarks
 * If the selected starting player is orange, the corresponding CSS modifier
 * class is applied immediately. Otherwise, blue remains the default state.
 */
function setPlayer() {
    if(gameSettings.player == "Orange"){
        player.classList.remove('game__player--blue');
        player.classList.add('game__player--orange');
        currentPlayer = "orange";
    } else {
        currentPlayer = "blue";
    }
}

/**
 * Renders all cards into the game field based on the current card state array.
 *
 * @remarks
 * Applies a larger field layout modifier when the configured board size
 * exceeds 16 cards.
 */
function renderField() {
    if(gameSettings.boardSize > 16){
        field.classList.remove('game__field--small');
        field.classList.add('game__field--large');
    }
    for(let i = 0; i < cards.length; i++){
        field.innerHTML += returnCardHTML(cards[i].id, cards[i].source);
    }
}

/**
 * Creates the HTML string representation for a single memory card.
 *
 * @param id - Unique card identifier used for DOM lookup and state mapping.
 * @param src - Relative image source file name used for the card back.
 * @returns HTML markup for a single card button element.
 */
function returnCardHTML(id: number, src: string) {
    return `<button class="card" id=${id}>
                <div class="card__inner">
                    <div class="card__face"></div>
                    <div
                        class="card__face
                        card__face--back"
                        style="background-image: url('../../assets/${src}')"
                    ></div>
                </div>
            </button>`;
}

/**
 * Attaches click event listeners to all rendered card elements.
 *
 * @remarks
 * On each click, the selected card is flipped and the current pair is evaluated
 * for a match once two cards are active.
 */
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

/**
 * Attaches all event listeners related to the game overlay controls.
 *
 * @remarks
 * The exit button opens the confirmation dialog.
 * The resume button closes it.
 * The menu button persists scores and navigates back to the settings page.
 */
function addOverlayFunctions() {
    exitButton.addEventListener('click', () => {
        openOverlay();
    });
    resumeButton.addEventListener('click', () => {
        closeOverlay();
    });
    menuButton.addEventListener('click', () => {
        sessionStorage.setItem('scoreBlue', JSON.stringify(scoreBlue));
        sessionStorage.setItem('scoreOrange', JSON.stringify(scoreOrange));
        window.location.href = "/src/pages/settings.html";
    });
}

/**
 * Opens the exit confirmation overlay and triggers its entrance animation.
 *
 * @remarks
 * A small timeout is used so the CSS transition class is applied
 * after the dialog has been rendered.
 */
function openOverlay() {
    overlay.showModal();
    setTimeout(() => {
        overlayCard.classList.add('overlay__card--show');
        body.classList.add('no-scroll');
    }, 20);
}

/**
 * Closes the exit confirmation overlay and removes related UI state classes.
 */
function closeOverlay() {
    overlay.close();
    overlayCard.classList.remove('overlay__card--show');
    body.classList.remove('no-scroll');
}

/**
 * Creates the card data model for the current game round.
 *
 * @returns A shuffled array of card objects containing duplicated image pairs.
 *
 * @remarks
 * The number of unique images is derived from half the configured board size.
 * Each selected image is duplicated once to create a matching pair.
 */
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

/**
 * Randomly shuffles an array in place using the Fisher-Yates algorithm.
 *
 * @param array - Array of image file names to shuffle.
 * @returns The same array instance in shuffled order.
 */
function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Flips a card and stores its state in the currently active selection.
 *
 * @param card - The clicked card button element.
 * @param id - The card's unique identifier used to resolve its state object.
 *
 * @remarks
 * Cards that are already matched or already flipped are ignored.
 */
function flipCard(card: HTMLButtonElement, id: number) {
    const currentCard = cards[id];
    if(currentCard.matched || currentCard.flipped || isAnimated) return;
    if(!currentCard.flipped) currentCard.flipped = true;
    if(currentCard.flipped) currentlyFlipped.push(currentCard);
    card.classList.toggle('is-flipped');
}

/**
 * Evaluates the two currently flipped cards and applies the corresponding game logic.
 *
 * @remarks
 * If both cards match, they are marked as matched and the current player's
 * score is increased. Otherwise, both cards are reset and the active player changes.
 * After evaluation, the temporary flip selection is cleared and the game end
 * condition is checked.
 */
function checkMatch() {
    if(currentlyFlipped.length != 2) return;
    isAnimated = true;
    const [card1, card2] = currentlyFlipped;
    if(card1.source == card2.source) {
        card1.matched = true;
        card2.matched = true;
        applyMatchedClass([card1.id, card2.id]);
        updateScore();
        isAnimated = false;
    } else {
        resetCards();
        switchPlayer();
    }
    currentlyFlipped = [];
    checkGameEnd();
}

/**
 * Applies a player-specific matched-card CSS class to the given cards.
 *
 * @param cardIds - IDs of the matched cards that should receive the visual state.
 *
 * @remarks
 * The class assignment is slightly delayed to allow the flip animation
 * to complete first.
 */
function applyMatchedClass(cardIds: number[]) {
    cardIds.forEach(id => {
        const el = document.getElementById(String(id));
        setTimeout(() => {
            el?.classList.add(`card__matched--${currentPlayer}`);
        }, 150);
    });
}

/**
 * Resets all non-matched flipped cards back to their hidden state.
 *
 * @remarks
 * The reset is delayed to give the player time to view the mismatched pair.
 */
function resetCards() {
    setTimeout(() => {
        cards.forEach(e => {
            const card = document.getElementById(String(e.id));
            if(e.flipped && !e.matched) {
                card?.classList.remove('is-flipped');
                e.flipped = !e.flipped;
            }
        });
        isAnimated = false;
    }, 500);
}

/**
 * Increments the score of the currently active player
 * and updates both score display elements in the UI.
 */
function updateScore() {
    if(currentPlayer == "orange") {
        scoreOrange += 1;
    } else {
        scoreBlue += 1;
    }
    scoreDisplayBlue.innerHTML = String(scoreBlue);
    scoreDisplayOrange.innerHTML = String(scoreOrange);
}

/**
 * Switches the active player and updates the visual player indicator.
 *
 * @remarks
 * The player switch is delayed to stay synchronized with the mismatch reset timing.
 */
function switchPlayer() {
    setTimeout(() => {
        player.classList.remove(`game__player--${currentPlayer}`);
        currentPlayer = currentPlayer === "orange" ? "blue" : "orange";
        player.classList.add(`game__player--${currentPlayer}`);
    }, 500);
}

/**
 * Checks whether all pairs have been found and ends the game if so.
 *
 * @remarks
 * When the game ends, both player scores are persisted to session storage
 * and the user is redirected to the game-over page after a short delay.
 */
function checkGameEnd() {
    const totalScore = scoreBlue + scoreOrange;
    const maxScore = gameSettings.boardSize / 2;
    if(totalScore != maxScore) {
        return;
    } else {
        setTimeout(() => {
            sessionStorage.setItem('scoreBlue', JSON.stringify(scoreBlue));
            sessionStorage.setItem('scoreOrange', JSON.stringify(scoreOrange));
            window.location.href = "/src/pages/game-over.html";
        }, 1000);
    }
}