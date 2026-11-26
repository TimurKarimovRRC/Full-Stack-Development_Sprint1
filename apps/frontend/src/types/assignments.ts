import type { Quest } from "@shared/quest";
import type { Adventurer } from "./adventurer";

export interface Assignment {
    id: number;
    adventurerId: number;
    questId: number;
    dueDate: string;
    status: "IN_PROGRESS" | "COMPLETED";

    quest?: Quest;
    adventurer?: Adventurer;

}
