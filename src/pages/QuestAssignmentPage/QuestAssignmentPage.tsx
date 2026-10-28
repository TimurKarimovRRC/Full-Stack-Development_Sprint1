import { QuestAssignmentForm } from "../../components/QuestAssignmentForm/QuestAssignmentForm";
import { AssignmentList } from "../../components/AssignmentList/AssignmentList";
import { useAdventurers } from "../../hooks/useAdventurers";
import type { Assignment } from "../../types/assignments";
import type { Quest } from "../../components/Quests/Quests";
import "./QuestAssignmentPage.css";

interface QuestAssignmentPageProps {
    quests: Quest[];
    assignments: Assignment[];
    setAssignments: (assignments: Assignment[]) => void;
}

/**
 * Reuses useAdventurers to obtain the current shared roster.
 * Adventurer data is retrieved through the service and repository
 * and supplied to the assignment form and list.
 */
export function QuestAssignmentPage({
    quests,
    assignments,
    setAssignments,
}: QuestAssignmentPageProps) {
    const { adventurers } = useAdventurers();

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