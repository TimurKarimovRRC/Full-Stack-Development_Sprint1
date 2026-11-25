import { prisma } from "../db/prisma.js";

export function getAdventurers() {
    return prisma.adventurer.findMany({
        orderBy: { id: "asc" },
    });
}

export function createAdventurer(name: string, characterClass: string) {
    return prisma.adventurer.create({
        data: { name, characterClass },
    });
}