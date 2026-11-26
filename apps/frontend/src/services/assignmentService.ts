import type { Assignment } from "../types/assignments";
import { assignmentRepository } from "../repositories/assignmentRepository";

export const assignmentService = {

    getAssignments: async(): Promise<Assignment[]> => {
        return await assignmentRepository.getAll();
    },

    createAssignment: async (assignmentData: Omit<Assignment, "id" | "status" | "completedAt">): Promise<Assignment> => {

        if (!assignmentData.adventurerId || !assignmentData.questId || !assignmentData.dueDate) {
            throw new Error( "Please select an adventure, a quest, and a due date.");
        }

        return await assignmentRepository.create(assignmentData);
    },

    removeAssignment: async(id: number): Promise<void> => {
        await assignmentRepository.remove(id);
    },

    completeAssignment: async (id: number): Promise<Assignment> => {
        return await assignmentRepository.complete(id)
    }

};