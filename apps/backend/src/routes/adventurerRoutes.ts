import { Router } from "express";
import { listAdventurers } from "../controllers/adventurerController.js";

const router = Router();

router.get("/", listAdventurers);

export default router;