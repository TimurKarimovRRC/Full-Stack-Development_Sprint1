import { z } from "zod";

export const assignmentSchema = z.object({

        questId: z.number().int().positive("Quest ID must be a positive number."),
        adventurerId: z.number().int().positive("Adventurer ID must be a positive number."),
        dueDate: z.string().min(1, "Due date is required")
            .refine((dateString) => {
                const selectedDate = new Date(dateString);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate >= today;
            }, {
                message: "Due date cannot be in the past."
            }) 

});

export const assignmentIdSchema = z.string().regex(/^\d+$/, "Assignment ID must be number.");