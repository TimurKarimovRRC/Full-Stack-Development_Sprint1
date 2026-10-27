import { questRepository } from "../repositories/questRepository";
import type { NewQuest, Quest, QuestDifficulty } from "../types/quest";

const questDifficulties: QuestDifficulty[] = [
    "Easy",
    "Medium",
    "Hard",
    "Expert",
];

function normalizeQuest(quest: NewQuest): NewQuest {
    const normalizedQuest = {
        title: quest.title.trim(),
        location: quest.location.trim(),
        difficulty: quest.difficulty,
        description: quest.description.trim(),
        reward: quest.reward.trim(),
    };

    if (
        !normalizedQuest.title ||
        !normalizedQuest.location ||
        !normalizedQuest.description ||
        !normalizedQuest.reward
    ) {
        throw new Error("Quest title, location, description, and reward are required.");
    }

    if (!questDifficulties.includes(normalizedQuest.difficulty)) {
        throw new Error("Quest difficulty must be Easy, Medium, Hard, or Expert.");
    }

    return normalizedQuest;
}

export const questService = {
    getAll(): Promise<Quest[]> {
        return questRepository.getAll();
    },

    getById(id: number): Promise<Quest | undefined> {
        return questRepository.getById(id);
    },

    async create(quest: NewQuest): Promise<Quest> {
        const normalizedQuest = normalizeQuest(quest);
        const existingQuests = await questRepository.getAll();
        const id = Math.max(0, ...existingQuests.map((item) => item.id)) + 1;

        return questRepository.create({ id, ...normalizedQuest });
    },

    async update(quest: Quest): Promise<Quest> {
        if (!Number.isInteger(quest.id) || quest.id <= 0) {
            throw new Error("Quest ID must be a positive integer.");
        }

        const normalizedQuest = normalizeQuest(quest);
        return questRepository.update({ id: quest.id, ...normalizedQuest });
    },

    delete(id: number): Promise<void> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Quest ID must be a positive integer.");
        }

        return questRepository.delete(id);
    },
};
