import { PrismaClient, Prisma } from "@prisma/client";
import adventurersData from "../../frontend/src/data/Adventurers.json" with { type: "json" };
import questsData from "../../frontend/src/data/Quests.json" with { type: "json" };

const prisma = new PrismaClient();

async function main() {
    console.log("Starting to seed database...");

    // Adventurer
    for (const adventurer of adventurersData) {
        await prisma.adventurer.upsert({
            where: { id: adventurer.id },
            update: {},
            create: { id: adventurer.id, name: adventurer.name }
        });
    }
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Adventurer"', 'id'),
        COALESCE((SELECT MAX(id) FROM "Adventurer"), 1), true);`
    console.log(`Seeded ${adventurersData.length} adventurers.`);


    // Quest
    for (const quest of questsData) {
        await prisma.quest.upsert({
            where: {id: quest.id},
            update: {},
            create: {
                id: quest.id,
                title: quest.title,
                location: quest.location,
                difficulty: quest.difficulty as Prisma.QuestCreateInput["difficulty"],
                description: quest.description,
                reward: quest.reward
            }
        });
    }
     await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Quest"', 'id'), 
        COALESCE((SELECT MAX(id) FROM "Quest"), 1), true);`;
    console.log(`Seeded ${questsData.length} quests.`);


    // Assignment
    const assignmentsData = [
        {
            questId: 1, // "Lost Lantern"
            adventurerId: 1, // "Kael Thornwood"
            status: "IN_PROGRESS" as const,
            dueDate: new Date("2026-12-01T12:00:00Z"),
        },
        {
            questId: 29, // "The Dragon's Debt"
            adventurerId: 10, // "Gandalf the Grey"
            status: "COMPLETED" as const,
            dueDate: new Date("2026-11-15T12:00:00Z"),
            completedAt: new Date("2026-11-20T12:00:00Z"),
        },
        {
            questId: 3, // "Quiet Bridge"
            adventurerId: 2, // "Mira Silvermoon"
            status: "IN_PROGRESS" as const,
            dueDate: new Date("2026-12-05T12:00:00Z"),
        }
    ];

    for (const assignment of assignmentsData) {
        
        const existing = await prisma.questAssignment.findFirst({
            where: { questId: assignment.questId, adventurerId: assignment.adventurerId }
        });

        if (!existing) {
            await prisma.questAssignment.create({ data: assignment});
        }
    }
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"quest_assignments"', 'id'), 
        COALESCE((SELECT MAX(id) FROM "quest_assignments"), 1), true);`;
    console.log(`Seeded ${assignmentsData.length} assignments.`);

    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });