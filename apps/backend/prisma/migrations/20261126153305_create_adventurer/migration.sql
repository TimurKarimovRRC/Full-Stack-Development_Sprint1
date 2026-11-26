-- CreateTable
CREATE TABLE "Adventurer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "characterClass" TEXT NOT NULL,

    CONSTRAINT "Adventurer_pkey" PRIMARY KEY ("id")
);
