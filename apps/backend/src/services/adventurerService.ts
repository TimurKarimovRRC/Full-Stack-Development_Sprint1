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
export async function updateAdventurer(id: number, name: string, characterClass: string) {
    const updated = await prisma.adventurer.updateManyAndReturn({
        where: { id },
        data: { name, characterClass },
    });

    return updated[0] ?? null;
}
export async function deleteAdventurer(id: number) {
    const result = await prisma.adventurer.deleteMany({ where: { id } });
    return result.count === 1;
}