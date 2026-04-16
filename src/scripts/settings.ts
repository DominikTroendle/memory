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

/**
 * Initializes the settings page after the DOM has loaded.
 *
 * @remarks
 * Resolves DOM references and sets up event listeners
 * for user interaction.
 */
document.addEventListener('DOMContentLoaded', () => {
    initElRefs();
    initSettings();
})

/**
 * Resolves and stores required DOM element references.
 *
 * @remarks
 * Uses a utility helper to ensure elements exist,
 * preventing null-reference issues during runtime.
 */
function initElRefs(){
    startButton = getElement<HTMLButtonElement>('button-start');
    previewImage = getElement<HTMLImageElement>('preview');
    summaryTheme = getElement<HTMLLIElement>('summary-theme');
    summaryPlayer = getElement<HTMLLIElement>('summary-player');
    summaryBoard = getElement<HTMLLIElement>('summary-board');
}

/**
 * Initializes core settings behavior and event bindings.
 *
 * @remarks
 * Attaches the start button handler to persist settings
 * and clears any previous score data before starting a new game.
 */
function initSettings(){
    startButton.addEventListener('click', () => {
        sessionStorage.setItem('gameSettings', JSON.stringify(settings));
        sessionStorage.removeItem('scoreBlue');
        sessionStorage.removeItem('scoreOrange');
    })
    initInputs();
}

/**
 * Attaches change event listeners to all input groups.
 *
 * @remarks
 * Each input group updates the corresponding setting,
 * applies selection styling, and refreshes the summary display.
 */
function initInputs(){
    themeInputs.forEach(input => {
        input.addEventListener('change', () => {
            if(isTheme(input.value)) settings.theme = input.value;
            toggleSelected(input, themeInputs);
            updateSummary(summaryTheme, 'theme');
        });
    })
    playerInputs.forEach(input => {
        input.addEventListener('change', () => {
            settings.player = input.value;
            toggleSelected(input, playerInputs);
            updateSummary(summaryPlayer, 'player');
        });
    })
    boardInputs.forEach(input => {
        input.addEventListener('change', () => {
            settings.boardSize = Number(input.value);
            toggleSelected(input, boardInputs);
            updateSummary(summaryBoard, 'boardSize');
        });
    })
}

/**
 * Type guard to validate whether a given string is a valid theme key.
 *
 * @param value - The input value to validate.
 * @returns True if the value exists in the themeImages map.
 */
function isTheme(value: string): value is Theme {
    return value in themeImages;
}

/**
 * Applies a visual "selected" state to the active input option.
 *
 * @param input - The currently selected input element.
 * @param allInputs - Collection of all inputs within the same group.
 *
 * @remarks
 * Removes the selected state from all inputs before applying it
 * to the current selection.
 */
function toggleSelected(input: HTMLInputElement, allInputs: NodeListOf<HTMLInputElement>){
    allInputs.forEach(i =>
        i.parentElement?.classList.remove('selected')
    );
    input.parentElement?.classList.add('selected');
}

/**
 * Updates the summary display and preview image based on current settings.
 *
 * @param element - The summary list item to update.
 * @param key - The settings key that has changed.
 *
 * @remarks
 * Also updates the theme preview image and enables the start button
 * once all required inputs are selected.
 */
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

/**
 * Validates whether all required input groups have a selected value.
 *
 * @returns True if theme, player, and board size are all selected.
 *
 * @remarks
 * Used to determine whether the start button should be enabled.
 */
function inputsValid(): boolean{
    const themeSelected = Array.from(themeInputs).some(input => input.checked);
    const playerSelected = Array.from(playerInputs).some(input => input.checked);
    const boardSelected = Array.from(boardInputs).some(input => input.checked);
    return themeSelected && playerSelected && boardSelected;
}