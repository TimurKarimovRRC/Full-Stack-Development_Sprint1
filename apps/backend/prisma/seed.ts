import { questTestData } from "../../../shared/data/quests.js";
import { prisma } from "../src/db/prisma.js";
import { seedAdventurers } from "./seedAdventurers.js";
import { seedAssignments } from "./seedAssignment.js";

try {
    const heroesAdded = await seedAdventurers(prisma);

    const [quests] = await prisma.$transaction([
        prisma.quest.createMany({ data: questTestData, skipDuplicates: true }),
        // Seed quests have explicit IDs; keep the next generated ID above them.
        prisma.$queryRaw`
            SELECT setval('"Quest_id_seq"', GREATEST(
                (SELECT MAX(id) FROM "Quest"),
                (SELECT last_value FROM "Quest_id_seq")
            ))
        `,
    ]);

    const assignmentsAdded = await seedAssignments(prisma);

    console.log("Adventurers added:", heroesAdded);
    console.log("Quests added:", quests.count);
    console.log("Assignments added:", assignmentsAdded);
} finally {
    await prisma.$disconnect();
}