export interface GameSettings {
    theme: string,
    player: string,
    boardSize: number
}

export interface Card {
    id: number,
    source: string,
    flipped: boolean,
    matched: boolean
};