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

            const loadedAssignments = await assignmentService.getAssignments();
            const loadedQuests = await questRepository.getAll();
            const loadedAdventurers = await adventurerRepo.getAll();
            
            setAssignments(loadedAssignments);
            setQuests(loadedQuests);
            setAdventurers(loadedAdventurers);
            setIsLoading(false);
        }
        loadData();
    }, []);

    const addAssignment = async(assignmentData: Omit<Assignment, "id">) => {
        const newAssignment = await assignmentService.createAssignment(assignmentData);
        setAssignments((current) => [...current, newAssignment]);
    };

    const removeAssignment = async(id: number) => {
        await assignmentService.removeAssignment(id);
        setAssignments((current) => current.filter((a) => a.id !== id));
    }

    return {
        assignments,
        quests,
        adventurers,
        isLoading,
        addAssignment,
        removeAssignment
    }
}