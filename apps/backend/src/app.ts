import "dotenv/config";
import express from "express";
import { corsMiddleware } from "./api/v1/middleware/corsConfig.js";
import { errorHandler } from "./api/v1/middleware/errorHandler.js";
import { questRoutes } from "./api/v1/routes/questRoutes.js";

const app = express();
const frontendUrl = "http://localhost:5173";

app.use(corsMiddleware);
app.use(express.json());

app.use("/api/quests", questRoutes);

app.get("/health", (_request, response) => {
    response.status(200).json({ status: "ok" });
});

app.use(errorHandler);

export default app;
