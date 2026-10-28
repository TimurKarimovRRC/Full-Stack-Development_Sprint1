import { useState } from "react";
import adventurerData from "../../data/Adventurers.json";
import {
    AdventurersForm,
    AdventurerCard,
} from "../AdventurersForm/AdventurersForm";
import "./Adventurers.css";


export function Adventurers() {
    const [adventurers, setAdventurers] = useState(adventurerData);
    const [name, setName] = useState("");
    const [characterClass, setCharacterClass] = useState("");

    function addAdventurer() {
        const nextId =
            Math.max(0, ...adventurers.map((adventurer) => adventurer.id)) + 1;

        const newAdventurer = {
            id: nextId,
            name: name.trim(),
            characterClass: characterClass.trim(),
        };

        setAdventurers([...adventurers, newAdventurer]);

        setName("");
        setCharacterClass("");
    }

    function removeAdventurer(id: number) {
        setAdventurers(
            adventurers.filter((adventurer) => adventurer.id !== id)
        );
    }

    return (
        <section className="adventurers">
            <h2>Adventurers</h2>

            <AdventurersForm
                name={name}
                characterClass={characterClass}
                setName={setName}
                setCharacterClass={setCharacterClass}
                onAdd={addAdventurer}
            />

            <p>
                Preview: {name || "Name"} ({characterClass || "Class"})
            </p>

            <p>Total adventurers: {adventurers.length}</p>

            <ul>
                {adventurers.map((adventurer) => (
                    <AdventurerCard
                        key={adventurer.id}
                        name={adventurer.name}
                        characterClass={adventurer.characterClass}
                        onRemove={() => removeAdventurer(adventurer.id)}
                    />
                ))}
            </ul>
        </section>
    );
}