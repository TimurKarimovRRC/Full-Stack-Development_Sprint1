import type { Prisma, PrismaClient } from "@prisma/client";

const samples = [
    { questId: 1, adventurerId: 1, status: "IN_PROGRESS", dueDate: new Date("2026-12-01T12:00:00Z") },
    {
        questId: 29, adventurerId: 10, status: "COMPLETED",
        dueDate: new Date("2026-11-15T12:00:00Z"),
        completedAt: new Date("2026-11-20T12:00:00Z"),
    },
    { questId: 3, adventurerId: 2, status: "IN_PROGRESS", dueDate: new Date("2026-12-05T12:00:00Z") },
] satisfies Prisma.QuestAssignmentCreateManyInput[];

export async function seedAssignments(prisma: PrismaClient): Promise<number> {
    let added = 0;

    for (const sample of samples) {
        const exists = await prisma.questAssignment.findFirst({
            where: { questId: sample.questId, adventurerId: sample.adventurerId },
            select: { id: true },
        });
        if (exists) continue;

        await prisma.questAssignment.create({ data: sample });
        added++;
    }

    return added;
}