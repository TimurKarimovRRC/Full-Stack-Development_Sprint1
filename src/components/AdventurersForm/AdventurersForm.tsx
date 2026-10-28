import { useFormInput } from "../../hooks/useFormInput";
import * as adventurerService from "../../services/adventurerService";
import type { AdventurerInput } from "../../types/adventurer";

interface AdventurersFormProps {
    onAdd: (input: AdventurerInput) => boolean;
}

interface AdventurerCardProps {
    name: string;
    characterClass: string;
    onRemove: () => void;
}


export function AdventurersForm({ onAdd }: AdventurersFormProps) {
    const name = useFormInput();
    const characterClass = useFormInput();

    return (
        <>
            <form
                noValidate
                onSubmit={(event) => {
                    event.preventDefault();

                    const nameResult = name.validate((value) =>
                        adventurerService.validateInput(value, "name")
                    );

                    const classResult = characterClass.validate((value) =>
                        adventurerService.validateInput(
                            value,
                            "characterClass"
                        )
                    );

                    if (!nameResult.isValid || !classResult.isValid) {
                        return;
                    }

                    const added = onAdd({
                        name: name.value,
                        characterClass: characterClass.value,
                    });

                    if (added) {
                        name.reset();
                        characterClass.reset();
                    }
                }}
            >
                <div>
                    <label htmlFor="adventurer-name">Name</label>

                    <input
                        id="adventurer-name"
                        type="text"
                        value={name.value}
                        onChange={(event) =>
                            name.setValue(event.target.value)
                        }
                        aria-invalid={name.messages.length > 0}
                        aria-describedby="adventurer-name-errors"
                        required
                    />

                    <div
                        id="adventurer-name-errors"
                        aria-live="polite"
                    >
                        {name.messages.map((message) => (
                            <p key={message}>{message}</p>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="adventurer-class">
                        Character class
                    </label>

                    <input
                        id="adventurer-class"
                        type="text"
                        value={characterClass.value}
                        onChange={(event) =>
                            characterClass.setValue(event.target.value)
                        }
                        aria-invalid={characterClass.messages.length > 0}
                        aria-describedby="adventurer-class-errors"
                        required
                    />

                    <div
                        id="adventurer-class-errors"
                        aria-live="polite"
                    >
                        {characterClass.messages.map((message) => (
                            <p key={message}>{message}</p>
                        ))}
                    </div>
                </div>

                <button type="submit">
                    Add adventurer
                </button>
            </form>

            <p>
                Preview: {name.value || "Name"} (
                {characterClass.value || "Class"})
            </p>
        </>
    );
}

export function AdventurerCard({
    name,
    characterClass,
    onRemove,
}: AdventurerCardProps) {
    return (
        <li className="adventurer-card">
            <h3>{name}</h3>

            <p>Class: {characterClass}</p>

            <button
                type="button"
                onClick={onRemove}
                aria-label={`Remove ${name}`}
            >
                Remove
            </button>
        </li>
    );
}