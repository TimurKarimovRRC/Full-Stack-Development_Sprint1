import { Router, type RequestHandler } from "express";
import { addAdventurer, listAdventurers } from "../controllers/adventurerController.js";
import { adventurerSchema } from "../validations/adventurerSchema.js";

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

router.get("/", listAdventurers);
router.post("/", validateAdventurer, addAdventurer);

export default router;