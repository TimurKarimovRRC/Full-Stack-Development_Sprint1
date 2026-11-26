import { adventurerData } from "../data/adventurers";
import type { Adventurer, AdventurerInput } from "../types/adventurer";

let adventurers: Adventurer[] = structuredClone(adventurerData);
let version = 0;

const listeners = new Set<() => void>();

function notifyChanges() {
    version += 1;
    listeners.forEach((listener) => listener());
}

export const adventurerRepo = {
    async fetchAll(signal?: AbortSignal): Promise<Adventurer[]> {
        const response = await fetch("/api/adventurers", { signal });

        if (!response.ok) {
            throw new Error(`Unable to load adventurers (${response.status}).`);
        }

        const rows: Adventurer[] = await response.json();

        if (!signal?.aborted) {
            adventurers = structuredClone(rows);
            notifyChanges();
        }

        return rows;
    },

    getAll(): Adventurer[] {
        return structuredClone(adventurers);
    },

    getById(id: number): Adventurer | undefined {
        return structuredClone(
            adventurers.find((adventurer) => adventurer.id === id)
        );
    },

    async create(input: AdventurerInput): Promise<Adventurer> {
        const response = await fetch("/api/adventurers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
        });

        if (!response.ok) {
            throw new Error(`Unable to add adventurer (${response.status}).`);
        }

        const created: Adventurer = await response.json();
        adventurers = [...adventurers, created];
        notifyChanges();

        return { ...created };
    },

   async update(id: number, input: AdventurerInput): Promise<Adventurer> {
    const response = await fetch(`/api/adventurers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });

    if (!response.ok) {
        throw new Error(`Unable to update adventurer (${response.status}).`);
    }

    const updated: Adventurer = await response.json();

    adventurers = adventurers.map((adventurer) =>
        adventurer.id === id ? updated : adventurer
    );
    notifyChanges();

    return { ...updated };
},

    async remove(id: number): Promise<void> {
    const response = await fetch(`/api/adventurers/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Unable to remove adventurer (${response.status}).`);
    }

    adventurers = adventurers.filter((adventurer) => adventurer.id !== id);
    notifyChanges();
    },

    subscribe(listener: () => void): () => void {
        listeners.add(listener);

        return () => {
            listeners.delete(listener);
        };
    },

    getVersion(): number {
        return version;
    },
};