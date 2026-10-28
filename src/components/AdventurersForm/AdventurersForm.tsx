interface AdventurersFormProps {
    name: string;
    characterClass: string;
    setName: (value: string) => void;
    setCharacterClass: (value: string) => void;
    onAdd: () => void;
}

interface AdventurerCardProps {
    name: string;
    characterClass: string;
    onRemove: () => void;
}

export function AdventurersForm({
    name,
    characterClass,
    setName,
    setCharacterClass,
    onAdd,
}: AdventurersFormProps) {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onAdd();
            }}
        >
            <div>
                <label htmlFor="adventurer-name">Name</label>

                <input
                    id="adventurer-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="adventurer-class">Character class</label>

                <input
                    id="adventurer-class"
                    type="text"
                    value={characterClass}
                    onChange={(event) =>
                        setCharacterClass(event.target.value)
                    }
                    required
                />
            </div>

            <button
                type="submit"
                disabled={!name.trim() || !characterClass.trim()}
            >
                Add adventurer
            </button>
        </form>
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