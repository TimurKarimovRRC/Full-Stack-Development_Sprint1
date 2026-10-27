import { useState } from "react";
import type { Assignment, Adventurer } from "../../types/assignments";
import type { Quest } from "../Quests/Quests";
import "./QuestAssignmentForm.css";

interface QuestAssignmentFormProps {
    adventurers: Adventurer[];
    quests: Quest[];
    addAssignment: (data: Omit<Assignment, "id">) => Promise<void>;
}

export function QuestAssignmentForm({
    adventurers,
    quests,
    addAssignment
}: QuestAssignmentFormProps) {

    const [adventurerId, setAdventurerId] = useState("");
    const [questId, setQuestId] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");

        try {
            await addAssignment({
                adventurerId: Number(adventurerId),
                questId: Number(questId),
                dueDate,
                status: "In Progress"
            });

            setAdventurerId("");
            setQuestId("");
            setDueDate("");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occured.");
            }
        }
    };

    return (
        <form className="quest-assignment-form" onSubmit={handleSubmit}>
            <h3>Assign a Quest</h3>

            <div className="quest-assignment-form__field">
                <label htmlFor="adventurer">Adventurer</label>
                <select
                    id="adventurer"
                    value={adventurerId}
                    onChange={(e) => setAdventurerId(e.target.value)}
                >
                    <option value="">-- Choose an adventurer --</option>
                    {adventurers.map((a) => (
                        <option key={a.id} value={a.id}>
                            {a.name} ({a.characterClass})
                        </option>
                    ))}
                </select>
            </div>

            <div className="quest-assignment-form__field">
                <label htmlFor="quest">Quest</label>
                <select
                    id="quest"
                    value={questId}
                    onChange={(e) => setQuestId(e.target.value)}
                >
                    <option value="">-- Choose a quest --</option>
                    {quests.map((q) => (
                        <option key={q.id} value={q.id}>
                            {q.title} [{q.difficulty}]
                        </option>
                    ))}
                </select>
            </div>

            <div className="quest-assignment-form__field">
                <label htmlFor="dueDate">Due date</label>
                <input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>

            {error && <p className="quest-assignment-form__error">{error}</p>}

            <button type="submit" className="quest-assignment-form__submit">
                Assign Quest
            </button>
        </form>
    );
}