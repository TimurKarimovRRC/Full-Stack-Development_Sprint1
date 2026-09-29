import { Adventurers } from "./components/Adventurers/Adventurers";
import { useEffect, useState } from "react";
import { QuestAssignments } from "./components/QuestAssignments/QuestAssignments";
import { Layout } from "./components/Layout/Layout";
import "./App.css";
import { QuestBoards } from "./components/Quests/Quests";
import { QuestSubmission } from "./components/QuestSubmission/QuestSubmission";

export function App() {
    const [currentPage, setCurrentPage] = useState(window.location.hash);
    const members = [
        "Timur Karimov",
        "Aum Mistry",
        "Mackinley Wanless"
    ];

    useEffect(() => {
        function handleHashChange() {
            setCurrentPage(window.location.hash);
        }

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const isQuestSubmissionPage = currentPage === "#quest-submission";

    return (
        <Layout title={isQuestSubmissionPage ? "Quest Submission" : "Fantasy Quest Board"} members={members}>
            {isQuestSubmissionPage ? (
                <QuestSubmission />
            ) : (
                <>
                    <QuestAssignments />
                    <QuestBoards />
                    <Adventurers />
                </>
            )}
        </Layout>
    );
}