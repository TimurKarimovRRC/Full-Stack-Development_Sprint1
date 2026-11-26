import type { RequestHandler } from "express";
import type { NewQuest, Quest } from "@shared/quest.js";
import { questService } from "../services/questService.js";

export const listQuests: RequestHandler<
    never,
    Quest[]
> = async (_request, response) => {
    const quests = await questService.getAll();
    response.status(200).json(quests);
};

export const submitQuest: RequestHandler<
    never,
    Quest,
    NewQuest
> = async (request, response) => {
    const quest = await questService.create(request.body);
    response.status(201).json(quest);
};

export const changeQuestReward: RequestHandler<
    { id: string },
    Quest | { error: string },
    { reward: string }
> = async (request, response) => {
    const updatedQuest = await questService.updateReward(
        Number(request.params.id),
        request.body.reward,
    );

    if (!updatedQuest) {
        response.status(404).json({ error: "Quest not found." });
        return;
    }

    response.status(200).json(updatedQuest);
};

export const removeQuest: RequestHandler<
    { id: string },
    void | { error: string }
> = async (request, response) => {
    const wasDeleted = await questService.delete(Number(request.params.id));

    if (!wasDeleted) {
        response.status(404).json({ error: "Quest not found." });
        return;
    }

    response.status(204).end();
};
