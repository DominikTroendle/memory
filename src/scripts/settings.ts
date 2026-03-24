interface GameSettings {
    theme: string,
    player: string,
    boardSize: number
}

let settings: GameSettings = {
    theme: "Code Vibes Theme",
    player: "Blue",
    boardSize: 16
};

const startButton = document.getElementById('button-start');

const previewImage = document.querySelector<HTMLImageElement>('.settings__preview');
const summaryList = document.querySelector('.settings__summary ul');

const themeInputs = document.querySelectorAll<HTMLInputElement>('input[name="theme"]');
const playerInputs = document.querySelectorAll<HTMLInputElement>('input[name="player"]');
const boardInputs = document.querySelectorAll<HTMLInputElement>('input[name="board"]');

const themePreviewMap: Record<string, string> = {
    CodeVibesTheme: '../assets/theme-coding_preview.png',
    GamingTheme: '../assets/theme-gaming_preview.png',
    DAProjectsTheme: '../assets/theme-projects_preview.png'
}

document.addEventListener('DOMContentLoaded', () => {
    initSettings();
})

startButton?.addEventListener('click', () => {
    sessionStorage.setItem('gameSettings', JSON.stringify(settings));
})

function initSettings(){
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
    if(previewImage){
        const theme = settings.theme.replace(/\s/g, "");
        previewImage.src = themePreviewMap[theme];
    }
    if(summaryList){
        summaryList.innerHTML = `
            <li>${settings.theme}</li>
            <li>${settings.player}</li>
            <li>${settings.boardSize} Cards</li>
            `
    }
}