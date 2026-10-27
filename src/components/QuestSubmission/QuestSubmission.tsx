import { useState } from "react";
import type { FormEvent } from "react";
import { useForm } from "../../hooks/useForm";
import { useQuests } from "../../hooks/useQuests";
import type { QuestDifficulty } from "../../types/quest";

interface QuestSubmissionValues extends Record<string, string> {
    title: string;
    location: string;
    difficulty: QuestDifficulty;
    reward: string;
    description: string;
}

/**
 * Uses the shared form hook for input presentation and the quest hook to submit
 * validated quest data through the service and repository.
 */
export function QuestSubmission() {
    const [submitted, setSubmitted] = useState(false);
    const { values, handleChange, reset } = useForm<QuestSubmissionValues>({
        title: "",
        location: "",
        difficulty: "Medium",
        reward: "",
        description: "",
    });
    const { createQuest, isLoading, error } = useQuests();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(false);
        try {
            await createQuest(values);
            reset();
            setSubmitted(true);
        } catch {
            setSubmitted(false);
        }
    }

    return (
        <section className="quest-submission" aria-labelledby="quest-submission-title">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">Guild intake</p>
                    <h2 id="quest-submission-title">Quest Submission</h2>
                </div>
            </div>

            <p className="quest-submission__intro">
                Share a new contract with the adventurers of the realm.
            </p>

            <form className="quest-form" onSubmit={handleSubmit}>
                <div className="quest-form__grid">
                    <label>
                        Quest title
                        <input name="title" type="text" placeholder="The Ember Crown" value={values.title} onChange={handleChange} required />
                    </label>

                    <label>
                        Location
                        <input name="location" type="text" placeholder="Ashen Valley" value={values.location} onChange={handleChange} required />
                    </label>

                    <label>
                        Difficulty
                        <select name="difficulty" value={values.difficulty} onChange={handleChange} required>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                            <option>Expert</option>
                        </select>
                    </label>

                    <label>
                        Reward
                        <input name="reward" type="text" placeholder="250 gold" value={values.reward} onChange={handleChange} required />
                    </label>
                </div>

                <label>
                    Description
                    <textarea name="description" rows={5} placeholder="Describe the mission and what awaits the adventurer..." value={values.description} onChange={handleChange} required />
                </label>

                <button type="submit" disabled={isLoading}>Submit quest</button>

                {error && <p role="alert">{error}</p>}

                {submitted && (
                    <p className="quest-form__success" role="status">
                        Quest submitted to the guild board.
                    </p>
                )}
            </form>
        </section>
    );
}
