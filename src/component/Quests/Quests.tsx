import questData from "../../data/quests.json";

export function Quests() {
    const quests = questData;

    return (
        <section className="quests">
            <h2>Quests</h2>

            <ul>
                {quests.map((quest) => (
                    <li key={quest.id}>
                        <strong>{quest.title}</strong> — {quest.description}
                        <br />
                        Location: {quest.location} | Difficulty: {quest.difficulty} | Reward: {quest.reward}
                    </li>
                ))}
            </ul>
        </section>
    );
}
