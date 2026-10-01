import type { Assignment, Adventurer } from "../../types/assignments.ts";
import type { Quest } from "../Quests/Quests.tsx";
import "./AssignmentList.css";

interface AssignmentListProps {
    adventurers: Adventurer[];
    quests: Quest[];
    assignments: Assignment[];
    setAssignments: (assignments: Assignment[]) => void;
}

export function AssignmentList({
  adventurers,
  quests,
  assignments,
  setAssignments,
}: AssignmentListProps) {

    // find adventurer's name by id
    const getAdventurerName = (id: number) =>
    adventurers.find((a) => a.id === id)?.name ?? "Unknown adventurer";

    // find quest title by id
    const getQuestTitle = (id: number) =>
    quests.find((q) => q.id === id)?.title ?? "Unknown quest";

    const handleRemove = (id: number) => {
    setAssignments(assignments.filter((a) => a.id !== id));
    };

    if (assignments.length === 0) {
        return (
        <section className="assignment-list">
            <h3>Current Assignments</h3>
            <p className="assignment-list__empty">
            No quests assigned yet. Use the form above to assign one.
            </p>
        </section>
        );
    }

    return (
        <section className="assignment-list">
            <h3>Current Assignments</h3>

            <ul className="assignment-list__items">
                {assignments.map((assignment) => (
                <li key={assignment.id} className="assignment-list__item">
                    <div className="assignment-list__info">
                    <p className="assignment-list__title">
                        <strong>{getAdventurerName(assignment.adventurerId)}</strong>
                        {" -> "}
                        {getQuestTitle(assignment.questId)}
                    </p>
                    <p className="assignment-list__meta">
                        <span
                        className={
                            "assignment-list__status assignment-list__status--" +
                            assignment.status.toLowerCase().replace(" ", "-")
                        }
                        >
                        {assignment.status}
                        </span>
                        {" Due "}
                        <time dateTime={assignment.dueDate}>
                        {assignment.dueDate}
                        </time>
                    </p>
                    </div>

                    <button
                        type="button"
                        className="assignment-list__remove"
                        onClick={() => handleRemove(assignment.id)}
                        aria-label={`Remove assignment of ${getQuestTitle(
                            assignment.questId
                        )} to ${getAdventurerName(assignment.adventurerId)}`}
                        >
                        X
                    </button>
                 </li>
                ))}
            </ul>
        </section>
    );

}