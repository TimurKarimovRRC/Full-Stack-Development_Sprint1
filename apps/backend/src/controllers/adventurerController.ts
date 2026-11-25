import type { Request, Response } from "express";
import { createAdventurer, getAdventurers } from "../services/adventurerService.js";

export async function listAdventurers(_req: Request, res: Response) {
    const adventurers = await getAdventurers();
    res.json(adventurers);
}


export async function addAdventurer(req: Request, res: Response) {
    const { name, characterClass } = req.body;
    const adventurer = await createAdventurer(name, characterClass);

    res.status(201).json(adventurer);
}