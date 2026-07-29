# 🎬 Bollywood Quiz App

An interactive, multi-mode Bollywood trivia application built with a modern React Native monorepo stack.

---

## 🎮 Game Modes

| Mode | Name                | Description                                                           |
| :--- | :------------------ | :-------------------------------------------------------------------- |
| 👁️   | **Blurred Poster**  | Uncover and guess the classic movie poster as it sharpens!            |
| 😊   | **Emoji Riddles**   | Decode the movie title hidden inside visual emoji combinations.       |
| 🧩   | **Letter Puzzle**   | Drag, drop, and unscramble letters to spell the movie name.           |
| 💬   | **Dialogue Guru**   | Identify iconic movie lines with built-in Hindi Text-to-Speech audio! |
| 🎯   | **Spot the Exact**  | Pick the genuine movie title among tricky misspelled options.         |
| ✍️   | **Missing Letters** | Test your knowledge by filling in missing blanks in movie titles.     |

---

## 🛠️ Prerequisites

Before getting started, ensure you have the following installed on your machine:

- **Node.js**: `v20.19.4` or higher
- **pnpm**: `10.34.1` or higher (`npm install -g pnpm`)
- **Docker & Docker Desktop**: For local database containerization
- **Android Studio / Xcode**: For mobile emulators and native development

---

## 🚀 Getting Started

Follow these steps in order to set up your local development environment:

### 1. Install Dependencies

```bash
pnpm install

# Start Docker database container
pnpm docker:up

# Generate Prisma Client
pnpm prisma:generate

# Run database migrations
pnpm prisma:migrate

# Seed database with initial game data
pnpm prisma:seed

## Start backend

pnpm backend:serve

## Start android application

pnpm mobile:android

# Install iOS pods (first time or when adding native dependencies)
cd apps/mobile/ios && pod install && cd ../../..

# Start iOS application
pnpm mobile:ios
```
