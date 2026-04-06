let finalScoreBlue: string;
let finalScoreOrange: string;

let finalScoreDisplayBlue: HTMLSpanElement;
let finalScoreDisplayOrange: HTMLSpanElement;
let winnerRef: HTMLHeadingElement;
let winnerImgRef: HTMLImageElement;

document.addEventListener('DOMContentLoaded', () => {
    getSessionStorage();
    init();
    if(window.location.href.includes('game-ended')){
        displayGameWinner();
    } else {
        displayFinalScore();
    }
})

function init() {
    finalScoreDisplayBlue = document.getElementById('final-score-blue') as HTMLSpanElement;
    finalScoreDisplayOrange = document.getElementById('final-score-orange') as HTMLSpanElement;
    winnerRef = document.getElementById('winner') as HTMLHeadingElement;
    winnerImgRef = document.getElementById('winner-img') as HTMLImageElement;
}

function getSessionStorage() {
    const storedScoreBlue = sessionStorage.getItem('scoreBlue');
    const storedScoreOrange = sessionStorage.getItem('scoreOrange');
    finalScoreBlue = JSON.parse(storedScoreBlue || "0");
    finalScoreOrange = JSON.parse(storedScoreOrange || "0");
}

function displayGameWinner() {
    if(finalScoreBlue < finalScoreOrange) {
        winnerRef.innerHTML = "ORANGE";
        winnerRef.classList.add('endscreen__headline--orange');
        winnerImgRef.src = "../assets/winner-orange.png";
    }
}

function displayFinalScore() {
    finalScoreDisplayBlue.innerHTML = finalScoreBlue;
    finalScoreDisplayOrange.innerHTML = finalScoreOrange;
}