import { useState, useEffect } from "react";
import type { Assignment, Adventurer } from "../types/assignments";
import type { Quest } from "../components/Quests/Quests";
import { assignmentService } from "../services/assignmentService";

import adventurerData from "../data/Adventurers.json";
import questData from "../data/Quests.json";

export function useAssignments() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [quests, setQuests] = useState<Quest[]>([]);
    const [adventurers, setAdventurers] = useState<Adventurer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {

            const loadedAssignments = await assignmentService.getAssignments();
            setAssignments(loadedAssignments);

            setQuests(questData as Quest[]);
            setAdventurers(adventurerData as Adventurer[]);

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