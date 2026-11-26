import { useState, type FormEvent } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import * as adventurerService from "../../services/adventurerService";
import type { AdventurerInput } from "../../types/adventurer";

interface AdventurersFormProps {
    onAdd: (input: AdventurerInput) => Promise<boolean>;
}

interface AdventurerCardProps {
    name: string;
    characterClass: string;
    onSaveClass: (newClass: string) => Promise<boolean>;
    onRemove: () => void;
}

export function AdventurersForm({ onAdd }: AdventurersFormProps) {
    const name = useFormInput();
    const characterClass = useFormInput();
    const [adding, setAdding] = useState(false);

    async function handleAdd(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (adding) return;

        const nameResult = name.validate((value) =>
            adventurerService.validateInput(value, "name")
        );

        const classResult = characterClass.validate((value) =>
            adventurerService.validateInput(value, "characterClass")
        );

        if (!nameResult.isValid || !classResult.isValid) return;

        setAdding(true);

        try {
            const added = await onAdd({
                name: name.value,
                characterClass: characterClass.value,
            });

            if (added) {
                name.reset();
                characterClass.reset();
            }
        } finally {
            setAdding(false);
        }
    }

    return (
        <>
            <form noValidate onSubmit={handleAdd}>
                <div>
                    <label htmlFor="adventurer-name">Name</label>
                    <input
                        id="adventurer-name"
                        type="text"
                        value={name.value}
                        onChange={(event) => name.setValue(event.target.value)}
                        aria-invalid={name.messages.length > 0}
                        aria-describedby="adventurer-name-errors"
                        disabled={adding}
                        required
                    />

                    <div id="adventurer-name-errors" aria-live="polite">
                        {name.messages.map((message) => (
                            <p key={message}>{message}</p>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="adventurer-class">Character class</label>
                    <input
                        id="adventurer-class"
                        type="text"
                        value={characterClass.value}
                        onChange={(event) =>
                            characterClass.setValue(event.target.value)
                        }
                        aria-invalid={characterClass.messages.length > 0}
                        aria-describedby="adventurer-class-errors"
                        disabled={adding}
                        required
                    />

                    <div id="adventurer-class-errors" aria-live="polite">
                        {characterClass.messages.map((message) => (
                            <p key={message}>{message}</p>
                        ))}
                    </div>
                </div>

                <button type="submit" disabled={adding}>
                    {adding ? "Adding..." : "Add adventurer"}
                </button>
            </form>

            <p>
                Preview: {name.value || "Name"} ({characterClass.value || "Class"})
            </p>
        </>
    );
}

export function AdventurerCard({
    name,
    characterClass,
    onSaveClass,
    onRemove,
}: AdventurerCardProps) {
    const [draftClass, setDraftClass] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    async function handleSave(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newClass = draftClass?.trim();
        if (!newClass || saving) return;

        setSaving(true);

        try {
            const saved = await onSaveClass(newClass);
            if (saved) setDraftClass(null);
        } finally {
            setSaving(false);
        }
    }

    return (
        <li className="adventurer-card">
            <h3>{name}</h3>
            <p>Class: {characterClass}</p>

            {draftClass === null ? (
                <>
                    <button
                        type="button"
                        onClick={() => setDraftClass(characterClass)}
                    >
                        Edit class
                    </button>

                    <button
                        type="button"
                        onClick={onRemove}
                        aria-label={`Remove ${name}`}
                    >
                        Remove
                    </button>
                </>
            ) : (
                <form onSubmit={handleSave}>
                    <label>
                        Character class
                        <input
                            value={draftClass}
                            onChange={(event) => setDraftClass(event.target.value)}
                            disabled={saving}
                            required
                        />
                    </label>

                    <button type="submit" disabled={saving || !draftClass.trim()}>
                        {saving ? "Saving..." : "Save"}
                    </button>

                    <button
                        type="button"
                        onClick={() => setDraftClass(null)}
                        disabled={saving}
                    >
                        Cancel
                    </button>
                </form>
            )}
        </li>
    );
}