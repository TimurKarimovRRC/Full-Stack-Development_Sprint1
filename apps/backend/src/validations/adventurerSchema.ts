import { z } from "zod";

export const adventurerSchema = z.strictObject({
    name: z.string().trim().min(1, "Name is required."),
    characterClass: z.string().trim().min(1, "Character class is required."),
});
export const adventurerIdSchema = z.string()
    .regex(/^[1-9]\d*$/)
    .refine(id => Number(id) <= 2_147_483_647);