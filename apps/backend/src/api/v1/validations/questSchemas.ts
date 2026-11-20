import { z } from "zod";

const requiredText = (maxLength: number) =>
    z.string().trim().min(1).max(maxLength);

export const newQuestSchema = z.object({
    title: requiredText(120),
    location: requiredText(150),
    difficulty: z.enum(["Easy", "Medium", "Hard", "Expert"]),
    description: requiredText(2000),
    reward: requiredText(2000),
}).strict();

export const updateQuestRewardSchema = z.object({
    reward: requiredText(2000),
}).strict();

export const questIdSchema = z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
    .pipe(z.number().int().positive().max(2147483647));
