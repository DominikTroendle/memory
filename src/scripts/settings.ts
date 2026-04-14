import { GameSettings } from '../types/interfaces';
import { getElement } from '../utils/dom';

let settings: GameSettings = {
    theme: "Code Vibes Theme",
    player: "Blue",
    boardSize: 16
};

let startButton: HTMLButtonElement;
let previewImage: HTMLImageElement;
let summaryList: HTMLUListElement;

const themeInputs = document.querySelectorAll<HTMLInputElement>('input[name="theme"]');
const playerInputs = document.querySelectorAll<HTMLInputElement>('input[name="player"]');
const boardInputs = document.querySelectorAll<HTMLInputElement>('input[name="board"]');

const themePreviewMap: Record<string, string> = {
    CodeVibesTheme: '../assets/theme-coding_preview.png',
    GamingTheme: '../assets/theme-gaming_preview.png'
}

document.addEventListener('DOMContentLoaded', () => {
    initElRefs();
    initSettings();
})

function initElRefs(){
    startButton = getElement<HTMLButtonElement>('button-start');
    previewImage = getElement<HTMLImageElement>('preview');
    summaryList = getElement<HTMLUListElement>('summary');
}

function initSettings(){
    startButton.addEventListener('click', () => {
        sessionStorage.setItem('gameSettings', JSON.stringify(settings));
        sessionStorage.removeItem('scoreBlue');
        sessionStorage.removeItem('scoreOrange');
    })
    themeInputs.forEach(input => {
        input.addEventListener('change', () => {
            settings.theme = input.value;
            updateSummary();
        });
    })
    playerInputs.forEach(input => {
        input.addEventListener('change', () => {
            settings.player = input.value;
            updateSummary();
        });
    })
    boardInputs.forEach(input => {
        input.addEventListener('change', () => {
            settings.boardSize = Number(input.value);
            updateSummary();
        });
    })
    updateSummary();
}

function updateSummary(){
    const theme = settings.theme.replace(/\s/g, "");
    previewImage.src = themePreviewMap[theme];
    summaryList.innerHTML = `
        <li>${settings.theme}</li>
        <li>${settings.player}</li>
        <li>${settings.boardSize} Cards</li>
        `
}