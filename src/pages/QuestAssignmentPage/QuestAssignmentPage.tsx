import { QuestAssignmentForm } from "../../components/QuestAssignmentForm/QuestAssignmentForm";
import { AssignmentList } from "../../components/AssignmentList/AssignmentList";
import type { Assignment, Adventurer } from "../../types/assignments";
import type { Quest } from "../../components/Quests/Quests";
import "./QuestAssignmentPage.css";

interface QuestAssignmentPageProps {
    adventurers: Adventurer[];
    quests: Quest[];
    assignments: Assignment[];
    setAssignments: (assignments: Assignment[]) => void;
}

export function QuestAssignmentPage({
    adventurers,
    quests,
    assignments,
    setAssignments,
}: QuestAssignmentPageProps) {

    return (

        <section className="quest-assignment-page">
            <h2>Quest Assignments</h2>
            <p className="quest-assignment-page__intro">
                Choose an adventurer and a quest below to assign a task. Assignments
                appear in the list below and remain visible across pages.
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