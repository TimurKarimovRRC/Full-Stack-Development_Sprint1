import { prisma } from "../db/prisma.js";

export function getAdventurers() {
    return prisma.adventurer.findMany({
        orderBy: { id: "asc" },
    });
}