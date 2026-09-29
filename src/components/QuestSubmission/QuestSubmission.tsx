import { useState } from "react";
import type { FormEvent } from "react";

export function QuestSubmission() {
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(true);
        event.currentTarget.reset();
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
                        <input name="title" type="text" placeholder="The Ember Crown" required />
                    </label>

                    <label>
                        Location
                        <input name="location" type="text" placeholder="Ashen Valley" required />
                    </label>

                    <label>
                        Difficulty
                        <select name="difficulty" defaultValue="Medium" required>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                            <option>Expert</option>
                        </select>
                    </label>

                    <label>
                        Reward
                        <input name="reward" type="text" placeholder="250 gold" required />
                    </label>
                </div>

                <label>
                    Description
                    <textarea name="description" rows={5} placeholder="Describe the mission and what awaits the adventurer..." required />
                </label>

                <button type="submit">Submit quest</button>

                {submitted && (
                    <p className="quest-form__success" role="status">
                        Quest submitted to the guild board.
                    </p>
                )}
            </form>
        </section>
    );
}
