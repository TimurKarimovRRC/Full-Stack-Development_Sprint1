import { useAssignments } from "../../hooks/useAssignments";
import "./QuestAssignments.css";


export function QuestAssignments() {
    const { assignments, isLoading, completeAssignment } = useAssignments();
      console.log("CURRENT ASSIGNMENTS:", assignments);
    if (isLoading) {
        return <p>Loading quests...</p>;
    }

    return (

        <section className = "quest-assignments">
            <h2>My Quest Assignments</h2>

        <ul className = "quest-assignments__list">

            {assignments.map((assignment) => (
                <li key={assignment.id} className = "quest-assignments__item">
                    <h3 className = "quest-assignment__title">
                        {assignment.quest?.title || "Unknown Quest"}</h3>
                    <p className = "quest-assignments__description">
                        {assignment.quest?.description || "No description provided."}</p>

                    <dl className = " quest-assignment__details">
                        <dt>Status</dt>

                        <dd 
                        className = { "quest-assignments__status quest-assignments__status--" + 
                            assignment.status.toLowerCase().replace( " ", "-")
                        }>
                            {assignment.status}
                        </dd>

                        <dt>Reward</dt>

                        <dd>{assignment.quest?.reward}</dd>

                        <dt>Due</dt>

                        <dd>
                            <time dateTime={assignment.dueDate}>
                                {new Date(assignment.dueDate).toLocaleDateString()}
                            </time>
                        </dd>
                    </dl>

                    {assignment.status === "IN_PROGRESS" && (
                        <button 
                            onClick={() => completeAssignment(assignment.id)}
                            style={{ marginTop: "10px", padding: "5px 10px", cursor: "pointer"}}
                        >Mark as Complete</button>
                    )}
                </li>        
            ))}
        </ul>
        </section>
    );
}