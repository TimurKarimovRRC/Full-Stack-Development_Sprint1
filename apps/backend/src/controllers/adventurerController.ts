import type { Request, Response } from "express";
import { getAdventurers } from "../services/adventurerService.js";

export async function listAdventurers(_req: Request, res: Response) {
    const adventurers = await getAdventurers();
    res.json(adventurers);
}