import type { Assignment } from "../types/assignments";
import { mockAssignments } from "../data/mockAssignments";

class AssignmentRepository {

    private assignments: Assignment[] = [...mockAssignments];

    async getAll(): Promise<Assignment[]> {
        return [...this.assignments];
    }

    async create(newAssignment: Assignment): Promise<Assignment> {
        this.assignments.push(newAssignment);
        return newAssignment;
    }

    async delete(id: number): Promise<void> {
        this.assignments = this.assignments.filter((a) => a.id !== id);
    }

    async update(id: number, updates: Partial<Assignment>): Promise<Assignment | null> {
        const index = this.assignments.findIndex((a) => a.id === id);
        if (index === -1) return null;
        this.assignments[index] = { ...this.assignments[index], ...updates };
        return this.assignments[index];
    }
}

export const assignmentRepository = new AssignmentRepository();