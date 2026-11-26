import { Router } from "express";
import {
    changeQuestReward,
    listQuests,
    removeQuest,
    submitQuest,
} from "../controllers/questController.js";
import { validateBody, validateQuestId } from "../middleware/validateRequest.js";
import {
    newQuestSchema,
    updateQuestRewardSchema,
} from "../validations/questSchemas.js";

export const questRoutes = Router();

questRoutes.get("/", listQuests);
questRoutes.post("/", validateBody(newQuestSchema), submitQuest);
questRoutes.patch(
    "/:id/reward",
    validateQuestId,
    validateBody(updateQuestRewardSchema),
    changeQuestReward,
);
questRoutes.delete("/:id", validateQuestId, removeQuest);
