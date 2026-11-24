-- CreateEnum
CREATE TYPE "QuestDifficulty" AS ENUM ('Easy', 'Medium', 'Hard', 'Expert');

-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Adventurer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Adventurer_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "quest-assignments" (
    "id" SERIAL NOT NULL,
    "questId" INTEGER NOT NULL,
    "adventurerId" INTEGER NOT NULL,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "quest-assignments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quest-assignments" ADD CONSTRAINT "quest-assignments_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quest-assignments" ADD CONSTRAINT "quest-assignments_adventurerId_fkey" FOREIGN KEY ("adventurerId") REFERENCES "Adventurer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
