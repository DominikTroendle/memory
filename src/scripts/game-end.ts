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
    gameSettings = getGameSettings();
    if(window.location.href.includes('game-ended')){
        winnerRef = getElement<HTMLHeadingElement>('winner');
        winnerHeadlineRef = getElement<HTMLHeadingElement>('winner-headline');
        winnerImgRef = getElement<HTMLImageElement>('winner-img');
    }
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
    const winner = finalScoreBlue > finalScoreOrange ? "blue" : "orange";
    const draw = finalScoreBlue == finalScoreOrange;
    const isGamingTheme = gameSettings.theme === "Gaming Theme";
    if(draw) {
        winnerHeadlineRef.innerHTML = "It's a";
        winnerRef.innerHTML = "DRAW";
        winnerRef.classList.add('endscreen__headline--draw');
        winnerImgRef.src = isGamingTheme ? '../assets/winner-gaming.png' : '../assets/winner-draw.png';
        return;
    }
    if(isGamingTheme) {
        winnerRef.innerHTML = winner === "blue" ? "Blue Player" : "Orange Player";
        winnerImgRef.src = "../assets/winner-gaming.png";
    } else {
        winnerRef.innerHTML = winner.toUpperCase();
        winnerImgRef.src = `../assets/winner-${winner}.png`;
    }
    if(winner === "orange") {
        winnerRef.classList.add('endscreen__headline--orange');
    }
}

function displayFinalScore() {
    finalScoreDisplayBlue = getElement<HTMLSpanElement>('final-score-blue');
    finalScoreDisplayOrange = getElement<HTMLSpanElement>('final-score-orange');
    finalScoreDisplayBlue.innerHTML = finalScoreBlue;
    finalScoreDisplayOrange.innerHTML = finalScoreOrange;
}