import express from "express";
import cors from "cors";
import morgan from "morgan";
import assignmentRoute from "./api/v1/routes/assignmentRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/assignments", assignmentRoute);

app.get("/health", (_request, response) => {
    response.status(200).json({ status: "ok" });
});

export default app;
