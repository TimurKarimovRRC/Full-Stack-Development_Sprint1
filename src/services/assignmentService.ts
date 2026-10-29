import type { Assignment } from "../types/assignments";
import { assignmentRepository } from "../repositories/assignmentRepository";

export const assignmentService = {

    getAssignments: async(): Promise<Assignment[]> => {
        return await assignmentRepository.getAll();
    },

    createAssignment: async (assignmentData: Omit<Assignment, "id">): Promise<Assignment> => {

        if (!assignmentData.adventurerId || !assignmentData.questId || !assignmentData.dueDate) {
            throw new Error( "Please select an adventure, a quest, and a due date.");
        }

        const newAssignment: Assignment = {
            ...assignmentData,
            id: Math.floor(Math.random()*1000000)
        };

        return await assignmentRepository.create(newAssignment);
    },

    removeAssignment: async(id: number): Promise<void> => {
        await assignmentRepository.delete(id);
    }

};