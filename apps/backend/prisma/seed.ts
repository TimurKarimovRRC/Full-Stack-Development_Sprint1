import { PrismaClient, QuestDifficulty as PrismaQuestDifficulty } from "@prisma/client";
import { questTestData } from "../../../shared/data/quests.js";

const prisma = new PrismaClient();

async function seedQuests() {
    for (const quest of questTestData) {
        await prisma.quest.upsert({
            where: { id: quest.id },
            create: {
                ...quest,
                difficulty: PrismaQuestDifficulty[quest.difficulty],
            },
            update: {},
        });
    }

    await prisma.$queryRaw`
        SELECT setval(
            pg_get_serial_sequence('"Quest"', 'id'),
            COALESCE((SELECT MAX("id") FROM "Quest"), 1),
            true
        )
    `;
}

seedQuests()
    .catch((error: unknown) => {
        console.error("Failed to seed quests:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
