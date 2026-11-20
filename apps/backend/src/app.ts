import express from "express";
import { errorHandler } from "./api/v1/middleware/errorHandler.js";
import { questRoutes } from "./api/v1/routes/questRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/quests", questRoutes);

app.get("/health", (_request, response) => {
    response.status(200).json({ status: "ok" });
});

app.use(errorHandler);

export default app;
