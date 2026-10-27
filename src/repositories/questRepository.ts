import { questTestData } from "../data/quests";
import type { Quest } from "../types/quest";

let quests = questTestData.map((quest) => ({ ...quest }));

export const questRepository = {
    async getAll(): Promise<Quest[]> {
        return quests.map((quest) => ({ ...quest }));
    },

    async getById(id: number): Promise<Quest | undefined> {
        const quest = quests.find((item) => item.id === id);
        return quest ? { ...quest } : undefined;
    },

    async create(quest: Quest): Promise<Quest> {
        if (quests.some((item) => item.id === quest.id)) {
            throw new Error(`A quest with ID ${quest.id} already exists.`);
        }

        const createdQuest = { ...quest };
        quests = [createdQuest, ...quests];
        return { ...createdQuest };
    },

    async update(quest: Quest): Promise<Quest> {
        const questIndex = quests.findIndex((item) => item.id === quest.id);
        if (questIndex === -1) {
            throw new Error(`Cannot update quest ${quest.id}: it does not exist.`);
        }

        quests = quests.map((item) =>
            item.id === quest.id ? { ...quest } : item,
        );
        return { ...quest };
    },

    async delete(id: number): Promise<void> {
        if (!quests.some((quest) => quest.id === id)) {
            throw new Error(`Cannot delete quest ${id}: it does not exist.`);
        }

        quests = quests.filter((quest) => quest.id !== id);
    },
};
