import { useState, useEffect } from "react";
import type { Adventurer } from "../types/adventurer";
import type { Quest } from "../types/quest";
import type { Assignment} from "../types/assignments";
import { assignmentService } from "../services/assignmentService";
import { questRepository } from "../repositories/questRepository";
import { adventurerRepo } from "../repositories/adventurerRepo";


export function useAssignments() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [quests, setQuests] = useState<Quest[]>([]);
    const [adventurers, setAdventurers] = useState<Adventurer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try { 
                const loadedAssignments = await assignmentService.getAssignments();
                const loadedQuests = await questRepository.getAll();
                const loadedAdventurers = await adventurerRepo.fetchAll();
                
                setAssignments(loadedAssignments);
                setQuests(loadedQuests);
                setAdventurers(loadedAdventurers);
            } catch (error) {
                console.error("Failed to load data", error);
            } finally {
                setIsLoading(false);

            }
        }     
        loadData();
    }, []);

    const addAssignment = async(assignmentData: Omit<Assignment, "id" | "status" | "completedAt">) => {
        const newAssignment = await assignmentService.createAssignment(assignmentData);
        setAssignments((current) => [...current, newAssignment]);
    };

    const removeAssignment = async(id: number) => {
        await assignmentService.removeAssignment(id);
        setAssignments((current) => current.filter((a) => a.id !== id));
    }

    const completeAssignment = async (id: number) => {
        const updatedAssignment = await assignmentService.completeAssignment(id);

        setAssignments((current) =>
            current.map((a) => a.id === id ? updatedAssignment: a)
        );
    }

    return {
        assignments,
        quests,
        adventurers,
        isLoading,
        addAssignment,
        removeAssignment,
        completeAssignment
    }
}