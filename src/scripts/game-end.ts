import { GameSettings } from "../types/interfaces";
import { getElement } from "../utils/dom";

let gameSettings: GameSettings;

let finalScoreBlue: string;
let finalScoreOrange: string;

let body: HTMLBodyElement;
let finalScoreDisplayBlue: HTMLSpanElement;
let finalScoreDisplayOrange: HTMLSpanElement;
let winnerRef: HTMLHeadingElement;
let winnerImgRef: HTMLImageElement;

document.addEventListener('DOMContentLoaded', () => {
    getSessionStorage();
    init();
    applyTheme();
    if(window.location.href.includes('game-ended')){
        displayGameWinner();
    } else {
        displayFinalScore();
    }
})

function getSessionStorage() {
    const storedScoreBlue = sessionStorage.getItem('scoreBlue');
    const storedScoreOrange = sessionStorage.getItem('scoreOrange');
    finalScoreBlue = JSON.parse(storedScoreBlue || "0");
    finalScoreOrange = JSON.parse(storedScoreOrange || "0");
}

function init() {
    body = getElement<HTMLBodyElement>('body');
    winnerRef = getElement<HTMLHeadingElement>('winner');
    winnerImgRef = getElement<HTMLImageElement>('winner-img');
    gameSettings = getGameSettings();
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

function applyTheme() {
    const theme = gameSettings.theme.toLocaleLowerCase().replace(/\s/g, "");
    body.classList.add(`theme-${theme}`);
}

function displayGameWinner() {
    if(finalScoreBlue < finalScoreOrange) {
        winnerRef.innerHTML = "ORANGE";
        winnerRef.classList.add('endscreen__headline--orange');
        winnerImgRef.src = "../assets/winner-orange.png";
    }
}

function displayFinalScore() {
    finalScoreDisplayBlue = getElement<HTMLSpanElement>('final-score-blue');
    finalScoreDisplayOrange = getElement<HTMLSpanElement>('final-score-orange');
    finalScoreDisplayBlue.innerHTML = finalScoreBlue;
    finalScoreDisplayOrange.innerHTML = finalScoreOrange;
}