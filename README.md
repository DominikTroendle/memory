# 🧠 Memory Game

A browser-based memory card game built with **TypeScript**, **SCSS**, and **Vite**.
The project focuses on modular frontend architecture, type-safe logic, and interactive gameplay.

---

## Live Demo

[Play the game](https://memory.dominik-troendle.de)

---

## 🚀 Features

* Multiple **themes** with dynamic styling and preview
* Configurable **board sizes**
* Two-player mode with **turn-based logic**
* **Score tracking** with persistent session storage
* Animated **card flipping and matching**
* Endscreen with **winner/draw detection**
* Overlay system for **pause / exit handling**

---

## 🛠 Tech Stack

* **TypeScript** – type-safe application logic
* **SCSS** – modular and maintainable styling
* **Vite** – fast development environment
* **HTML5** – semantic structure
* **Session Storage API** – state persistence between pages

---

## Getting Started

### Prerequisites

* Node.js
* npm

### Installation

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Preview production build

```bash
npm run preview
```

---

## Project Structure

```text
src/
├── config/        # Static configuration such as themes and assets
├── types/         # TypeScript interfaces and types
├── utils/         # Helper utilities
├── pages/         # Page-specific application logic
├── styles/        # SCSS structure and styling
```

---

## 🎮 Game Flow

1. Select:

   * Theme
   * Starting player
   * Board size
2. Start the game
3. Players take turns flipping cards:

   * Match → score point + continue turn
   * No match → cards reset + switch player
4. Game ends when all pairs are found
5. Final scores and winner are displayed

---

## 📂 Project Structure

```
src/
├── config/        # Static configuration (themes, assets)
├── types/         # TypeScript interfaces
├── utils/         # Helper functions (DOM utilities, etc.)
├── pages/         # Page-specific logic (settings, game, endscreen)
├── styles/        # SCSS structure
```

---

## ⚙️ Configuration

Game settings are stored in `sessionStorage`:

```ts
{
  theme: string,
  player: string,
  boardSize: number
}
```

Scores are also persisted during navigation:

* `scoreBlue`
* `scoreOrange`

---

## 🧩 Key Concepts

* **State-driven rendering** via a central `cards` array
* Separation of:

  * UI logic
  * game logic
  * configuration
* Controlled DOM access via utility helpers
* Type-safe validation using TypeScript (e.g. custom type guards)

---

## 📈 Possible Improvements

* Add single-player mode with AI
* Persist scores across sessions (localStorage / backend)
* Add animations with a dedicated library
* Improve accessibility (ARIA, keyboard navigation)
* Add unit tests for game logic

---

## 📸 Preview

![Memory Game Preview](/assets/preview-github.png)