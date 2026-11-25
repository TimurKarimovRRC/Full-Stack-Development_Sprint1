import type { Request, Response, NextFunction } from "express";
import { assignmentService } from "../services/assignmentService.js";

export const assingmentController = {

    getAssignments: async (_req: Request, res: Response, next: NextFunction) => {

        try {
            const assignments = await assignmentService.getAllAssignments();
            res.status(200).json(assignments);
        } catch (error) {
            next(error);
        }
    },

    createAssignment: async (req: Request, res: Response, next: NextFunction) => {  

        try {
            const { questId, adventurerId, dueDate } = req.body;
            const newAssignment = await assignmentService.createAssignment({
                questId,
                adventurerId,
                dueDate
            });
            res.status(200).json(newAssignment);
        } catch (error) {
            next(error);
        }
    },

    completedAssignment: async (req: Request, res: Response, next: NextFunction) => {

        try {
            const id = parseInt(req.params.id as string);
            const updated = await assignmentService.completedAssignment(id);
            res.status(200).json(updated);
        } catch (error) {
            next (error)
        }
    },

    deleteAssignment: async (req: Request, res: Response, next: NextFunction) => {

        try {
            const id = parseInt(req.params.id as string);
            await assignmentService.deleteAssignment(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

}