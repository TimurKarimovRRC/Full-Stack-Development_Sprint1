import cors from "cors";
import express from "express";
import adventurerRoutes from "./routes/adventurerRoutes.js";

const app = express();
const frontendUrl = "http://localhost:5173";

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (origin === undefined || origin === frontendUrl) {
        next();
    } else {
        res.sendStatus(403);
    }
});

app.use(cors({ origin: frontendUrl }));
app.use(express.json());
app.use("/api/adventurers", adventurerRoutes);
app.get("/health", (_request, response) => {
    response.status(200).json({ status: "ok" });
});

export default app;