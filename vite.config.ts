import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        settings: 'src/pages/settings.html',
        game: 'src/pages/game.html',
        gameOver: 'src/pages/game-over.html',
        gameEnded: 'src/pages/game-ended.html'
      }
    }
  }
});