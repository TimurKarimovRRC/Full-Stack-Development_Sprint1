import "dotenv/config";
import express from "express";
import morgan from "morgan";

import { corsMiddleware } from "./api/v1/middleware/corsConfig.js";
import { errorHandler } from "./api/v1/middleware/errorHandler.js";
import assignmentRoute from "./api/v1/routes/assignmentRoute.js";
import { questRoutes } from "./api/v1/routes/questRoutes.js";
import adventurerRoutes from "./routes/adventurerRoutes.js";

const app = express();

app.use(morgan("dev"));
app.use(corsMiddleware);
app.use(express.json());

app.use("/api/adventurers", adventurerRoutes);
app.use("/api/quests", questRoutes);
app.use("/api/v1/assignments", assignmentRoute);

app.get("/health", (_request, response) => {
    response.status(200).json({ status: "ok" });
});

app.use(errorHandler);

export default app;