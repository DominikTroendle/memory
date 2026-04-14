import { Theme } from "../config/theme-images"

export interface GameSettings {
    theme: Theme,
    player: string,
    boardSize: number
}

export interface Card {
    id: number,
    source: string,
    flipped: boolean,
    matched: boolean
};