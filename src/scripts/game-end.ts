import { GameSettings } from "../types/interfaces";
import { getElement } from "../utils/dom";

let gameSettings: GameSettings;

let finalScoreBlue: string;
let finalScoreOrange: string;

let body: HTMLBodyElement;
let finalScoreDisplayBlue: HTMLSpanElement;
let finalScoreDisplayOrange: HTMLSpanElement;
let winnerRef: HTMLHeadingElement;
let winnerHeadlineRef: HTMLHeadingElement;
let winnerImgRef: HTMLImageElement;


/**
 * Initializes the endscreen logic after the DOM has fully loaded.
 *
 * @remarks
 * Retrieves persisted scores, initializes required DOM references,
 * applies the selected theme, and determines which screen logic to execute
 * based on the current URL.
 */
document.addEventListener('DOMContentLoaded', () => {
    getSessionStorage();
    init();
    applyTheme();
    if(window.location.href.includes('game-over')) {
        displayFinalScore();
    } else {
        displayGameWinner();
    }
})

/**
 * Retrieves stored scores from session storage and assigns them to local state.
 *
 * @remarks
 * Falls back to "0" if no stored values are found to ensure safe parsing.
 */
function getSessionStorage() {
    const storedScoreBlue = sessionStorage.getItem('scoreBlue');
    const storedScoreOrange = sessionStorage.getItem('scoreOrange');
    finalScoreBlue = JSON.parse(storedScoreBlue || "0");
    finalScoreOrange = JSON.parse(storedScoreOrange || "0");
}

/**
 * Initializes required DOM references and loads game settings.
 *
 * @remarks
 * Winner-related elements are only resolved when the current page
 * corresponds to the final endscreen.
 */
function init() {
    body = getElement<HTMLBodyElement>('body');
    gameSettings = getGameSettings();
    if(window.location.href.includes('game-ended')){
        winnerRef = getElement<HTMLHeadingElement>('winner');
        winnerHeadlineRef = getElement<HTMLHeadingElement>('winner-headline');
        winnerImgRef = getElement<HTMLImageElement>('winner-img');
    }
}

/**
 * Retrieves the persisted game settings from session storage.
 *
 * @returns The stored game settings, or default values if none are available.
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
 * Applies the selected theme as a CSS class to the document body.
 *
 * @remarks
 * The theme string is normalized by converting it to lowercase
 * and removing whitespace before being applied as a class modifier.
 */
function applyTheme() {
    const theme = gameSettings.theme.toLocaleLowerCase().replace(/\s/g, "");
    body.classList.add(`theme-${theme}`);
}

/**
 * Determines and displays the game winner or draw state.
 *
 * @remarks
 * Compares final scores and delegates rendering logic
 * to either the draw handler or winner handler.
 */
function displayGameWinner() {
    const winner = finalScoreBlue > finalScoreOrange ? "blue" : "orange";
    const draw = finalScoreBlue == finalScoreOrange;
    if(draw) {
        handleDraw();
    } else {
        handleWinner(winner);
    }
}

/**
 * Handles UI updates for a draw outcome.
 *
 * @remarks
 * Applies draw-specific text, styling, and image based on the active theme.
 */
function handleDraw() {
    const isGamingTheme = gameSettings.theme === "Gaming Theme";
    winnerHeadlineRef.innerHTML = "It's a";
    winnerRef.innerHTML = "DRAW";
    winnerRef.classList.add('endscreen__headline--draw');
    winnerImgRef.src = isGamingTheme
        ? '../../assets/winner-gaming.png'
        : '../../assets/winner-draw.png';
}

/**
 * Handles UI updates for a winning player.
 *
 * @param winner - The winning player identifier ("blue" or "orange").
 *
 * @remarks
 * Adjusts displayed text and imagery depending on the active theme.
 * Applies additional styling when the orange player wins.
 */
function handleWinner(winner: "blue" | "orange") {
    const isGamingTheme = gameSettings.theme === "Gaming Theme";
    winnerRef.innerHTML = isGamingTheme
        ? (winner === "blue" ? "Blue Player" : "Orange Player")
        : winner.toUpperCase();
    winnerImgRef.src = isGamingTheme
        ? '../../assets/winner-gaming.png'
        : `../../assets/winner-${winner}.png`;
    if(winner === "orange") {
        winnerRef.classList.add('endscreen__headline--orange');
    }
}

/**
 * Displays the final score screen before transitioning to the winner screen.
 *
 * @remarks
 * Renders both player scores and redirects to the final endscreen
 * after a short delay. After navigation, the winner display is initialized.
 */
function displayFinalScore() {
    finalScoreDisplayBlue = getElement<HTMLSpanElement>('final-score-blue');
    finalScoreDisplayOrange = getElement<HTMLSpanElement>('final-score-orange');
    finalScoreDisplayBlue.innerHTML = finalScoreBlue;
    finalScoreDisplayOrange.innerHTML = finalScoreOrange;
    /* setTimeout(() => {
        window.location.href = "/src/pages/game-ended.html";
        init();
        displayGameWinner();
    }, 2000); */
}