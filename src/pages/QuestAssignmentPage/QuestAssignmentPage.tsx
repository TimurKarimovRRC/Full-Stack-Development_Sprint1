import { QuestAssignmentForm } from "../../components/QuestAssignmentForm/QuestAssignmentForm";
import { AssignmentList } from "../../components/AssignmentList/AssignmentList";

import { useAdventurers } from "../../hooks/useAdventurers";
import { useQuests } from "../../hooks/useQuests";

import type { Assignment } from "../../types/assignments";

import "./QuestAssignmentPage.css";

interface QuestAssignmentPageProps {
    assignments: Assignment[];
    setAssignments: (assignments: Assignment[]) => void;
}

/**
 * Retrieves current adventurers and quests through their feature hooks.
 * Each hook delegates data access to its service and repository.
 * Newly created characters and quests become available for assignment.
 */
export function QuestAssignmentPage({
    assignments,
    setAssignments,
}: QuestAssignmentPageProps) {
    const { adventurers } = useAdventurers();
    const { quests, isLoading, error } = useQuests();

    if (isLoading) {
        return <p role="status">Loading quests...</p>;
    }

    if (error) {
        return <p role="alert">{error}</p>;
    }

    return (
        <section className="quest-assignment-page">
            <h2>Quest Assignments</h2>

            <p className="quest-assignment-page__intro">
                Choose an adventurer and a quest below to assign a task.
                Assignments appear in the list below and remain visible
                across pages.
            </p>

            <QuestAssignmentForm
                adventurers={adventurers}
                quests={quests}
                assignments={assignments}
                setAssignments={setAssignments}
            />

            <AssignmentList
                adventurers={adventurers}
                quests={quests}
                assignments={assignments}
                setAssignments={setAssignments}
            />
        </section>
    );
}
