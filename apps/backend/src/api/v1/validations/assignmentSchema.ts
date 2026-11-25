import { z } from "zod";

export const createAssignmentSchema = z.object({

    body: z.object({
        questId: z.number().int().positive("Quest ID must be a positive number."),
        adventurerId: z.number().int().positive("Adventurer ID must be a positive number."),
        dueDate: z.string().datetime("Due Date must be a valid ISO date string.")
    }),
});

export const updateAssignmentStatusSchema = z.object({

    body: z.object({
        status: z.enum(["IN_PROGRESS", "COMPLETED"])
    })
});