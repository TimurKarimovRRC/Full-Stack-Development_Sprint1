export interface Assignment {
    id: number;
    adventurerId: number;
    questId: number;
    dueDate: string;
    status: "IN_PROGRESS" | "COMPLETED";
}
