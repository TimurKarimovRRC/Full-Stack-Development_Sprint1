import { PrismaClient } from "@prisma/client";
import adventurersData from "../../frontend/src/data/Adventurers.json" with { type: "json" };
import questsData from "../../frontend/src/data/Quests.json" with { type: "json" };

const prisma = new PrismaClient();

async function main() {
    console.log("Starting to seed database...");

    await prisma.questAssignment.deleteMany();
    await prisma.quest.deleteMany();
    await prisma.adventurer.deleteMany();

    for (const adventurer of adventurersData) {
        await prisma.adventurer.create({
            data: {
                id: adventurer.id,
                name: adventurer.name,
            }
        });
    }
    console.log(`Seeded ${adventurersData.length} adventurers.`);

    for (const quest of questsData) {
        await prisma.quest.create({
            data: {
                id: quest.id,
                title: quest.title,
                location: quest.location,
                difficulty: quest.difficulty as unknown,
                description: quest.description,
                reward: quest.reward
            }
        });
    }
    console.log(`Seeded ${questsData.length} quests.`);

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
        await prisma.questAssignment.create({
            data: assignment
        });
    }
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