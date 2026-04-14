export const themeImages = {
    "Code Vibes Theme": [
        'angular-icon.png',
        'bootstrap-icon.png',
        'css-icon.png',
        'django-icon.png',
        'firebase-icon.png',
        'github-icon.png',
        'git-icon.png',
        'html-icon.png',
        'js-icon.png',
        'nodejs-icon.png',
        'python-icon.png',
        'react-icon.png',
        'sass-icon.png',
        'sql-icon.png',
        'terminal-icon.png',
        'ts-icon.png',
        'vscode-icon.png',
        'vue-icon.png'
    ],
    "Gaming Theme": [
        'ace-icon.png',
        'banana-icon.png',
        'coin-icon.png',
        'controller-icon.png',
        'creeper-icon.png',
        'dices-icon.png',
        'gameboy-icon.png',
        'jigsaw-icon.png',
        'level-up-icon.png',
        'maze-icon.png',
        'pacman-colored-icon.png',
        'pacman-icon.png',
        'play-icon.png',
        'snake-icon.png',
        'squidgame1-icon.png',
        'squidgame2-icon.png',
        'squidgame3-icon.png',
        'toad-icon.png'
    ]
} as const;

export type Theme = keyof typeof themeImages;