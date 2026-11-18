import { useState } from "react";
import type { FormEvent } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import { useQuests } from "../../hooks/useQuests";
import type { QuestDifficulty } from "../../types/quest";
import type { ValidationResult } from "../../types/validation";

const questDifficulties: QuestDifficulty[] = [
    "Easy",
    "Medium",
    "Hard",
    "Expert",
];

function isQuestDifficulty(value: string): value is QuestDifficulty {
    return questDifficulties.some((difficulty) => difficulty === value);
}

function requiredField(label: string) {
    return (value: string): ValidationResult => {
        const isValid = value.trim().length > 0;
        return {
            isValid,
            errors: isValid ? [] : [`${label} is required.`],
        };
    };
}

function validateDifficulty(value: string): ValidationResult {
    const isValid = isQuestDifficulty(value);
    return {
        isValid,
        errors: isValid ? [] : ["Choose a valid quest difficulty."],
    };
}

/**
 * Uses one useFormInput instance per field for presentation and validation,
 * then submits validated quest data through the quest service and repository.
 */
export function QuestSubmission() {
    const [submitted, setSubmitted] = useState(false);
    const title = useFormInput();
    const location = useFormInput();
    const difficulty = useFormInput("Medium");
    const reward = useFormInput();
    const description = useFormInput();
    const { createQuest, isLoading, error } = useQuests();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(false);

        const titleResult = title.validate(requiredField("Quest title"));
        const locationResult = location.validate(requiredField("Location"));
        const difficultyResult = difficulty.validate(validateDifficulty);
        const rewardResult = reward.validate(requiredField("Reward"));
        const descriptionResult = description.validate(requiredField("Description"));

        if (
            !titleResult.isValid ||
            !locationResult.isValid ||
            !difficultyResult.isValid ||
            !rewardResult.isValid ||
            !descriptionResult.isValid ||
            !isQuestDifficulty(difficulty.value)
        ) {
            return;
        }

        try {
            await createQuest({
                title: title.value,
                location: location.value,
                difficulty: difficulty.value,
                reward: reward.value,
                description: description.value,
            });
            title.reset();
            location.reset();
            difficulty.reset();
            reward.reset();
            description.reset();
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
                        <input name="title" type="text" placeholder="The Ember Crown" value={title.value} onChange={(event) => title.setValue(event.target.value)} required />
                    </label>
                    {title.messages.map((message) => <p key={message} role="alert">{message}</p>)}

                    <label>
                        Location
                        <input name="location" type="text" placeholder="Ashen Valley" value={location.value} onChange={(event) => location.setValue(event.target.value)} required />
                    </label>
                    {location.messages.map((message) => <p key={message} role="alert">{message}</p>)}

                    <label>
                        Difficulty
                        <select name="difficulty" value={difficulty.value} onChange={(event) => difficulty.setValue(event.target.value)} required>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                            <option>Expert</option>
                        </select>
                    </label>
                    {difficulty.messages.map((message) => <p key={message} role="alert">{message}</p>)}

                    <label>
                        Reward
                        <input name="reward" type="text" placeholder="250 gold" value={reward.value} onChange={(event) => reward.setValue(event.target.value)} required />
                    </label>
                    {reward.messages.map((message) => <p key={message} role="alert">{message}</p>)}
                </div>

                <label>
                    Description
                    <textarea name="description" rows={5} placeholder="Describe the mission and what awaits the adventurer..." value={description.value} onChange={(event) => description.setValue(event.target.value)} required />
                </label>
                {description.messages.map((message) => <p key={message} role="alert">{message}</p>)}

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
