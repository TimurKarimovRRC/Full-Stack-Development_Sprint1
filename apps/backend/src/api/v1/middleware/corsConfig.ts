import cors from "cors";

export class CorsOriginError extends Error {
    constructor() {
        super("Origin is not allowed by CORS.");
        this.name = "CorsOriginError";
    }
}

function getAllowedOrigins(): Set<string> {
    const origins = new Set([
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]);

    const configuredOrigins = process.env.FRONTEND_URL
        ?.split(",")
        .map((origin) => origin.trim())
        .filter(Boolean) ?? [];

    if (process.env.NODE_ENV === "production" && configuredOrigins.length === 0) {
        throw new Error("FRONTEND_URL must be configured in production.");
    }

    for (const configuredOrigin of configuredOrigins) {
        let parsedOrigin: URL;
        try {
            parsedOrigin = new URL(configuredOrigin);
        } catch {
            throw new Error(`Invalid FRONTEND_URL origin: ${configuredOrigin}`);
        }

        if (
            !["http:", "https:"].includes(parsedOrigin.protocol) ||
            parsedOrigin.origin !== configuredOrigin
        ) {
            throw new Error(
                `FRONTEND_URL must contain only an origin without a path: ${configuredOrigin}`,
            );
        }
        origins.add(parsedOrigin.origin);
    }

    return origins;
}

const allowedOrigins = getAllowedOrigins();

export const corsMiddleware = cors({
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
    origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
            callback(null, true);
            return;
        }
        callback(new CorsOriginError());
    },
});
