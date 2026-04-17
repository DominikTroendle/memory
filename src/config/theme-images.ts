export const themeImages = {
    "Code Vibes Theme": [
        'angular-icon.svg',
        'bootstrap-icon.svg',
        'css-icon.svg',
        'django-icon.svg',
        'firebase-icon.svg',
        'github-icon.svg',
        'git-icon.svg',
        'html-icon.svg',
        'js-icon.svg',
        'nodejs-icon.svg',
        'python-icon.svg',
        'react-icon.svg',
        'sass-icon.svg',
        'sql-icon.svg',
        'terminal-icon.svg',
        'ts-icon.svg',
        'vscode-icon.svg',
        'vue-icon.svg'
    ],
    "Gaming Theme": [
        'ace-icon.svg',
        'banana-icon.svg',
        'coin-icon.svg',
        'controller-icon.svg',
        'creeper-icon.svg',
        'dices-icon.svg',
        'gameboy-icon.svg',
        'jigsaw-icon.svg',
        'level-up-icon.svg',
        'maze-icon.svg',
        'pacman-colored-icon.svg',
        'pacman-icon.svg',
        'play-icon.svg',
        'snake-icon.svg',
        'squidgame1-icon.svg',
        'squidgame2-icon.svg',
        'squidgame3-icon.svg',
        'toad-icon.svg'
    ]
} as const;

export type Theme = keyof typeof themeImages;