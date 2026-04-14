import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        settings: 'pages/settings.html',
        game: 'pages/game.html',
        gameOver: 'pages/game-over.html',
        gameEnded: 'pages/game-ended.html'
      }
    }
  }
});