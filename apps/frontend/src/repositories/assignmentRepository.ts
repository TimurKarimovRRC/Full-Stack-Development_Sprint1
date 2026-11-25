const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface QuestAssignment {
    id: number,
    questId: number,
    adventurerId: number,
    status: "IN_PROGRESS" | "COMPLETED";
    dueDate: string;
    completedAt: string | null;
    quest?: {
        title: string;
        reward: string;
    };
    adventuere?: {
        name: string;
    }
}

export const assignmentRepository = {

    getAll: async (): Promise<QuestAssignment[]> => {
        const response = await fetch(`${API_BASE_URL}/assignments`);
        if (!response.ok) throw new Error("Failed to fetch assignments.");
        return response.json()
    },

    create: async (data: { questId: number, adventuereId: number, dueDate: string 
    }): Promise<QuestAssignment> => {
        const response = await fetch(`${API_BASE_URL}/assignments`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Failed to create assignment.");
        return response.json();
    },

    complete: async (id: number): Promise<QuestAssignment> => {
        const response = await fetch(`${API_BASE_URL}/assignments/${id}/complete`, {
            method: "PATCH"
        });

        if (!response.ok) throw new Error("Failed to complete assignment.");
        return response.json();
    },

    remove: async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/assignments/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Failed to delete assignment.");
    }
    
    
}

