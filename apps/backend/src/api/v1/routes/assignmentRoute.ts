import { Router } from "express";
import { assignmentController } from "../controllers/assignmentController.js";

const router = Router();

router.get("/", assignmentController.getAssignments);
router.post("/", assignmentController.createAssignment);
router.patch("/:id/complete", assignmentController.completedAssignment);
router.delete("/:id", assignmentController.deleteAssignment);

export default router;