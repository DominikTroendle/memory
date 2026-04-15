import { themeImages, Theme } from '../config/theme-images';
import { GameSettings } from '../types/interfaces';
import { getElement } from '../utils/dom';

let settings: GameSettings = {
    theme: "Code Vibes Theme",
    player: "Blue",
    boardSize: 16
};

let startButton: HTMLButtonElement;
let previewImage: HTMLImageElement;
let summaryTheme: HTMLLIElement;
let summaryPlayer: HTMLLIElement;
let summaryBoard: HTMLLIElement;

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
    summaryTheme = getElement<HTMLLIElement>('summary-theme');
    summaryPlayer = getElement<HTMLLIElement>('summary-player');
    summaryBoard = getElement<HTMLLIElement>('summary-board');
}

function initSettings(){
    startButton.addEventListener('click', () => {
        sessionStorage.setItem('gameSettings', JSON.stringify(settings));
        sessionStorage.removeItem('scoreBlue');
        sessionStorage.removeItem('scoreOrange');
    })
    initInputs();
}

function initInputs(){
    themeInputs.forEach(input => {
        input.addEventListener('change', () => {
            if(isTheme(input.value)) settings.theme = input.value;
            updateSummary(summaryTheme, 'theme');
        });
    })
    playerInputs.forEach(input => {
        input.addEventListener('change', () => {
            settings.player = input.value;
            updateSummary(summaryPlayer, 'player');
        });
    })
    boardInputs.forEach(input => {
        input.addEventListener('change', () => {
            settings.boardSize = Number(input.value);
            updateSummary(summaryBoard, 'boardSize');
        });
    })
}

function isTheme(value: string): value is Theme {
    return value in themeImages;
}

function updateSummary(element: HTMLLIElement, key: keyof GameSettings){
    const theme = settings.theme.replace(/\s/g, "");
    previewImage.src = themePreviewMap[theme];
    if(key === "boardSize"){
        element.innerHTML = `${settings[key]} Cards`;
    } else {
        element.innerHTML = `${settings[key]}`;
    }
    if(inputsValid()) startButton.classList.remove('button--disabled');
}

function inputsValid(): boolean{
    const themeSelected = Array.from(themeInputs).some(input => input.checked);
    const playerSelected = Array.from(playerInputs).some(input => input.checked);
    const boardSelected = Array.from(boardInputs).some(input => input.checked);
    return themeSelected && playerSelected && boardSelected;
}