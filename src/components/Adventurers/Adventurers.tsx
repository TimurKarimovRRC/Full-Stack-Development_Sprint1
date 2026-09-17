import adventurerData from "../../data/Adventurers.json";

export function Adventurers() {
    const adventurers = adventurerData;

    return (
        <section className="adventurers">
            <h2>Adventurers</h2>

            <ul>
                {adventurers.map((adventurer) => (
                    <li key={adventurer.id}>
                        {adventurer.name} — {adventurer.characterClass}
                    </li>
                ))}
            </ul>
        </section>
    );
}