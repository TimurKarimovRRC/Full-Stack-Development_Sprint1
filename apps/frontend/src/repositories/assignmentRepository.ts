import type { Assignment } from "../types/assignments";
const API_BASE_URL = "/api/v1";

export const assignmentRepository = {

    getAll: async (): Promise<Assignment[]> => {
        const response = await fetch(`${API_BASE_URL}/assignments`);
        if (!response.ok) throw new Error("Failed to fetch assignments.");
        return response.json()
    },

    create: async (data: Omit<Assignment, "id" | "status" | "completedAt">): Promise<Assignment> => {
        const response = await fetch(`${API_BASE_URL}/assignments`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Failed to create assignment.");
        return response.json();
    },

    complete: async (id: number): Promise<Assignment> => {
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

