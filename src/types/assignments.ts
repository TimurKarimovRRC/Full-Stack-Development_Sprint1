export interface Assignment {
  id: number;
  adventurerId: number;
  questId: number;
  dueDate: string;
  status: "In Progress" | "Completed";
}

export interface Adventurer {
  id: number;
  name: string;
  characterClass: string;
}