import { useAdventurers } from "../../hooks/useAdventurers";
import {
    AdventurersForm,
    AdventurerCard,
} from "../AdventurersForm/AdventurersForm";
import "./Adventurers.css";

/**
 * Displays the roster and lets users add adventurers,
 * edit their classes, and remove them.
 */
export function Adventurers() {
    const {
        adventurers,
        error,
        addAdventurer,
        updateAdventurer,
        removeAdventurer,
    } = useAdventurers();

    if (adventurers === null) {
        if (error) return <p role="alert">{error}</p>;
        return <p role="status">Loading adventurers...</p>;
    }

    return (
        <section className="adventurers">
            <h2>Adventurers</h2>

            <AdventurersForm onAdd={addAdventurer} />

            <p>Total adventurers: {adventurers.length}</p>

            {error && <p role="alert">{error}</p>}

            <ul>
                {adventurers.map((adventurer) => (
                    <AdventurerCard
                        key={adventurer.id}
                        name={adventurer.name}
                        characterClass={adventurer.characterClass}
                        onSaveClass={(newClass) =>
                            updateAdventurer(adventurer.id, {
                                name: adventurer.name,
                                characterClass: newClass,
                            })
                        }
                        onRemove={() => removeAdventurer(adventurer.id)}
                    />
                ))}
            </ul>
        </section>
    );
}