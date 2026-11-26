import type { PrismaClient } from "@prisma/client";
import adventurers from "./adventurers.json" with { type: "json" };

export async function seedAdventurers(prisma: PrismaClient) {
    const [result] = await prisma.$transaction([
        prisma.adventurer.createMany({
            data: adventurers,
            skipDuplicates: true,
        }),
        prisma.$queryRaw`
            SELECT setval('"Adventurer_id_seq"', GREATEST(
                (SELECT MAX(id) FROM "Adventurer"),
                (SELECT last_value FROM "Adventurer_id_seq")
            ))
        `,
    ]);

    return result.count;
}