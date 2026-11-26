-- CreateEnum
CREATE TYPE "QuestDifficulty" AS ENUM ('Easy', 'Medium', 'Hard', 'Expert');

-- CreateTable
CREATE TABLE "Quest" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "difficulty" "QuestDifficulty" NOT NULL,
    "description" TEXT NOT NULL,
    "reward" TEXT NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);
