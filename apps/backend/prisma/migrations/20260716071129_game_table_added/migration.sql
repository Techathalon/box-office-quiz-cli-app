-- CreateEnum
CREATE TYPE "GameMode" AS ENUM ('BLURRED_POSTER', 'EMOJI_RIDDLES', 'LETTER_PUZZLE', 'DIALOGUE_GURU', 'SPOT_THE_EXACT', 'MISSING_LETTERS');

-- CreateTable
CREATE TABLE "UserGameProgress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "mode" "GameMode" NOT NULL,
    "currentLevel" INTEGER NOT NULL DEFAULT 1,
    "levelsWon" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "levelsLost" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGameProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "mode" "GameMode" NOT NULL,
    "levelNumber" INTEGER NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserGameProgress_userId_mode_key" ON "UserGameProgress"("userId", "mode");

-- CreateIndex
CREATE UNIQUE INDEX "Question_mode_levelNumber_key" ON "Question"("mode", "levelNumber");

-- AddForeignKey
ALTER TABLE "UserGameProgress" ADD CONSTRAINT "UserGameProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
