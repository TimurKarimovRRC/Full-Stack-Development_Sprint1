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

    async create(quest: NewQuest): Promise<Quest> {
        const normalizedQuest = normalizeQuest(quest);
        return questRepository.create(normalizedQuest);
    },

    async updateReward(id: number, reward: string): Promise<Quest> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Quest ID must be a positive integer.");
        }

        const normalizedReward = reward.trim();
        if (!normalizedReward) {
            throw new Error("Quest reward is required.");
        }

        return questRepository.updateReward(id, normalizedReward);
    },

    delete(id: number): Promise<void> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Quest ID must be a positive integer.");
        }

        return questRepository.delete(id);
    },
};
