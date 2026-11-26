import type { NewQuest, Quest } from "../../../types/quest.js";
import { questRepository } from "../repositories/questRepository.js";

export const questService = {
    getAll(): Promise<Quest[]> {
        return questRepository.getAll();
    },

    create(quest: NewQuest): Promise<Quest> {
        return questRepository.create(quest);
    },

    updateReward(id: number, reward: string): Promise<Quest | undefined> {
        return questRepository.updateReward(id, reward);
    },

    delete(id: number): Promise<boolean> {
        return questRepository.delete(id);
    },
};
