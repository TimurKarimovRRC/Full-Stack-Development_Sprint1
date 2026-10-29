import { useAssignments } from "../../hooks/useAssignments";
import { QuestAssignmentForm } from "../../components/QuestAssignmentForm/QuestAssignmentForm";
import { AssignmentList } from "../../components/AssignmentList/AssignmentList";
import "./QuestAssignmentPage.css";

/**
 * QuestAssignmentPage
 * The main feature page for managing quest assignments.
 * It utilizes the `useAssignments` hook to fetch data and handle state,
 * passing the data and action handlers down to the form and list components.
 */


export function QuestAssignmentPage (){

    const { assignments, quests, adventurers, isLoading, addAssignment, removeAssignment} = useAssignments();

    if (isLoading) 
        return <p>Loading Assignments...</p>

    return (

        <section className="quest-assignment-page">
            <h2>Quest Assignments</h2>
            <p className="quest-assignment-page__intro">
                Choose an adventurer and a quest below to assign a task. Assignments
                appear in the list below and remain visible across pages.
            </p>

            <QuestAssignmentForm
                adventurers={adventurers}
                quests={quests}
                addAssignment={addAssignment}
            />

            <AssignmentList
                adventurers={adventurers}
                quests={quests}
                assignments={assignments}
                removeAssignment={removeAssignment}
            />
        </section>    
    );
}