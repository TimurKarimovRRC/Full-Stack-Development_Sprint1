import type { Request, Response } from "express";
import { createAdventurer, deleteAdventurer, getAdventurers, updateAdventurer } from "../services/adventurerService.js";


export async function listAdventurers(_req: Request, res: Response) {
    const adventurers = await getAdventurers();
    res.json(adventurers);
}


export async function addAdventurer(req: Request, res: Response) {
    const { name, characterClass } = req.body;
    const adventurer = await createAdventurer(name, characterClass);

    res.status(201).json(adventurer);
}
export async function editAdventurer(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name, characterClass } = req.body;

    const adventurer = await updateAdventurer(id, name, characterClass);

    if (!adventurer) {
        res.status(404).json({ error: "Adventurer not found." });
        return;
    }

    res.json(adventurer);
}
export async function removeAdventurer(req: Request, res: Response) {
    const deleted = await deleteAdventurer(Number(req.params.id));

    if (!deleted) {
        res.status(404).json({ error: "Adventurer not found." });
        return;
    }

    res.status(204).end();
}