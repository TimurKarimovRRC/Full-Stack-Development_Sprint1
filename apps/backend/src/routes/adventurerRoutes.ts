import { Router, type RequestHandler } from "express";
import { addAdventurer, editAdventurer, listAdventurers, removeAdventurer } from "../controllers/adventurerController.js";
import { adventurerIdSchema, adventurerSchema } from "../validations/adventurerSchema.js";

const router = Router();

const validateAdventurer: RequestHandler = (req, res, next) => {
    const result = adventurerSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            error: "Invalid request body",
            details: result.error.issues.map(issue => issue.message),
        });
        return;
    }

    req.body = result.data;
    next();
};

const validateAdventurerId: RequestHandler = (req, res, next) => {
    const result = adventurerIdSchema.safeParse(req.params.id);

    if (!result.success) {
        res.status(400).json({ error: "Invalid adventurer id." });
        return;
    }

    next();
};


router.get("/", listAdventurers);
router.post("/", validateAdventurer, addAdventurer);
router.put("/:id", validateAdventurerId, validateAdventurer, editAdventurer);
router.delete("/:id", validateAdventurerId, removeAdventurer);
export default router;