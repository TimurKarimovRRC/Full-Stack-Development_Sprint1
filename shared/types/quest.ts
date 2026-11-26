export type QuestDifficulty = "Easy" | "Medium" | "Hard" | "Expert";

export interface Quest {
    id: number;
    title: string;
    location: string;
    difficulty: QuestDifficulty;
    description: string;
    reward: string;
}

export type NewQuest = Omit<Quest, "id">;
