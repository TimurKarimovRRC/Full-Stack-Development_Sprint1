import questData from "../../data/quests.json";

interface QuestAssignment {
    id: number;
    title: string;
    location: string;
    difficulty: "Easy" | "Medium" | "Hard" | "Expert";
    description: string;
    reward: string;
}

export function QuestAssignments() {
     const assignment = questData as QuestAssignment[];

    return (
        <section className="quest-assignments">
            <div className="section-heading">
                <div>
                    <h2>My Quest Assignments</h2>
                </div>
                <span className="quest-count">{assignment.length} quests</span>
            </div>

            <ul className="quest-list">
                {assignment.map((quest) => (
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