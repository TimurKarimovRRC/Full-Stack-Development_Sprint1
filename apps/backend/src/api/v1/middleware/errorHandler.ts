import type { ErrorRequestHandler } from "express";
import { CorsOriginError } from "./corsConfig.js";

export const errorHandler: ErrorRequestHandler = (
    error,
    _request,
    response,
    next,
) => {
    if (response.headersSent) {
        next(error);
        return;
    }

    if (error instanceof CorsOriginError) {
        response.status(403).json({ error: error.message });
        return;
    }

    if (
        error instanceof SyntaxError &&
        "status" in error &&
        error.status === 400
    ) {
        response.status(400).json({ error: "Malformed JSON request body." });
        return;
    }

    console.error("Unhandled API error:", error);
    response.status(500).json({ error: "Internal server error." });
};
