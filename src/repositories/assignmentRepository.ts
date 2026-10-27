import type { Assignment } from "../types/assignments";
import { mockAssignments } from "../data/mockAssignments";

let assignments = [...mockAssignments];

export const assignmentRepository = {

    getAll: async(): Promise<Assignment[]> => {
        return assignments;
    },

    create: async(newAssignment: Assignment): Promise<Assignment> => {
        assignments = [...mockAssignments, newAssignment];
        return newAssignment;
    } ,

    delete: async(id: number): Promise<void> => {
        assignments = assignments.filter((a) => a.id !== id);
    },

    update: async(id: number, updates: Partial<Assignment>): Promise<Assignment | null> => {
        const index = assignments.findIndex((a) => a.id === id);
        if (index === -1) return null;
        assignments[index] = {...assignments[index], ...updates};
        return assignments[index]
    }
};