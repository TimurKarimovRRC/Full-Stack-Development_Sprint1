import {
    Prisma,
    QuestDifficulty as PrismaQuestDifficulty,
    type Quest as PrismaQuest,
} from "@prisma/client";
import type { NewQuest, Quest, QuestDifficulty } from "@shared/quest.js";
import { prisma } from "../../../db/prisma.js";

const prismaDifficulties: Record<QuestDifficulty, PrismaQuestDifficulty> = {
    Easy: PrismaQuestDifficulty.Easy,
    Medium: PrismaQuestDifficulty.Medium,
    Hard: PrismaQuestDifficulty.Hard,
    Expert: PrismaQuestDifficulty.Expert,
};

const apiDifficulties: Record<PrismaQuestDifficulty, QuestDifficulty> = {
    [PrismaQuestDifficulty.Easy]: "Easy",
    [PrismaQuestDifficulty.Medium]: "Medium",
    [PrismaQuestDifficulty.Hard]: "Hard",
    [PrismaQuestDifficulty.Expert]: "Expert",
};

function toApiQuest(quest: PrismaQuest): Quest {
    return {
        ...quest,
        difficulty: apiDifficulties[quest.difficulty],
    };
}

export const questRepository = {
    async getAll(): Promise<Quest[]> {
        const quests = await prisma.quest.findMany({
            orderBy: { id: "asc" },
        });
        return quests.map(toApiQuest);
    },

    async create(quest: NewQuest): Promise<Quest> {
        const createdQuest = await prisma.quest.create({
            data: {
                ...quest,
                difficulty: prismaDifficulties[quest.difficulty],
            },
        });
        return toApiQuest(createdQuest);
    },

    async updateReward(id: number, reward: string): Promise<Quest | undefined> {
        try {
            const updatedQuest = await prisma.quest.update({
                where: { id },
                data: { reward },
            });
            return toApiQuest(updatedQuest);
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                return undefined;
            }
            throw error;
        }
    },

    async delete(id: number): Promise<boolean> {
        const result = await prisma.quest.deleteMany({ where: { id } });
        return result.count > 0;
    },
};
