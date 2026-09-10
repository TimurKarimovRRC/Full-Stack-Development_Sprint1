import questData from "../../data/QuestAssignments.json";
import "./QuestAssignment.css";

interface QuestAssignment {
    id: number;
    title: string,
    description: string,
    status: "In Progress" | "Completed";
    reward: string;
    dueDate: string;
}

export function QuestAssignments() {
    const assignment = questData as QuestAssignment[];

    return (

        <section className = "quest-assignments">
            <h2>My Quest Assignments</h2>

        <ul className = "quest-assignments__list">

            {assignment.map((quest) => (
                <li key={quest.id} className = "quest-assignments__item">
                    <h3 className = "quest-assignment__title">{quest.title}</h3>
                    <p className = "quest-assignments__description">{quest.description}</p>

                    <dl className = " quest-assignment__details">
                        <dt>Status</dt>

                        <dd 
                        className = { "quest-assignments__status quest-assignments__status--" + 
                            quest.status.toLowerCase().replace( " ", "-")
                        }>
                            {quest.status}
                        </dd>

                        <dt>Reward</dt>

                        <dd>{quest.reward}</dd>

                        <dt>Due</dt>

                        <dd>
                            <time dateTime={quest.dueDate}>{quest.dueDate}</time>
                        </dd>
                    </dl>
                </li>        
            ))}
        </ul>
        </section>
    );
}