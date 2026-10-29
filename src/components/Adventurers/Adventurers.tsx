import { useAdventurers } from "../../hooks/useAdventurers";
import {
    AdventurersForm,
    AdventurerCard,
} from "../AdventurersForm/AdventurersForm";
import "./Adventurers.css";

/**
 * Displays adventurers using useAdventurers.
 * Actions pass through the hook, service, and repository,
 * keeping business rules and data access outside this component.
 */

export function Adventurers() {
    const {
        adventurers,
        error,
        addAdventurer,
        removeAdventurer,
    } = useAdventurers();

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
                        onRemove={() =>
                            removeAdventurer(adventurer.id)
                        }
                    />
                ))}
            </ul>
        </section>
    );
}