import { prisma } from "../src/db/prisma.js";
import { seedAdventurers } from "./seedAdventurers.js";

try {
    const added = await seedAdventurers(prisma);
    console.log(`Adventurers added: ${added}`);
} finally {
    await prisma.$disconnect();
}