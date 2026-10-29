import { adventurerData } from "../data/adventurers";
import type {
    Adventurer,
    AdventurerInput,
} from "../types/adventurer";

let adventurers: Adventurer[] = structuredClone(adventurerData);

let nextId =
    Math.max(0, ...adventurers.map((adventurer) => adventurer.id)) + 1;

let version = 0;

const listeners = new Set<() => void>();

function notifyChanges() {
    version += 1;
    listeners.forEach((listener) => listener());
}

export const adventurerRepo = {
    getAll(): Adventurer[] {
        return structuredClone(adventurers);
    },

    getById(id: number): Adventurer | undefined {
        return structuredClone(
            adventurers.find((adventurer) => adventurer.id === id)
        );
    },

    create(input: AdventurerInput): Adventurer {
        const adventurer: Adventurer = {
            ...input,
            id: nextId++,
        };

        adventurers = [...adventurers, adventurer];

        notifyChanges();

        return { ...adventurer };
    },

    update(id: number, input: AdventurerInput): Adventurer {
        if (!adventurers.some((adventurer) => adventurer.id === id)) {
            throw new Error("Adventurer not found.");
        }

        const updated: Adventurer = {
            ...input,
            id,
        };

        adventurers = adventurers.map((adventurer) =>
            adventurer.id === id ? updated : adventurer
        );

        notifyChanges();

        return { ...updated };
    },

    remove(id: number): void {
        if (!adventurers.some((adventurer) => adventurer.id === id)) {
            throw new Error("Adventurer not found.");
        }

        adventurers = adventurers.filter(
            (adventurer) => adventurer.id !== id
        );

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

