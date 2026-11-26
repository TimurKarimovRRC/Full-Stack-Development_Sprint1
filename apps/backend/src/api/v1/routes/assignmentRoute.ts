import { Router, type RequestHandler } from "express";
import { assignmentController } from "../controllers/assignmentController.js";
import { assignmentSchema, assignmentIdSchema  } from "../validations/assignmentSchema.js";

const router = Router();

const validateAssignment: RequestHandler = (req, res, next) => {

    const result = assignmentSchema.safeParse(req.body);

    if(!result.success) {
        res.status(400).json({
            error: "Invalid request body",
            details: result.error.issues.map(issue => issue.message)
        });
        return;
    }

    req.body = result.data;
    next();
}

const validateAssignmentId: RequestHandler = (req, res, next) => {
    const result = assignmentIdSchema.safeParse(req.params.id);

    if(!result.success) {
        res.status(400).json({ error: "Invalid assignment id." });
        return;
    }
    
    next();
}

router.get("/", assignmentController.getAssignments);
router.post("/", validateAssignment, assignmentController.createAssignment);
router.patch("/:id/complete", validateAssignmentId, assignmentController.completedAssignment);
router.delete("/:id", validateAssignmentId, assignmentController.deleteAssignment);

export default router;