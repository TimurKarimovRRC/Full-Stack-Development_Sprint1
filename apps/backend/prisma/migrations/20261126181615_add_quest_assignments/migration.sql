-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "quest_assignments" (
    "id" SERIAL NOT NULL,
    "questId" INTEGER NOT NULL,
    "adventurerId" INTEGER NOT NULL,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "quest_assignments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quest_assignments" ADD CONSTRAINT "quest_assignments_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quest_assignments" ADD CONSTRAINT "quest_assignments_adventurerId_fkey" FOREIGN KEY ("adventurerId") REFERENCES "Adventurer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
