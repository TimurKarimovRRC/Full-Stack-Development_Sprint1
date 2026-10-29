export interface Assignment {
    id: number;
    adventurerId: number;
    questId: number;
    dueDate: string;
    status: "In Progress" | "Completed";
}

export type { Adventurer } from "./adventurer";