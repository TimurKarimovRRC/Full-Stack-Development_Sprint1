import { prisma } from "../../../db/prisma.js";

export const assignmentService = {

    // list all
    getAllAssignments: async() => {
        return await prisma.questAssignment.findMany({
            include: {
                quest: true,
                adventurer: true
            }
        });
    },

    // create new
    createAssignment: async(data: { questId: number, adventurerId: number, dueDate: string}) => {
        return await prisma.questAssignment.create({
            data: {
                questId: data.questId,
                adventurerId: data.adventurerId,
                dueDate: new Date(data.dueDate)
            }
        });

    },

    // mark as completed
    completedAssignment: async(id: number) => {
        return await prisma.questAssignment.update({
            where: { id },
            data: {
                status: "COMPLETED",
                completedAt: new Date(),
            }
        });
    },

    // remove assignment
    deleteAssignment: async(id: number) => {
        return await prisma.questAssignment.delete({
            where: { id }
        });
    }

};