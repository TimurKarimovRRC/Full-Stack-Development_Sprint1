import questData from "../../data/quests.json";

interface Quest {
    id: number;
    title: string;
    location: string;
    difficulty: "Easy" | "Medium" | "Hard" | "Expert";
    description: string;
    reward: string;
}

export function QuestAssignments() {
    const quests = questData as Quest[];

    return (
        <section className="quest-assignments">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">Available contracts</p>
                    <h2>Quests</h2>
                </div>
                <span className="quest-count">{quests.length} quests</span>
            </div>

            <ul className="quest-list">
                {quests.map((quest) => (
                    <li key={quest.id} className="quest-card">
                        <div className="quest-card__topline">
                            <span>{quest.location}</span>
                            <span className={`difficulty difficulty--${quest.difficulty.toLowerCase()}`}>
                                {quest.difficulty}
                            </span>
                        </div>

                        <h3>{quest.title}</h3>
                        <p>{quest.description}</p>

                        <div className="quest-card__footer">
                            <span>Reward</span>
                            <strong>{quest.reward}</strong>
                        </div>
                    </li>
            ))}
            </ul>
        </section>
    );
}