import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import { questIdSchema } from "../validations/questSchemas.js";

export function validateBody<T>(schema: ZodType<T>): RequestHandler {
    return (request, response, next) => {
        const result = schema.safeParse(request.body);

        if (!result.success) {
            response.status(400).json({
                error: "Invalid request body",
                details: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
            return;
        }

        request.body = result.data;
        next();
    };
}

export const validateQuestId: RequestHandler = (request, response, next) => {
    const result = questIdSchema.safeParse(request.params.id);

    if (!result.success) {
        response.status(400).json({
            error: "Quest ID must be a positive integer.",
        });
        return;
    }

    next();
};
